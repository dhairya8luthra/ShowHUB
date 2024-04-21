-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: showhub
-- ------------------------------------------------------
-- Server version	8.0.35

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `bookings`
--

DROP TABLE IF EXISTS `bookings`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `bookings` (
  `bookingid` int NOT NULL,
  `userid` int DEFAULT NULL,
  `noofseats` int DEFAULT NULL,
  `created` datetime DEFAULT NULL,
  `totalprice` int DEFAULT NULL,
  `moviename` varchar(255) DEFAULT NULL,
  `showid` int DEFAULT NULL,
  PRIMARY KEY (`bookingid`),
  KEY `userid` (`userid`),
  CONSTRAINT `bookings_ibfk_1` FOREIGN KEY (`userid`) REFERENCES `user` (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `bookings`
--

LOCK TABLES `bookings` WRITE;
/*!40000 ALTER TABLE `bookings` DISABLE KEYS */;
INSERT INTO `bookings` VALUES (12492,3773,1,'2024-04-18 20:40:22',10,'The Matrix',1),(26077,3773,1,'2024-04-18 15:00:17',10,'The Matrix',1),(35378,3773,1,'2024-04-18 14:53:02',10,'The Matrix',1),(49178,3773,1,'2024-04-19 16:59:23',10,'The Matrix',1),(153137,3773,1,'2024-04-18 15:02:32',10,'The Matrix',1),(153573,3773,1,'2024-04-18 15:11:55',10,'The Matrix',1),(221594,3773,1,'2024-04-18 14:59:57',10,'The Matrix',1),(522512,3773,1,'2024-04-18 15:13:10',10,'The Matrix',1),(641204,3773,1,'2024-04-18 15:07:45',10,'The Matrix',1),(687731,3773,1,'2024-04-18 15:13:35',10,'The Matrix',1),(697022,3773,1,'2024-04-18 15:06:57',10,'The Matrix',1),(726224,3773,1,'2024-04-18 14:57:47',10,'The Matrix',1),(817905,3773,1,'2024-04-18 15:06:24',10,'The Matrix',1),(895677,3773,1,'2024-04-18 15:06:34',10,'The Matrix',1),(957832,3773,1,'2024-04-18 15:08:03',10,'The Matrix',1),(980272,3773,1,'2024-04-18 14:57:14',10,'The Matrix',1);
/*!40000 ALTER TABLE `bookings` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-20 15:23:25
