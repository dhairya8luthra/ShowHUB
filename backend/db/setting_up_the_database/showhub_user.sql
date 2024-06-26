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
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `userid` int NOT NULL,
  `first_name` varchar(250) DEFAULT NULL,
  `last_name` varchar(250) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `email` varchar(150) DEFAULT NULL,
  `password` varchar(250) NOT NULL,
  `createdAt` datetime DEFAULT NULL,
  `phoneno` varchar(10) DEFAULT NULL,
  PRIMARY KEY (`userid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'John','Doe','1990-05-15','john.doe@example.com','password123','2024-04-10 23:25:38','1234567890'),(2,'Jane','Smith','1985-08-20','jane.smith@example.com','qwerty456','2024-04-10 23:25:38','9876543210'),(3,'Michael','Johnson','1978-12-10','michael.j@example.com','passpass','2024-04-10 23:25:38','5558889999'),(1132,NULL,NULL,NULL,'f20221357@hyderabad.bits-pilani.ac.in','password',NULL,NULL),(1502,NULL,NULL,NULL,'jabezisdoraemon@gmail.com','password',NULL,NULL),(2324,NULL,NULL,NULL,'pooja148luthra@gmail.com','babaji123',NULL,NULL),(3463,NULL,NULL,NULL,'pooja148luthra@gmail.com','babaji123',NULL,NULL),(3773,NULL,NULL,NULL,'f20221377@hyderabad.bits-pilani.ac.in','password',NULL,NULL),(4694,NULL,NULL,NULL,'f20221367@hyderabad.bits-pilani.ac.in','password',NULL,NULL),(5306,NULL,NULL,NULL,'pooja148luthra@gmail.com','babaji123',NULL,NULL),(5786,NULL,NULL,NULL,'f20221377@hyderabad.bits-pilani.ac.in','password',NULL,NULL),(6479,NULL,NULL,NULL,'pooja148luthra@gmail.com','babaji123',NULL,NULL),(7618,NULL,NULL,NULL,'f20221377@hyderabad.bits-pilani.ac.in','password',NULL,NULL),(9253,NULL,NULL,NULL,'f20221377@hyderabad.bits-pilni.ac.in','Un@S4s6r@e7msF3',NULL,NULL);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-20 15:23:24
