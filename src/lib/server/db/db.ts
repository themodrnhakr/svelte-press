import { drizzle } from 'drizzle-orm/better-sqlite3';
import { DATABASE_URL } from '$env/static/private';
import * as auth from '$lib/server/db/schema/auth';
import * as posts from '$lib/server/db/schema/posts';
import * as authors from '$lib/server/db/schema/authors';

export const db = drizzle({
	connection: { source: DATABASE_URL },
	schema: { ...auth, ...posts, ...authors }
});
