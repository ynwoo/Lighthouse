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
-- Table `s09p12a409`.`sido`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`sido` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`sido` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `is_vaild` TINYINT NULL DEFAULT 1,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `s09p12a409`.`gugun`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`gugun` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`gugun` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT NOW(),
  `is_vaild` TINYINT NULL DEFAULT 1,
  `name` VARCHAR(45) NOT NULL,
  `sido_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


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
  `sido_id` INT NULL DEFAULT NULL,
  `gugun_id` INT NULL,
  `phone_number` VARCHAR(45) NULL DEFAULT NULL,
  `description` VARCHAR(1024) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`alert_queue`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`alert_queue` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`alert_queue` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `producer_id` INT NOT NULL,
  `consumer_id` INT NULL DEFAULT NULL,
  `message` VARCHAR(1024) NULL DEFAULT NULL,
  `type` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
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
  PRIMARY KEY (`id`))
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
  PRIMARY KEY (`id`))
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
-- Table `s09p12a409`.`user_tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`user_tag` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`user_tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `user_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`id`))
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
  PRIMARY KEY (`id`))
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
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`participation_history`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`participation_history` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`participation_history` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `user_id` INT NOT NULL,
  `study_id` INT NOT NULL,
  `user_role` INT NOT NULL,
  `joined_at` DATETIME NULL DEFAULT NULL,
  `leaved_at` DATETIME NULL DEFAULT NULL,
  `status` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
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
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`session_check`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`session_check` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`session_check` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `user_id` INT NOT NULL,
  `session_id` INT NOT NULL,
  `content` VARCHAR(1024) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`study_eval`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`study_eval` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`study_eval` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `user_id` INT NOT NULL,
  `study_id` INT NOT NULL,
  `comment` VARCHAR(128) NULL DEFAULT NULL,
  `score` INT NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`study_material`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`study_material` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`study_material` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `study_id` INT NOT NULL,
  `type` INT NOT NULL,
  `content` VARCHAR(1024) NULL DEFAULT NULL,
  `file_url` VARCHAR(100) NULL DEFAULT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`study_notice`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`study_notice` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`study_notice` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `study_id` INT NOT NULL,
  `content` VARCHAR(1024) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`study_notice_check`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`study_notice_check` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`study_notice_check` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `user_id` INT NOT NULL,
  `study_notice_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`study_tag`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`study_tag` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`study_tag` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `study_id` INT NOT NULL,
  `tag_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`study_time`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`study_time` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`study_time` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL,
  `study_id` INT NOT NULL,
  `study_date` DATETIME NOT NULL,
  `duration` INT NULL,
  `type` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`user_badge`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`user_badge` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`user_badge` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `is_valid` TINYINT NOT NULL DEFAULT '1',
  `user_id` INT NOT NULL,
  `badge_id` INT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb3;


-- -----------------------------------------------------
-- Table `s09p12a409`.`user_eval`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `s09p12a409`.`user_eval` ;

CREATE TABLE IF NOT EXISTS `s09p12a409`.`user_eval` (
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
