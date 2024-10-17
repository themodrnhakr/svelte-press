PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_posts` (
	`id` integer PRIMARY KEY NOT NULL,
	`title` text NOT NULL,
	`subtitle` text,
	`author_id` integer,
	`body` text
);
--> statement-breakpoint
INSERT INTO `__new_posts`("id", "title", "subtitle", "author_id", "body") SELECT "id", "title", "subtitle", "author_id", "body" FROM `posts`;--> statement-breakpoint
DROP TABLE `posts`;--> statement-breakpoint
ALTER TABLE `__new_posts` RENAME TO `posts`;--> statement-breakpoint
PRAGMA foreign_keys=ON;