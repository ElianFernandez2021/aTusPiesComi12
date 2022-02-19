-- MySQL dump 10.13  Distrib 5.5.62, for Win64 (AMD64)
--
-- Host: localhost    Database: a_tus_pies
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.22-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `cart`
--

DROP TABLE IF EXISTS `cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cart` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userFK` (`user_id`),
  CONSTRAINT `userFK` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cart`
--

LOCK TABLES `cart` WRITE;
/*!40000 ALTER TABLE `cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'deportivas',NULL,NULL),(2,'elegante',NULL,NULL),(3,'casual',NULL,NULL),(4,'botas',NULL,NULL);
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `color`
--

DROP TABLE IF EXISTS `color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `color` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(20) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `updatedAt` datetime DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `color`
--

LOCK TABLES `color` WRITE;
/*!40000 ALTER TABLE `color` DISABLE KEYS */;
INSERT INTO `color` VALUES (1,'Rojo',NULL,NULL),(2,'Verde',NULL,NULL),(3,'Azul',NULL,NULL),(4,'Blanco',NULL,NULL),(5,'Negro',NULL,NULL),(6,'Amarillo',NULL,NULL),(7,'Gris',NULL,NULL);
/*!40000 ALTER TABLE `color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `description` varchar(100) DEFAULT NULL,
  `price` int(10) unsigned NOT NULL,
  `created_at` datetime DEFAULT NULL,
  `updated_at` datetime DEFAULT NULL,
  `category_id` int(10) unsigned NOT NULL,
  `trade_mark` int(10) unsigned NOT NULL,
  `size` varchar(100) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_FK_1` (`category_id`),
  KEY `products_FK` (`trade_mark`),
  CONSTRAINT `products_FK` FOREIGN KEY (`trade_mark`) REFERENCES `trade_mark` (`id`),
  CONSTRAINT `products_FK_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=282 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_cart`
--

DROP TABLE IF EXISTS `products_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products_cart` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `cart_id` int(10) unsigned NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  `quantity` int(11) NOT NULL,
  `create_at` datetime DEFAULT NULL,
  `update_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `cartFK` (`cart_id`),
  KEY `productFk` (`product_id`),
  CONSTRAINT `cartFK` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`id`),
  CONSTRAINT `productFk` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_cart`
--

LOCK TABLES `products_cart` WRITE;
/*!40000 ALTER TABLE `products_cart` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_color`
--

DROP TABLE IF EXISTS `products_color`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products_color` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `product_id` int(10) unsigned NOT NULL,
  `color_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `product_colorFK` (`product_id`),
  KEY `products_color_FK` (`color_id`),
  CONSTRAINT `product_colorFK` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`),
  CONSTRAINT `products_color_FK` FOREIGN KEY (`color_id`) REFERENCES `color` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=66 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_color`
--

LOCK TABLES `products_color` WRITE;
/*!40000 ALTER TABLE `products_color` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_color` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products_image`
--

DROP TABLE IF EXISTS `products_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `products_image` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `image` varchar(50) NOT NULL,
  `product_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `products_image_FK` (`product_id`),
  CONSTRAINT `products_image_FK` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=191 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products_image`
--

LOCK TABLES `products_image` WRITE;
/*!40000 ALTER TABLE `products_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `products_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trade_mark`
--

DROP TABLE IF EXISTS `trade_mark`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `trade_mark` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mark` varchar(20) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trade_mark`
--

LOCK TABLES `trade_mark` WRITE;
/*!40000 ALTER TABLE `trade_mark` DISABLE KEYS */;
INSERT INTO `trade_mark` VALUES (1,'Nike'),(2,'Salomon'),(3,'Puma'),(4,'Topper');
/*!40000 ALTER TABLE `trade_mark` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `first_name` varchar(20) NOT NULL,
  `last_name` varchar(20) NOT NULL,
  `email` varchar(100) NOT NULL,
  `avatar` varchar(100) NOT NULL,
  `rol` tinyint(2) NOT NULL,
  `password` varchar(75) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'','Diaz','facu@mail.com','Jake_Sully.jpg',1,'$2a$10$3XM.Md2KGX8SR18liP5wjuWOk6cxleSW2vZ/ViEPAo49R9pDUTagi','2022-02-04 03:52:03','2022-02-04 03:52:03'),(2,'','usuario','prueba@mail.com','1644097686793_img_.jpg',0,'$2a$10$t60iGpMKNBde6txdG/uHHOEG78PHOAZRHbavwhzJHhCmm.U24r8x.','2022-02-05 21:48:09','2022-02-05 21:48:09'),(3,'asd','asd','asd@mail.com','Jake_Sully.jpg',0,'$2a$10$ghNU5lAVnoRqwLFHUkNGqeMoqvpxeARqDZghMfUpm6ajmF63YPXki','2022-02-08 21:06:06','2022-02-08 21:06:06');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'a_tus_pies'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-02-19  0:20:48
