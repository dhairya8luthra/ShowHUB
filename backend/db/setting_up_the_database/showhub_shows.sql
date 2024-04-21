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
-- Table structure for table `shows`
--

DROP TABLE IF EXISTS `shows`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `shows` (
  `ShowID` int NOT NULL,
  `MovieID` int DEFAULT NULL,
  `StartTiming` time DEFAULT NULL,
  `EndTime` time DEFAULT NULL,
  `Price` int DEFAULT NULL,
  `TheatreID` int DEFAULT NULL,
  `ScreenID` int DEFAULT NULL,
  `isActive` tinyint(1) DEFAULT NULL,
  `date_of_movie` date DEFAULT NULL,
  PRIMARY KEY (`ShowID`),
  KEY `MovieID` (`MovieID`),
  KEY `TheatreID` (`TheatreID`),
  KEY `ScreenID` (`ScreenID`),
  CONSTRAINT `shows_ibfk_1` FOREIGN KEY (`MovieID`) REFERENCES `movies` (`movieId`),
  CONSTRAINT `shows_ibfk_2` FOREIGN KEY (`TheatreID`) REFERENCES `theatre` (`TheatreID`),
  CONSTRAINT `shows_ibfk_3` FOREIGN KEY (`ScreenID`) REFERENCES `screens` (`ScreenID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `shows`
--

LOCK TABLES `shows` WRITE;
/*!40000 ALTER TABLE `shows` DISABLE KEYS */;
INSERT INTO `shows` VALUES (1,1,'10:00:00','12:16:00',10,1,1,1,'2002-12-19'),(2,2,'12:30:00','15:00:00',12,1,2,1,'2003-12-14'),(3,3,'14:00:00','16:22:00',8,2,1,1,'2024-12-15');
/*!40000 ALTER TABLE `shows` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-20 15:23:23
