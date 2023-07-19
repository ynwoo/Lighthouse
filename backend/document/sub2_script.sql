-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema s09p12a409
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema s09p12a409
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `s09p12a409` DEFAULT CHARACTER SET utf8mb3 ;
USE `s09p12a409` ;

-- -----------------------------------------------------
-- Table `s09p12a409`.`user`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`user` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`user` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `password` VARCHAR(1024) NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NULL DEFAULT NULL,
  `nickname` VARCHAR(45) NULL DEFAULT NULL,
  `profile_img_url` VARCHAR(128) NULL DEFAULT NULL,
  `age` INT NULL DEFAULT NULL,
  `address` VARCHAR(1024) NULL DEFAULT NULL,
  `phone_number` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(1024) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`alertqueue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`alertqueue` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`alertqueue` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `producer_id` INT NOT NULL,
  `consumer_id` INT NULL DEFAULT NULL,
  `message` VARCHAR(1024) NULL DEFAULT NULL,
  `type` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `alertqueue_user_producer_id_fk_idx` (`producer_id` ASC) VISIBLE,
  INDEX `alertqueue_user_consumer_id_fk_idx` (`consumer_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`badge`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`badge` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`badge` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `img_url` VARCHAR(128) NULL DEFAULT NULL,
  `name` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(1024) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`study`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`study` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`study` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_vaild` TINYINT NOT NULL DEFAULT '1',
  `title` VARCHAR(1024) NOT NULL,
  `description` VARCHAR(1024) NULL,
  `original_id` INT NULL DEFAULT NULL,
  `leader_id` INT NULL DEFAULT NULL,
  `hit` INT NULL DEFAULT NULL,
  `rule` VARCHAR(1024) NULL DEFAULT NULL,
  `started_at` DATETIME NULL DEFAULT NULL,
  `ended_at` DATETIME NULL DEFAULT NULL,
  `recruit_finished_at` DATETIME NULL DEFAULT NULL,
  `max_member` INT NULL DEFAULT NULL,
  `min_member` INT NULL DEFAULT NULL,
  `current_member` INT NULL DEFAULT NULL,
  `is_online` TINYINT NULL DEFAULT NULL,
  `like_cnt` INT NULL DEFAULT NULL,
  `bookmark_cnt` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`bookmark`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`bookmark` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`bookmark` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `user_id` INT NOT NULL,
  `study_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `bookmark_user_id_fk_idx` (`user_id` ASC) VISIBLE,
  INDEX `bookmark_study_id_fk_idx` (`study_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`follow`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`follow` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`follow` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `follower_id` INT NOT NULL,
  `followee_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `follow_user_follower_id_fk_idx` (`follower_id` ASC) VISIBLE,
  INDEX `follow_user_followee_id_fk_idx` (`followee_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`tag` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `is_valid` TINYINT NOT NULL DEFAULT 1,
  `keyword` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `s09p12a409`.`usertag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`usertag` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`usertag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `user_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `usertag_user_id_fk_idx` (`user_id` ASC) VISIBLE,
  INDEX `usertag_tag_id_fk_idx` (`tag_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`like`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`like` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`like` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `user_id` INT NOT NULL,
  `study_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `like_user_id_fk_idx` (`user_id` ASC) VISIBLE,
  INDEX `like_study_id_fk_idx` (`study_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`message`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`message` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`message` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `channel_id` INT NOT NULL,
  `user_id` INT NOT NULL,
  `content` VARCHAR(1024) NULL DEFAULT NULL,
  `file_url` VARCHAR(128) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `message_user_id_idx` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`participationhistory`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`participationhistory` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`participationhistory` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `user_id` INT NOT NULL,
  `study_id` INT NOT NULL,
  `user_role` INT NOT NULL,
  `joined_at` DATETIME NULL DEFAULT NULL,
  `leaved_at` DATETIME NULL DEFAULT NULL,
  `status` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `participationhistory_user_id_fk_idx` (`user_id` ASC) VISIBLE,
  INDEX `participationhistory_study_id_fk_idx` (`study_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`session`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`session` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`session` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `started_at` DATETIME NULL DEFAULT NULL,
  `ended_at` DATETIME NULL DEFAULT NULL,
  `study_id` INT NOT NULL,
  `title` VARCHAR(128) NULL DEFAULT NULL,
  `material_id` INT NULL DEFAULT NULL,
  `description` VARCHAR(1024) NULL DEFAULT NULL,
  `comment` VARCHAR(128) NULL DEFAULT NULL,
  `status` TINYINT NULL DEFAULT NULL,
  `seq_num` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `session_study_id_fk_idx` (`study_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`sessioncheck`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`sessioncheck` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`sessioncheck` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `user_id` INT NOT NULL,
  `session_id` INT NOT NULL,
  `content` VARCHAR(1024) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `sessioncheck_session_id_fk_idx` (`session_id` ASC) VISIBLE,
  INDEX `sessioncheck_user_id_fk_idx` (`user_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`studyeval`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`studyeval` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`studyeval` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `user_id` INT NOT NULL,
  `study_id` INT NOT NULL,
  `comment` VARCHAR(128) NULL DEFAULT NULL,
  `score` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `studyeval_user_id_fk_idx` (`user_id` ASC) VISIBLE,
  INDEX `studyeval_study_id_fk_idx` (`study_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`studymaterial`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`studymaterial` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`studymaterial` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `study_id` INT NOT NULL,
  `type` INT NOT NULL,
  `content` VARCHAR(1024) NULL DEFAULT NULL,
  `file_url` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  INDEX `studynaterial_study_id_idx` (`study_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`studynotice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`studynotice` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`studynotice` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `study_id` INT NOT NULL,
  `content` VARCHAR(1024) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`studynoticecheck`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`studynoticecheck` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`studynoticecheck` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `user_id` INT NOT NULL,
  `study_notice_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `studynoticecheck_user_id_fk_idx` (`user_id` ASC) VISIBLE,
  INDEX `studynoticecheck_studynotice_id_fk_idx` (`study_notice_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`studytag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`studytag` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`studytag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `study_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `studytag_study_id_fk_idx` (`study_id` ASC) VISIBLE,
  INDEX `studytag_tag_id_fk_idx` (`tag_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`studytime`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`studytime` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`studytime` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL,
  `study_id` INT NOT NULL,
  `study_date` DATETIME NOT NULL,
  `type` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `studytime_study_id_fk_idx` (`study_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`userbadge`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`userbadge` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`userbadge` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `user_id` INT NOT NULL,
  `badge_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `userbadge_user_id_fk_idx` (`user_id` ASC) VISIBLE,
  INDEX `userbadge_badge_id_fk_idx` (`badge_id` ASC) VISIBLE)
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`usereval`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`usereval` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`usereval` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `user_id` INT NOT NULL,
  `evaluator_id` INT NOT NULL,
  `tag` VARCHAR(128) NULL DEFAULT NULL,
  `score` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
