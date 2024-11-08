import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';
import { dev } from '$app/environment';

export const load: LayoutServerLoad = ({ locals }) => {
	if (!locals.user && !dev) {
		error(401, 'not logged in');
	}
};
