import { text, integer, sqliteTable } from 'drizzle-orm/sqlite-core';
import { relations, type InferSelectModel } from 'drizzle-orm';

export const users = sqliteTable('users', {
	id: text('id').primaryKey(),
	username: text('username'),
	email: text('email').unique(),
	passwordHash: text('password_hash'),
	githubId: integer('github_id')
});

export const sessions = sqliteTable('sessions', {
	id: text('id').primaryKey(),
	userId: text('user_id')
		.notNull()
		.references(() => users.id),
	expiresAt: integer('expires_at', { mode: 'timestamp' }).notNull()
});

export const usersRelations = relations(users, ({ many }) => ({
	sessions: many(sessions)
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	})
}));

export type User = InferSelectModel<typeof users>;
export type Session = InferSelectModel<typeof sessions>;
