import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';

const sites = sqliteTable('sites', {
	id: integer('id').primaryKey(),
	name: text('name').notNull(),
	displayName: text('display_name'),
	description: text('description'),
	type: text('type'),
	published: integer('published', { mode: 'boolean' })
});
