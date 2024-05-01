CREATE TABLE `user` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(255) NOT NULL,
	`password` varchar(255) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `link` (
	`id` int AUTO_INCREMENT NOT NULL,
	`platform` enum('github','youtube','linkedin','facebook','frontendmentor','hashnode','web','twitter','twitch','devto','codewars','freecodecamp','gitlab','stackoverflow'),
	`url` varchar(255) NOT NULL,
	`user_id` int NOT NULL,
	CONSTRAINT `link_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `link` ADD CONSTRAINT `link_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;