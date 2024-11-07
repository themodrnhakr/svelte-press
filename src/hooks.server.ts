import {
	deleteSessionTokenCookie,
	setSessionTokenCookie,
	validateSessionToken
} from '$lib/server/auth/auth';
import { redirect, type Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const token = event.cookies.get('session') ?? null;
	let result;
	if (token === null) {
		event.locals.user = null;
		event.locals.session = null;
		result = await resolve(event);
	} else {
		const { session, user } = await validateSessionToken(token);
		if (session !== null) {
			setSessionTokenCookie(event, token, session.expiresAt);
		} else {
			deleteSessionTokenCookie(event);
		}

		event.locals.session = session;
		event.locals.user = user;

		result = await resolve(event);
	}

	console.log(event.locals.user);
	if (event.route.id === '/(admin)/admin' && event.locals.user === null) {
		console.log('no user');
		throw redirect(302, '/');
	}

	return result;
};
