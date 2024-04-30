ALTER TABLE `user` MODIFY COLUMN `password` varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE `user` DROP COLUMN `name`;