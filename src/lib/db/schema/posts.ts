import { text, integer, blob, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations } from 'drizzle-orm';
import { authors } from './authors';

export const posts = sqliteTable('posts', {
	id: integer('id').primaryKey(),
	title: text().notNull('title'),
	subtitle: text('subtitle'),
	authorId: integer('author_id').references(() => authors.id),
	body: text('body', { mode: 'json' })
});

export const postsRelations = relations(posts, ({ one }) => ({
	author: one(authors, {
		fields: [posts.authorId],
		references: [authors.id]
	})
}));
