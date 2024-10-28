import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { posts } from './posts';

export const authors = sqliteTable('authors', {
	id: integer('id').primaryKey(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	middleName: text('middle_name'),
	middlePreference: integer('middle_preference', { mode: 'boolean' })
});

export const authorsRelations = relations(authors, ({ many }) => ({
	posts: many(posts)
}));
