import {
	sqliteTable,
	AnySQLiteColumn,
	integer,
	text,
	uniqueIndex,
	foreignKey
} from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const authors = sqliteTable('authors', {
	id: integer().primaryKey().notNull(),
	firstName: text('first_name').notNull(),
	lastName: text('last_name').notNull(),
	middleName: text('middle_name'),
	middlePreference: integer('middle_preference')
});

export const users = sqliteTable(
	'users',
	{
		id: text().primaryKey().notNull(),
		email: text(),
		passwordHash: text('password_hash')
	},
	(table) => {
		return {
			emailUnique: uniqueIndex('users_email_unique').on(table.email)
		};
	}
);

export const sessions = sqliteTable('sessions', {
	id: text().primaryKey().notNull(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at').notNull()
});

export const posts = sqliteTable('posts', {
	id: integer().primaryKey().notNull(),
	title: text().notNull(),
	subtitle: text(),
	authorId: integer('author_id').references(() => authors.id),
	body: text()
});

export const drizzleMigrations = sqliteTable('__drizzle_migrations', {});
