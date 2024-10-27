import { defineConfig } from 'drizzle-kit';

export default defineConfig({
	dialect: 'sqlite',
	schema: './src/lib/db/schema',
	dbCredentials: {
		url: './.data/sqlite.db'
	}
});
