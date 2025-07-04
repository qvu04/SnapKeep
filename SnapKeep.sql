CREATE DATABASE IF NOT EXISTS SnapKeep; 
USE SnapKeep;

CREATE TABLE IF NOT EXISTS Users
(
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`name` VARCHAR(255) NOT NULL,
	`email` VARCHAR(255) NOT NULL UNIQUE,
	`password` VARCHAR(255) NOT NULL,
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Images
(
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`title` VARCHAR(255) NOT NULL,
	`desc` TEXT,
	`url` TEXT NOT NULL,
	`user_id` INT NOT NULL,
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES `Users`(id)
);

CREATE TABLE IF NOT EXISTS Comments
(
	`id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
	`content` TEXT NOT NULL,
	`image_id` INT NOT NULL,
	`user_id` INT NOT NULL,
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (image_id) REFERENCES `Images`(id),
	FOREIGN KEY (user_id) REFERENCES `Users`(id)
);

CREATE TABLE IF NOT EXISTS Saved_images
(
	`id` INT PRIMARY KEY AUTO_INCREMENT,
	`user_id` INT NOT NULL,
	`image_id` INT NOT NULL,
	`deletedBy` INT NOT NULL DEFAULT 0,
	`isDeleted` TINYINT(1) NOT NULL DEFAULT 0,
	`deletedAt` TIMESTAMP NULL DEFAULT NULL,
	`createdAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
	FOREIGN KEY (image_id) REFERENCES `Images`(id),
	FOREIGN KEY (user_id) REFERENCES `Users`(id)
);

INSERT INTO Images (`title`, `desc`, `url`, `user_id`)
VALUES
  ('Ảnh hoàng hôn', 'Hoàng hôn trên biển rất đẹp', 'https://example.com/sunset.jpg', 2),
  ('Ảnh cây cổ thụ', 'Một gốc cây to trong rừng', 'https://example.com/tree.jpg', 3);
  
 INSERT INTO Comments (`content`, `image_id`, `user_id`)
VALUES
  ('Ảnh rất đẹp!', 2, 2),
  ('Góc chụp ấn tượng!', 3, 3);
  
  INSERT INTO Saved_images (user_id, image_id)
VALUES
  (2, 3), 
  (3, 2);