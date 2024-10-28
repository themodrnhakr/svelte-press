import { drizzle } from 'drizzle-orm/better-sqlite3';
import { env } from '$env/dynamic/private';

export const db = drizzle(env.DATABASE_URL);
