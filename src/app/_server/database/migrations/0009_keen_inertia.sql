ALTER TABLE `link` DROP FOREIGN KEY `link_user_id_user_id_fk`;
--> statement-breakpoint
ALTER TABLE `link` ADD CONSTRAINT `link_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;