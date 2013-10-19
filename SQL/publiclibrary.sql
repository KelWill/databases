



-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'books'
-- 
-- ---

DROP TABLE IF EXISTS `books`;
    
CREATE TABLE `books` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `title` VARCHAR(100) NOT NULL,
  `author` VARCHAR(100) NOT NULL,
  `id_subject` TINYINT NOT NULL,
  `id_author` TINYINT NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'author'
-- 
-- ---

DROP TABLE IF EXISTS `author`;
    
CREATE TABLE `author` (
  `id` TINYINT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'subject'
-- 
-- ---

DROP TABLE IF EXISTS `subject`;
    
CREATE TABLE `subject` (
  `id` TINYINT NOT NULL AUTO_INCREMENT,
  `subjectname` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'user'
-- 
-- ---

DROP TABLE IF EXISTS `user`;
    
CREATE TABLE `user` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `name` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'bookcopies'
-- 
-- ---

DROP TABLE IF EXISTS `bookcopies`;
    
CREATE TABLE `bookcopies` (
  `id` TINYINT NULL AUTO_INCREMENT DEFAULT NULL,
  `id_book` TINYINT NOT NULL,
  `id_user` TINYINT NOT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'author_subject'
-- 
-- ---

DROP TABLE IF EXISTS `author_subject`;
    
CREATE TABLE `author_subject` (
  `id` TINYINT NOT NULL AUTO_INCREMENT,
  `id_subject` TINYINT NULL,
  `id_author` TINYINT NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
);

-- ---
-- Foreign Keys 
-- ---

ALTER TABLE `books` ADD FOREIGN KEY (id_subject) REFERENCES `subject` (`id`);
ALTER TABLE `books` ADD FOREIGN KEY (id_author) REFERENCES `author` (`id`);
ALTER TABLE `bookcopies` ADD FOREIGN KEY (id_book) REFERENCES `books` (`id`);
ALTER TABLE `bookcopies` ADD FOREIGN KEY (id_user) REFERENCES `user` (`id`);
ALTER TABLE `author_subject` ADD FOREIGN KEY (id_subject) REFERENCES `subject` (`id`);
ALTER TABLE `author_subject` ADD FOREIGN KEY (id_author) REFERENCES `author` (`id`);

-- ---
-- Table Properties
-- ---

-- ALTER TABLE `books` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `author` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `subject` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `user` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `bookcopies` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `author_subject` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO `books` (`id`,`title`,`author`,`id_subject`,`id_author`) VALUES
-- ('','','','','');
-- INSERT INTO `author` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `subject` (`id`,`subjectname`) VALUES
-- ('','');
-- INSERT INTO `user` (`id`,`name`) VALUES
-- ('','');
-- INSERT INTO `bookcopies` (`id`,`id_book`,`id_user`) VALUES
-- ('','','');
-- INSERT INTO `author_subject` (`id`,`id_subject`,`id_author`) VALUES
-- ('','','');

