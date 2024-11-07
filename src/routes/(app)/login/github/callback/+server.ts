import type { RequestEvent } from './$types';
import { github } from '$lib/server/auth/OAuth/github';
import { db } from '$lib/server/db/db';
import { users } from '$lib/server/db/schema/auth';
import {
	buildSession,
	createSession,
	generateSessionToken,
	generateUserId,
	setSessionTokenCookie
} from '$lib/server/auth/auth';
import { eq } from 'drizzle-orm';
import type { OAuth2Tokens } from 'arctic';

export async function GET(event: RequestEvent): Promise<Response> {
	const code = event.url.searchParams.get('code');
	const state = event.url.searchParams.get('state');
	const storedState = event.cookies.get('github_oauth_state') ?? null;
	if (code === null) {
		return new Response(null, {
			status: 400
		});
	}
	if (state !== storedState) {
		return new Response(null, {
			status: 400
		});
	}

	let tokens: OAuth2Tokens;
	try {
		tokens = await github.validateAuthorizationCode(code);
	} catch (error) {
		return new Response(null, {
			status: 400
		});
	}

	const githubUserResponse = await fetch('https://api.github.com/user', {
		headers: {
			Authorization: `Bearer ${tokens.accessToken()}`
		}
	});

	const githubUser = await githubUserResponse.json();
	const githubUserId = githubUser.id;
	const githubUserName = githubUser.login;

	console.log('HERE');
	const existingUser = await db.select().from(users).where(eq(users.id, githubUserId));
	console.log('THERE');

	if (existingUser[0]) {
		const sessionToken = generateSessionToken();
		const session = createSession(sessionToken, generateUserId(), buildSession);
		setSessionTokenCookie(event, sessionToken, (await session).expiresAt);
		return new Response(null, {
			status: 302,
			headers: {
				Location: '/'
			}
		});
	}

	const user = await db
		.insert(users)
		.values({
			id: generateUserId(),
			githubId: githubUserId,
			username: githubUserName
		})
		.returning();

	const sessionToken = generateSessionToken();
	const session = await createSession(sessionToken, user[0].id, buildSession);
	setSessionTokenCookie(event, sessionToken, session.expiresAt);

	return new Response(null, {
		status: 302,
		headers: {
			Location: '/'
		}
	});
}
