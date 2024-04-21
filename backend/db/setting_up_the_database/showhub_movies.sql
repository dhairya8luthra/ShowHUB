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
-- Table structure for table `movies`
--

DROP TABLE IF EXISTS `movies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `movies` (
  `movieId` int NOT NULL,
  `title` varchar(300) DEFAULT NULL,
  `description` longtext,
  `actors` varchar(500) DEFAULT NULL,
  `genre` varchar(500) DEFAULT NULL,
  `trailer_link` longtext,
  `release_date` date DEFAULT NULL,
  `poster_link` longtext,
  `running_time` time DEFAULT NULL,
  `createdAt` datetime DEFAULT NULL,
  `active` tinyint(1) DEFAULT NULL,
  `movie_format` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`movieId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `movies`
--

LOCK TABLES `movies` WRITE;
/*!40000 ALTER TABLE `movies` DISABLE KEYS */;
INSERT INTO `movies` VALUES (1,'The Matrix','A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers. very good movie','Keanu Reeves, Laurenee Fishburne','Action, Sci-Fi','https://www.youtube.com/embed/vKQi3bBA1y8?si=25AZXITbjqCPGqIg','2024-04-19','https://source.unsplash.com/UVa6OF2XXIc','00:01:23','2024-04-19 01:17:00',1,'3D'),(2,'Inception','A thief who enters the dreams of others to steal secrets from their subconscious.','Leonardo DiCaprio, Joseph Gordon-Levitt','Action, Adventure, Sci-Fi','https://www.youtube.com/watch?v=YoHD9XEInc0','2010-07-16','https://source.unsplash.com/LiLPRqxWI9I','02:28:00','2024-04-10 23:29:28',1,'2D'),(3,'The Shawshank Redemption','Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.','Tim Robbins, Morgan Freeman','Drama','https://www.youtube.com/watch?v=6hB3S9bIaco','1994-10-14','https://source.unsplash.com/AqHIWSsF24I','02:22:00','2024-04-10 23:29:28',1,'2D');
/*!40000 ALTER TABLE `movies` ENABLE KEYS */;
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
