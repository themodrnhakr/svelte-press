import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/lib/server/db/schema',
	dbCredentials: {
		url: './.data/dev-sqlite.db'
	}
});
