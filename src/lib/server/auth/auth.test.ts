import { assert, assertType, expect, test } from 'vitest';
import { buildSession, generateSessionToken, generateUserId } from './auth';
import type { Session } from '../db/schema/auth';

test('testing auth session token length', () => {
	expect(generateSessionToken().length).toBe(32);
});

test('testing auth session token uniqueness', () => {
	const testValue = generateSessionToken();
	let array = [];
	for (let i = 0; i < 1000; i++) {
		array.push(generateSessionToken());
	}
	for (let i = 0; i < array.length; i++) {
		const element = array[i];
		assert(testValue !== element, 'the generated session token was not unique!');
	}
});

test('testing auth session exists', () => {
	const session = buildSession(generateSessionToken(), generateUserId());
	assert.isDefined(session.id, "session 'id' field wasn't created");
	assert.isDefined(session.userId, "session 'userId' field wasn't created");
	assert.isDefined(session.expiresAt, "session 'expiresAt' field wasn't created");
});

test('testing auth session type', () => {
	const session = buildSession(generateSessionToken(), generateUserId());
	assertType<Session>(session);
});
