import { db } from '$lib/server/db/db';
import { users } from '$lib/server/db/schema/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const result = await db.query.users.findMany({
		with: {
			sessions: true
		}
	});
	return {
		users: result
	};
};
