CREATE SCHEMA `news` DEFAULT CHARACTER SET utf8 ;

USE `news` ;

CREATE TABLE `news` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `title` VARCHAR(255) NOT NULL,
  `connect_news` TEXT NOT NULL,
  `image` VARCHAR(100) NULL,
  `date` DATETIME NULL,
  PRIMARY KEY (`id`));

CREATE TABLE `comments` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `news_id` INT NOT NULL,
  `author` VARCHAR(255) NULL,
  `comment` TEXT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `news_id_fk_idx` (`news_id` ASC),
  CONSTRAINT `news_id_fk`
    FOREIGN KEY (`news_id`)
    REFERENCES `news` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION);

INSERT INTO `news` (`id`, `title`, `connect_news`, `date`)
VALUES
	(1, 'Команда Кусто попросила ускорить выдачу виз для приезда в Приморье',
    'Французский океанограф Жан-Мишель Кусто вместе с командой международных
    экспертов обратились к Министерству природных ресурсов и экологии РФ с просьбой
    ускорить выдачу им виз для приезда в Россию, где они хотят посетить так называемую
    "китовую тюрьму" в бухте Средняя под Находкой в Приморском крае. Об этом ТАСС сообщил
    советник Кусто Чарльз Виник.', now());

INSERT INTO `comments` (`id`, `news_id`, `author`, `comment`)
VALUES
	(3, 1, 'Anonymous', 'Молодцы реюята! Так держать!')