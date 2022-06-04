-- --------------------------------------------------------
-- Хост:                         127.0.0.1
-- Версия на сървъра:            10.7.3-MariaDB-1:10.7.3+maria~focal - mariadb.org binary distribution
-- ОС на сървъра:                debian-linux-gnu
-- HeidiSQL Версия:              11.3.0.6295
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- Дъмп на структурата на БД store
CREATE DATABASE IF NOT EXISTS `store` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `store`;

-- Дъмп структура за таблица store.category
CREATE TABLE IF NOT EXISTS `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID на категория',
  `name` varchar(128) NOT NULL COMMENT 'Име на категорията',
  `description` text DEFAULT NULL,
  `created_at` datetime NOT NULL COMMENT 'Дата и време на създаване',
  `updated_at` datetime DEFAULT NULL COMMENT 'Дата и време на обновяване',
  `published_at` datetime DEFAULT NULL COMMENT 'Дата и време на публикуване',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

-- Дъмп данни за таблица store.category: ~4 rows (приблизително)
/*!40000 ALTER TABLE `category` DISABLE KEYS */;
INSERT INTO `category` (`id`, `name`, `description`, `created_at`, `updated_at`, `published_at`) VALUES
	(1, 'Перални', NULL, '2022-05-18 00:00:00', '2022-05-18 00:00:00', '2022-05-18 00:00:00'),
	(2, 'Съдомиялни', NULL, '2022-05-18 00:00:00', '2022-05-18 00:00:00', '2022-05-18 00:00:00'),
	(3, 'Хладилници', NULL, '2022-05-18 00:00:00', '2022-05-18 00:00:00', '2022-05-18 00:00:00'),
	(4, 'Бойлери', NULL, '2022-05-18 00:00:00', '2022-05-18 00:00:00', '2022-05-18 00:00:00');
/*!40000 ALTER TABLE `category` ENABLE KEYS */;

-- Дъмп структура за таблица store.order
CREATE TABLE IF NOT EXISTS `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID на поръчката',
  `user_id` int(11) NOT NULL COMMENT 'ID на клиента',
  `email` varchar(128) NOT NULL COMMENT 'Имейл на клиента в поръчката',
  `phone` varchar(15) NOT NULL COMMENT 'Телефон на клиента в поръчката',
  `firstname` varchar(128) NOT NULL COMMENT 'Име на клиента в поръчката',
  `lastname` varchar(128) NOT NULL COMMENT 'Фамилия на клиента в поръчката',
  `created_at` datetime NOT NULL COMMENT 'Дата и време на създаване на поръчката',
  `updated_at` datetime DEFAULT NULL COMMENT 'Дата и време на обновяване н апоръчката',
  `completed_at` datetime NOT NULL COMMENT 'Дата и време на завършване на поръчката',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дъмп данни за таблица store.order: ~0 rows (приблизително)
/*!40000 ALTER TABLE `order` DISABLE KEYS */;
/*!40000 ALTER TABLE `order` ENABLE KEYS */;

