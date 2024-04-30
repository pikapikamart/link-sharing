CREATE TABLE `user` (
	`id` serial AUTO_INCREMENT NOT NULL,
	`name` varchar(255),
	`email` varchar(255) NOT NULL,
	`password` varchar(255),
	`emailVerified` timestamp(3),
	CONSTRAINT `user_id` PRIMARY KEY(`id`)
);
