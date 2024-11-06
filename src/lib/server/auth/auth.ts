import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { sessions, users, type Session, type User } from '../db/schema/auth';
import { db } from '../db/db';
import { logger } from '../logging/logger';
import { SqliteError } from 'better-sqlite3';
import { eq } from 'drizzle-orm';
import type { RequestEvent } from '@sveltejs/kit';

export function generateSessionToken(): string {
	const bytes = new Uint8Array(20);
	crypto.getRandomValues(bytes);
	const token = encodeBase32LowerCaseNoPadding(bytes);
	return token;
}

export function generateUserId(): string {
	const id = crypto.randomUUID();
	return id;
}

export function buildSession(token: string, userId: string): Session {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	const session: Session = {
		id: sessionId,
		userId,
		expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30)
	};
	return session;
}

export async function createSession(
	userId: string,
	builder: (token: string, userId: string) => Session
): Promise<Session> {
	const session = builder(generateSessionToken(), userId);
	try {
		await db.insert(sessions).values(session);
		return session;
	} catch (error) {
		throw error;
	}
}

export async function validateSessionToken(token: string): Promise<SessionValidateResult> {
	const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
	try {
		const result = await db
			.select({ user: users, session: sessions })
			.from(sessions)
			.innerJoin(users, eq(sessions.userId, users.id))
			.where(eq(sessions.id, sessionId));
		if (result.length < 1) {
			return { session: null, user: null };
		}
		const { user, session } = result[0];
		if (Date.now() >= session.expiresAt.getTime()) {
			await db.delete(sessions).where(eq(sessions.id, session.id));
			return { session: null, user: null };
		}
		if (Date.now() >= session.expiresAt.getTime() - 1000 * 60 * 60 * 24 * 15) {
			session.expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
			await db
				.update(sessions)
				.set({ expiresAt: session.expiresAt })
				.where(eq(sessions.id, session.id));
		}
		return { session, user };
	} catch (error) {
		throw error;
	}
}

export async function invalidateSession(sessionId: string): Promise<Session> {
	try {
		const result = await db.delete(sessions).where(eq(sessions.id, sessionId)).returning();
		return result[0];
	} catch (error) {
		throw error;
	}
}

// export function invalidateUserSessions();

export function setSessionTokenCookie(event: RequestEvent, token: string, expiresAt: Date): void {
	event.cookies.set('session', token, {
		httpOnly: true,
		sameSite: 'lax',
		expires: expiresAt,
		path: '/'
	});
}

export function deleteSessionTokenCookie(event: RequestEvent) {
	event.cookies.set('session', '', {
		httpOnly: true,
		sameSite: 'lax',
		maxAge: 0,
		path: '/'
	});
}

type SessionValidateResult = { session: Session; user: User } | { session: null; user: null };