-- Дъмп структура за таблица store.order_item
CREATE TABLE IF NOT EXISTS `order_item` (
  `order_id` int(11) NOT NULL COMMENT 'ID на поръчката',
  `product_id` int(11) NOT NULL COMMENT 'ID на продукта',
  `name` varchar(100) NOT NULL COMMENT 'Описание на продукта в поръчката',
  `price` decimal(10,2) NOT NULL COMMENT 'Единична цена на продукта в поръчката',
  `quantity` int(3) NOT NULL COMMENT 'Количество'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Дъмп данни за таблица store.order_item: ~0 rows (приблизително)
/*!40000 ALTER TABLE `order_item` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_item` ENABLE KEYS */;

-- Дъмп структура за таблица store.product
CREATE TABLE IF NOT EXISTS `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID на продукта',
  `category_id` int(11) NOT NULL COMMENT 'ID на категорията',
  `name` varchar(100) NOT NULL COMMENT 'Име на продукта',
  `description` text NOT NULL,
  `price` decimal(10,2) NOT NULL COMMENT 'Единична цена',
  `created_at` datetime NOT NULL COMMENT 'Дата и време на създаване',
  `updated_at` datetime DEFAULT NULL COMMENT 'Дата и време на обновяване',
  `published_at` datetime DEFAULT NULL COMMENT 'Дата и време на публикуване',
  PRIMARY KEY (`id`),
  KEY `product_category_fk` (`category_id`) USING BTREE,
  CONSTRAINT `product_category_fk` FOREIGN KEY (`category_id`) REFERENCES `category` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=100013 DEFAULT CHARSET=utf8mb4;

-- Дъмп данни за таблица store.product: ~10 rows (приблизително)
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` (`id`, `category_id`, `name`, `description`, `price`, `created_at`, `updated_at`, `published_at`) VALUES
	(100001, 1, 'Пералня BOSCH WAN28160BY', '', 949.00, '2022-05-18 00:00:00', '2022-05-18 00:00:00', '2022-05-18 00:00:00'),
	(100004, 1, 'Пералня BEKO WUE 6512 XWST 6.0 kg', '', 420.00, '2022-05-18 00:00:00', '2022-05-18 00:00:00', '2022-05-18 00:00:00'),
	(100005, 2, 'Съдомиялнa BEKO DVS 05024 W\r\n', '', 500.00, '2022-05-18 00:00:00', '2022-05-18 00:00:00', '2022-05-18 00:00:00'),
	(100006, 2, 'Съдомиялнa CANDY CDPH 2L949W', '', 1000.00, '2022-05-18 00:00:00', '2022-05-18 00:00:00', '2022-05-18 00:00:00'),
	(100007, 3, 'Хладилник HAIER HTF 610 DSN7 NO FROST', '', 2400.00, '2022-05-18 00:00:00', '2022-05-18 00:00:00', '2022-05-18 00:00:00'),
	(100008, 3, 'Хладилник BEKO GN 1426234 ZDXN NO FROST', '', 2300.00, '2022-05-18 00:00:00', '2022-05-18 00:00:00', '2022-05-18 00:00:00'),
	(100009, 4, 'Обемен бойлер ELDOM 72268WN', '', 230.80, '2022-05-18 00:00:00', '2022-05-18 00:00:00', '2022-05-18 00:00:00'),
	(100010, 4, 'Обемен бойлер ARISTON LYDOS R 80 V 3K EU', '', 310.50, '2022-05-18 00:00:00', '2022-05-18 00:00:00', '2022-05-18 00:00:00'),
	(100011, 1, 'Test', '', 1.00, '2022-05-31 18:32:15', NULL, NULL),
	(100012, 1, 'Test', '', 100.00, '2022-06-01 06:07:37', NULL, NULL);
/*!40000 ALTER TABLE `product` ENABLE KEYS */;

-- Дъмп структура за таблица store.user
CREATE TABLE IF NOT EXISTS `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT 'ID на потребителя',
  `role` enum('visitor','client','power') NOT NULL DEFAULT 'visitor' COMMENT 'Роля на потребителя',
  `email` varchar(128) NOT NULL COMMENT 'Имейл на потребителя',
  `phone` varchar(15) NOT NULL COMMENT 'Телефон на потребителя',
  `password` varchar(256) NOT NULL COMMENT 'Парола на потребителя',
  `firstname` varchar(128) NOT NULL COMMENT 'Име на потребителя',
  `lastname` varchar(128) NOT NULL COMMENT 'Фамилия на потребителя',
  `created_at` datetime NOT NULL COMMENT 'Дата и време на създаване на клиента',
  `updated_at` datetime DEFAULT NULL COMMENT 'Дата и време на обновяване на клиента',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

-- Дъмп данни за таблица store.user: ~1 rows (приблизително)
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`id`, `role`, `email`, `phone`, `password`, `firstname`, `lastname`, `created_at`, `updated_at`) VALUES
	(1, 'power', 'admin@example.org', '+123456789', '8c6976e5b5410415bde908bd4dee15dfb167a9c873fc4bb8a81f6f2ab448a918', 'Store', 'Administrator', '2022-06-03 20:15:28', '2022-06-03 20:18:34');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;

/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
