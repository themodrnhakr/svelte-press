import { lucia } from '$lib/server/auth/auth';
import { fail, redirect } from '@sveltejs/kit';
import { generateIdFromEntropySize } from 'lucia';
import { hash } from '@node-rs/argon2';
import { db } from '$lib/server/db/db';
import { users } from '$lib/server/db/schema/auth';

import type { Actions } from './$types';

export const actions: Actions = {
	default: async (event) => {
		const formData = await event.request.formData();
		const email = formData.get('email');
		const password = formData.get('password');

		console.log(formData);

		if (typeof email !== 'string' || email.length < 3 || email.length > 31) {
			console.log('ping1');
			console.log(typeof email);
			console.log(email.length);
			console.log('ping1');
			return fail(400, {
				message: 'Invalid email'
			});
		}
		if (typeof password !== 'string' || password.length < 6 || password.length > 255) {
			console.log('ping');
			return fail(400, {
				message: 'Invalid password'
			});
		}

		const userId = generateIdFromEntropySize(10);
		console.log('test0');
		const passwordHash = await hash(password, {
			memoryCost: 19456,
			timeCost: 2,
			outputLen: 32,
			parallelism: 1
		});

		console.log('test1');

		await db.insert(users).values({
			id: userId,
			email: email,
			passwordHash: passwordHash
		});
		console.log('test2');

		const session = await lucia.createSession(userId, {});
		const sessionCookie = await lucia.createSessionCookie(session.id);
		event.cookies.set(sessionCookie.name, sessionCookie.value, {
			path: '.',
			...sessionCookie.attributes
		});

		redirect(302, '/');
	}
};
