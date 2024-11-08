import { dev } from '$app/environment';
import { DATABASE_URL, GITHUB_CLIENT_ID } from '$env/static/private';
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

	if (event.route.id === '/(admin)/admin' && event.locals.user === null && !dev) {
		throw redirect(302, '/');
	}

	return result;
};
