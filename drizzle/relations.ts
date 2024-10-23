import { relations } from "drizzle-orm/relations";
import { users, sessions, authors, posts } from "./schema";

export const sessionsRelations = relations(sessions, ({one}) => ({
	user: one(users, {
		fields: [sessions.userId],
		references: [users.id]
	}),
}));

export const usersRelations = relations(users, ({many}) => ({
	sessions: many(sessions),
}));

export const postsRelations = relations(posts, ({one}) => ({
	author: one(authors, {
		fields: [posts.authorId],
		references: [authors.id]
	}),
}));

export const authorsRelations = relations(authors, ({many}) => ({
	posts: many(posts),
}));