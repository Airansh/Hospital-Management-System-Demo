-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: softwarearchitecture
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `login_cred`
--

DROP TABLE IF EXISTS `login_cred`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `login_cred` (
  `username` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(50) NOT NULL DEFAULT 'patient',
  `email_id` varchar(255) NOT NULL,
  `security_ans1` varchar(255) NOT NULL,
  `security_ans2` varchar(255) NOT NULL,
  PRIMARY KEY (`username`),
  UNIQUE KEY `email_id_UNIQUE` (`email_id`),
  CONSTRAINT `role_constraint` CHECK (((`role` = _utf8mb4'patient') or (`role` = _utf8mb4'provider') or (`role` = _utf8mb4'admin')))
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `login_cred`
--

LOCK TABLES `login_cred` WRITE;
/*!40000 ALTER TABLE `login_cred` DISABLE KEYS */;
INSERT INTO `login_cred` VALUES ('ved','password','admin','email@email.com','ans1','ans2'),('ved@aa.com','$2b$10$53cf5sRq94GOcFIeaip8Qui3UCEvPLHXzvKWXUrqEMa..ajPL7IFq','patient','ved@aa.com','1999',''),('ved2','password','provider','email2@email.com','ans1','ans2'),('ved3','password','patient','email3@email.com','ans1','ans2'),('ved4','password','patient','email4@email.com','ans1','ans2'),('vedairen@aa.com','$2b$10$L8GoP5WyWQ5J4PYkORkNoeFgY4cS7IcapWWVECBoURHedopGD1TIW','patient','vedairen@aa.com','1999',''),('vedairen@az.com','$2b$10$AKkIveYkz7QktRwddSp5zO1RB6vsjgZDB3KjGUTAtXK2nV8r1BiOG','patient','vedairen@az.com','1999',''),('vedairen@gmail.com','$2b$10$L5epdqprFDTpzlkA.HxLgus4yhOKZLfPj01BierUGUHeVMRarezka','patient','vedairen@gmail.com','2024',''),('vedairen@xyz.com','$2b$10$zpOdE/Nef8exRrwywDvBaOEoLK3ggpK8yCj8LCZUT6OsQT4j6tu1W','patient','vedairen@xyz.com','2024','');
/*!40000 ALTER TABLE `login_cred` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-28 16:43:54
