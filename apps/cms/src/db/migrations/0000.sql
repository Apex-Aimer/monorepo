CREATE TABLE `users` (
	`id` text PRIMARY KEY NOT NULL,
	`githubId` text NOT NULL,
	`username` text,
	`role` text NOT NULL
);

CREATE TABLE `userSessions` (
	`id` TEXT NOT NULL PRIMARY KEY,
    `expires_at` INTEGER NOT NULL,
    `user_id` TEXT NOT NULL,
	`role` text NOT NULL,
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);
