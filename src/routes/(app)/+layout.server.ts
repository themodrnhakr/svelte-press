import { error, fail, redirect } from '@sveltejs/kit';
import type { Actions, LayoutServerLoad } from './$types';
import { deleteSessionTokenCookie, invalidateSession } from '$lib/server/auth/auth';

export const load: LayoutServerLoad = ({ locals }) => {
	return {
		username: locals.user?.username
	};
};
