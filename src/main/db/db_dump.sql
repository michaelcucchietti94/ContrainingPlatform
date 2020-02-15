CREATE DATABASE  IF NOT EXISTS `contraininggame` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `contraininggame`;
-- MySQL dump 10.13  Distrib 8.0.17, for Win64 (x86_64)
--
-- Host: localhost    Database: contraininggame
-- ------------------------------------------------------
-- Server version	8.0.17

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
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `argomento` varchar(255) DEFAULT NULL,
  `descrizione` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `UK_ydkp1xssmfgwwq17iyk7ume4` (`argomento`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` (`id`, `argomento`, `descrizione`) VALUES (1,'Java','[Descrizione dell\'argomento]'),(2,'Angular','[Descrizione dell\'argomento]'),(3,'Spring','[Descrizione dell\'argomento]'),(4,'Deep Learning','[Descrizione dell\'argomento]'),(5,'Protocolli','[Descrizione dell\'argomento]'),(6,'JavaEE','[Descrizione dell\'argomento]'),(7,'Microservizi','[Descrizione dell\'argomento]'),(8,'Versioning','[Descrizione dell\'argomento]'),(9,'Testing','[Descrizione dell\'argomento]'),(10,'Deploying','[Descrizione dell\'argomento]');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `confine`
--

DROP TABLE IF EXISTS `confine`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `confine` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_territorio1` bigint(20) DEFAULT NULL,
  `id_territorio2` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKbqoqrl6trtotx673ygdajndby` (`id_territorio1`),
  KEY `FK67buqjd1235okfi66vtlduie2` (`id_territorio2`),
  CONSTRAINT `FK67buqjd1235okfi66vtlduie2` FOREIGN KEY (`id_territorio2`) REFERENCES `territorio` (`id`),
  CONSTRAINT `FKbqoqrl6trtotx673ygdajndby` FOREIGN KEY (`id_territorio1`) REFERENCES `territorio` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=165 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `confine`
--

LOCK TABLES `confine` WRITE;
/*!40000 ALTER TABLE `confine` DISABLE KEYS */;
INSERT INTO `confine` (`id`, `id_territorio1`, `id_territorio2`) VALUES (1,1,2),(2,1,39),(3,2,1),(4,2,3),(5,2,4),(6,2,5),(7,3,2),(8,3,4),(9,3,5),(10,3,7),(11,3,8),(12,4,5),(13,4,2),(14,4,3),(15,4,6),(16,5,2),(17,5,3),(18,5,4),(19,5,6),(20,5,18),(21,6,4),(22,6,5),(23,6,9),(24,7,3),(25,7,8),(26,7,23),(27,8,3),(28,8,7),(29,8,26),(30,9,6),(31,9,10),(32,9,11),(33,10,9),(34,10,11),(35,10,12),(36,10,17),(37,11,9),(38,11,10),(39,11,12),(40,11,13),(41,12,10),(42,12,11),(43,12,13),(44,12,14),(45,13,11),(46,13,12),(47,13,42),(48,14,12),(49,14,15),(50,15,14),(51,15,16),(52,15,20),(53,16,17),(54,16,18),(55,16,19),(56,16,20),(57,16,15),(58,17,10),(59,17,18),(60,17,16),(61,18,17),(62,18,5),(63,18,16),(64,18,19),(65,18,23),(66,19,18),(67,19,16),(68,19,20),(69,19,21),(70,20,19),(71,20,16),(72,20,21),(73,20,15),(74,21,19),(75,21,20),(76,21,22),(77,22,21),(78,22,31),(79,22,30),(80,22,27),(81,22,24),(82,23,7),(83,23,18),(84,23,26),(85,23,24),(86,23,25),(87,24,23),(88,24,25),(89,24,22),(90,25,27),(91,25,24),(92,25,23),(93,26,8),(94,26,23),(95,26,27),(96,27,26),(97,27,25),(98,27,22),(99,27,28),(100,27,29),(101,27,30),(102,28,27),(103,28,29),(104,28,34),(105,29,27),(106,29,28),(107,29,34),(108,29,32),(109,29,33),(110,29,30),(111,30,29),(112,30,27),(113,30,22),(114,30,31),(115,30,33),(116,31,22),(117,31,30),(118,31,33),(119,31,37),(120,31,38),(121,32,33),(122,32,29),(123,32,34),(124,32,35),(125,32,36),(126,33,31),(127,33,30),(128,33,29),(129,33,32),(130,33,36),(131,33,37),(132,34,28),(133,34,29),(134,34,32),(135,34,35),(136,35,34),(137,35,32),(138,35,36),(139,35,39),(140,35,40),(141,36,37),(142,36,33),(143,36,32),(144,36,35),(145,36,40),(146,37,38),(147,37,31),(148,37,33),(149,37,36),(150,37,40),(151,38,31),(152,38,37),(153,38,41),(154,39,1),(155,39,35),(156,39,40),(157,40,39),(158,40,35),(159,40,36),(160,40,37),(161,41,38),(162,41,42),(163,42,41),(164,42,13);
/*!40000 ALTER TABLE `confine` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `domanda`
--

DROP TABLE IF EXISTS `domanda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `domanda` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `spiegazione` varchar(255) DEFAULT NULL,
  `testo` varchar(255) DEFAULT NULL,
  `id_category` bigint(20) DEFAULT NULL,
  `level` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK5fb7rmkew63n46q0fd7seq4mf` (`id_category`),
  CONSTRAINT `FK5fb7rmkew63n46q0fd7seq4mf` FOREIGN KEY (`id_category`) REFERENCES `categoria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `domanda`
--

LOCK TABLES `domanda` WRITE;
/*!40000 ALTER TABLE `domanda` DISABLE KEYS */;
INSERT INTO `domanda` (`id`, `spiegazione`, `testo`, `id_category`, `level`) VALUES (1,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',1,1),(2,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',1,2),(3,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',1,3),(4,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',1,1),(5,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',1,2),(6,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',1,3),(7,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',2,1),(8,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',2,2),(9,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',2,3),(10,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',2,1),(11,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',2,2),(12,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',2,3),(13,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',3,1),(14,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',3,2),(15,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',3,3),(16,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',3,1),(17,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',3,2),(18,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',3,3),(19,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',4,1),(20,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',4,2),(21,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',4,3),(22,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',4,1),(23,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',4,2),(24,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',4,3),(25,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',5,1),(26,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',5,2),(27,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',5,3),(28,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',5,1),(29,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',5,2),(30,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',5,3),(31,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',6,1),(32,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',6,2),(33,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',6,3),(34,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',6,1),(35,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',6,2),(36,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',6,3),(37,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',7,1),(38,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',7,2),(39,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',7,3),(40,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',7,1),(41,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',7,2),(42,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',7,3),(43,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',8,1),(44,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',8,2),(45,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',2,3),(46,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',8,1),(47,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',8,2),(48,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',8,3),(49,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',9,1),(50,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',9,2),(51,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',9,3),(52,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',9,1),(53,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',9,2),(54,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',9,3),(55,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',10,1),(56,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',10,2),(57,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',10,3),(58,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 1',10,1),(59,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 2',10,2),(60,'e questa è la sua spiegazione','Questo è il testo di una domanda di livello 3',10,3);
/*!40000 ALTER TABLE `domanda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `regola`
--

DROP TABLE IF EXISTS `regola`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `regola` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `testo` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `regola`
--

LOCK TABLES `regola` WRITE;
/*!40000 ALTER TABLE `regola` DISABLE KEYS */;
INSERT INTO `regola` (`id`, `testo`) VALUES (1,'OBIETTIVO: Conquistare il mondo.'),(2,'COME: Completando i test.'),(3,'Il mondo è diviso in continenti, ogni continente in un insieme di stati. Di ogni insieme di stati ce ne sono 3 da conquistare.'),(4,'Un insieme rappresenta uno specifico argomento, ad esempio Java o PHP. Ogni stato di quell’insieme rappresenta un livello per quell’argomento, per un totale di 3 livelli.'),(5,'Ogni utente ha un livello, da 1 a 3. Un utente di livello 1 può rispodere a tutti i test di livello 1, un utente di livello 2 può rispondere a tutti i test di livello 1 e 2.'),(6,'Un utente che ha completato tutti i test di un livello di una specifica categoria può accedere ai test del livello successivo anche se il suo proprio livello è inferiore.'),(7,'Viene stilata una classifica giornaliera, una settimanale e una in base al livello. Il primo della classifica ricopre il ruolo di Code Master del giorno, della settimana, del livello rispettivamente.'),(8,'BUON DIVERTIMENTO!');
/*!40000 ALTER TABLE `regola` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `risposta_domanda`
--

DROP TABLE IF EXISTS `risposta_domanda`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `risposta_domanda` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `corretta` bit(1) DEFAULT NULL,
  `testo` varchar(255) DEFAULT NULL,
  `id_domanda` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKcmch20hu2wgb2q3ecrtvo4s00` (`id_domanda`),
  CONSTRAINT `FKcmch20hu2wgb2q3ecrtvo4s00` FOREIGN KEY (`id_domanda`) REFERENCES `domanda` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=342 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `risposta_domanda`
--

LOCK TABLES `risposta_domanda` WRITE;
/*!40000 ALTER TABLE `risposta_domanda` DISABLE KEYS */;
INSERT INTO `risposta_domanda` (`id`, `corretta`, `testo`, `id_domanda`) VALUES (162,_binary '\0','Risposta sbagliata',1),(163,_binary '','Risposta giusta',1),(164,_binary '\0','Risposta sbagliata',1),(165,_binary '','Risposta giusta',2),(166,_binary '\0','Risposta sbagliata',2),(167,_binary '\0','Risposta sbagliata',2),(168,_binary '','Risposta giusta',3),(169,_binary '\0','Risposta sbagliata',3),(170,_binary '\0','Risposta sbagliata',3),(171,_binary '\0','Risposta sbagliata',4),(172,_binary '\0','Risposta sbagliata',4),(173,_binary '','Risposta giusta',4),(174,_binary '','Risposta giusta',5),(175,_binary '\0','Risposta sbagliata',5),(176,_binary '\0','Risposta sbagliata',5),(177,_binary '\0','Risposta sbagliata',6),(178,_binary '','Risposta giusta',6),(179,_binary '\0','Risposta sbagliata',6),(180,_binary '\0','Risposta sbagliata',7),(181,_binary '\0','Risposta sbagliata',7),(182,_binary '','Risposta giusta',7),(183,_binary '','Risposta giusta',8),(184,_binary '\0','Risposta sbagliata',8),(185,_binary '\0','Risposta sbagliata',8),(186,_binary '\0','Risposta sbagliata',9),(187,_binary '','Risposta giusta',9),(188,_binary '\0','Risposta sbagliata',9),(189,_binary '','Risposta giusta',10),(190,_binary '\0','Risposta sbagliata',10),(191,_binary '\0','Risposta sbagliata',10),(192,_binary '\0','Risposta sbagliata',11),(193,_binary '','Risposta giusta',11),(194,_binary '\0','Risposta sbagliata',11),(195,_binary '','Risposta giusta',12),(196,_binary '\0','Risposta sbagliata',12),(197,_binary '\0','Risposta sbagliata',12),(198,_binary '','Risposta giusta',13),(199,_binary '\0','Risposta sbagliata',13),(200,_binary '\0','Risposta sbagliata',13),(201,_binary '\0','Risposta sbagliata',14),(202,_binary '\0','Risposta sbagliata',14),(203,_binary '','Risposta giusta',14),(204,_binary '','Risposta giusta',15),(205,_binary '\0','Risposta sbagliata',15),(206,_binary '\0','Risposta sbagliata',15),(207,_binary '\0','Risposta sbagliata',16),(208,_binary '','Risposta giusta',16),(209,_binary '\0','Risposta sbagliata',16),(210,_binary '\0','Risposta sbagliata',17),(211,_binary '\0','Risposta sbagliata',17),(212,_binary '','Risposta giusta',17),(213,_binary '','Risposta giusta',18),(214,_binary '\0','Risposta sbagliata',18),(215,_binary '\0','Risposta sbagliata',18),(216,_binary '\0','Risposta sbagliata',19),(217,_binary '','Risposta giusta',19),(218,_binary '\0','Risposta sbagliata',19),(219,_binary '','Risposta giusta',20),(220,_binary '\0','Risposta sbagliata',20),(221,_binary '\0','Risposta sbagliata',20),(222,_binary '\0','Risposta sbagliata',21),(223,_binary '','Risposta giusta',21),(224,_binary '\0','Risposta sbagliata',21),(225,_binary '','Risposta giusta',22),(226,_binary '\0','Risposta sbagliata',22),(227,_binary '\0','Risposta sbagliata',22),(228,_binary '','Risposta giusta',23),(229,_binary '\0','Risposta sbagliata',23),(230,_binary '\0','Risposta sbagliata',23),(231,_binary '\0','Risposta sbagliata',24),(232,_binary '\0','Risposta sbagliata',24),(233,_binary '','Risposta giusta',24),(234,_binary '','Risposta giusta',25),(235,_binary '\0','Risposta sbagliata',25),(236,_binary '\0','Risposta sbagliata',25),(237,_binary '\0','Risposta sbagliata',26),(238,_binary '','Risposta giusta',26),(239,_binary '\0','Risposta sbagliata',26),(240,_binary '\0','Risposta sbagliata',27),(241,_binary '\0','Risposta sbagliata',27),(242,_binary '','Risposta giusta',27),(243,_binary '','Risposta giusta',28),(244,_binary '\0','Risposta sbagliata',28),(245,_binary '\0','Risposta sbagliata',28),(246,_binary '\0','Risposta sbagliata',29),(247,_binary '','Risposta giusta',29),(248,_binary '\0','Risposta sbagliata',29),(249,_binary '','Risposta giusta',30),(250,_binary '\0','Risposta sbagliata',30),(251,_binary '\0','Risposta sbagliata',30),(252,_binary '\0','Risposta sbagliata',31),(253,_binary '','Risposta giusta',31),(254,_binary '\0','Risposta sbagliata',31),(255,_binary '','Risposta giusta',32),(256,_binary '\0','Risposta sbagliata',32),(257,_binary '\0','Risposta sbagliata',32),(258,_binary '','Risposta giusta',33),(259,_binary '\0','Risposta sbagliata',33),(260,_binary '\0','Risposta sbagliata',33),(261,_binary '\0','Risposta sbagliata',34),(262,_binary '\0','Risposta sbagliata',34),(263,_binary '','Risposta giusta',34),(264,_binary '','Risposta giusta',35),(265,_binary '\0','Risposta sbagliata',35),(266,_binary '\0','Risposta sbagliata',35),(267,_binary '\0','Risposta sbagliata',36),(268,_binary '','Risposta giusta',36),(269,_binary '\0','Risposta sbagliata',36),(270,_binary '\0','Risposta sbagliata',37),(271,_binary '\0','Risposta sbagliata',37),(272,_binary '','Risposta giusta',37),(273,_binary '','Risposta giusta',38),(274,_binary '\0','Risposta sbagliata',38),(275,_binary '\0','Risposta sbagliata',38),(276,_binary '\0','Risposta sbagliata',39),(277,_binary '','Risposta giusta',39),(278,_binary '\0','Risposta sbagliata',39),(279,_binary '','Risposta giusta',40),(280,_binary '\0','Risposta sbagliata',40),(281,_binary '\0','Risposta sbagliata',40),(282,_binary '\0','Risposta sbagliata',41),(283,_binary '','Risposta giusta',41),(284,_binary '\0','Risposta sbagliata',41),(285,_binary '','Risposta giusta',42),(286,_binary '\0','Risposta sbagliata',42),(287,_binary '\0','Risposta sbagliata',42),(288,_binary '','Risposta giusta',43),(289,_binary '\0','Risposta sbagliata',43),(290,_binary '\0','Risposta sbagliata',43),(291,_binary '\0','Risposta sbagliata',44),(292,_binary '\0','Risposta sbagliata',44),(293,_binary '','Risposta giusta',44),(294,_binary '','Risposta giusta',45),(295,_binary '\0','Risposta sbagliata',45),(296,_binary '\0','Risposta sbagliata',45),(297,_binary '\0','Risposta sbagliata',46),(298,_binary '','Risposta giusta',46),(299,_binary '\0','Risposta sbagliata',46),(300,_binary '\0','Risposta sbagliata',47),(301,_binary '\0','Risposta sbagliata',47),(302,_binary '','Risposta giusta',47),(303,_binary '','Risposta giusta',48),(304,_binary '\0','Risposta sbagliata',48),(305,_binary '\0','Risposta sbagliata',48),(306,_binary '\0','Risposta sbagliata',49),(307,_binary '','Risposta giusta',49),(308,_binary '\0','Risposta sbagliata',49),(309,_binary '','Risposta giusta',50),(310,_binary '\0','Risposta sbagliata',50),(311,_binary '\0','Risposta sbagliata',50),(312,_binary '\0','Risposta sbagliata',51),(313,_binary '','Risposta giusta',51),(314,_binary '\0','Risposta sbagliata',51),(315,_binary '','Risposta giusta',52),(316,_binary '\0','Risposta sbagliata',52),(317,_binary '\0','Risposta sbagliata',52),(318,_binary '','Risposta giusta',53),(319,_binary '\0','Risposta sbagliata',53),(320,_binary '\0','Risposta sbagliata',53),(321,_binary '\0','Risposta sbagliata',54),(322,_binary '\0','Risposta sbagliata',54),(323,_binary '','Risposta giusta',54),(324,_binary '','Risposta giusta',55),(325,_binary '\0','Risposta sbagliata',55),(326,_binary '\0','Risposta sbagliata',55),(327,_binary '\0','Risposta sbagliata',56),(328,_binary '','Risposta giusta',56),(329,_binary '\0','Risposta sbagliata',56),(330,_binary '\0','Risposta sbagliata',57),(331,_binary '\0','Risposta sbagliata',57),(332,_binary '','Risposta giusta',57),(333,_binary '','Risposta giusta',58),(334,_binary '\0','Risposta sbagliata',58),(335,_binary '\0','Risposta sbagliata',58),(336,_binary '\0','Risposta sbagliata',59),(337,_binary '','Risposta giusta',59),(338,_binary '\0','Risposta sbagliata',59),(339,_binary '','Risposta giusta',60),(340,_binary '\0','Risposta sbagliata',60),(341,_binary '\0','Risposta sbagliata',60);
/*!40000 ALTER TABLE `risposta_domanda` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `risposta_utente`
--

DROP TABLE IF EXISTS `risposta_utente`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `risposta_utente` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `insertdate` date DEFAULT NULL,
  `question_score` bigint(20) DEFAULT NULL,
  `seconds_for_answering` bigint(20) DEFAULT NULL,
  `id_risposta` bigint(20) DEFAULT NULL,
  `id_utente` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FKdy4qf5nmpoe59hylxv14od2ov` (`id_risposta`),
  KEY `FKhp38xsin5i34cgi1yq5wvjhug` (`id_utente`),
  CONSTRAINT `FKdy4qf5nmpoe59hylxv14od2ov` FOREIGN KEY (`id_risposta`) REFERENCES `risposta_domanda` (`id`),
  CONSTRAINT `FKhp38xsin5i34cgi1yq5wvjhug` FOREIGN KEY (`id_utente`) REFERENCES `user` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=375 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `risposta_utente`
--

LOCK TABLES `risposta_utente` WRITE;
/*!40000 ALTER TABLE `risposta_utente` DISABLE KEYS */;
INSERT INTO `risposta_utente` (`id`, `insertdate`, `question_score`, `seconds_for_answering`, `id_risposta`, `id_utente`) VALUES (1,'2019-11-30',100,14,217,'user1'),(2,'2019-11-30',0,3,227,'user1'),(3,'2019-11-30',100,3,217,'user1'),(4,'2019-11-30',100,3,225,'user1'),(5,'2019-11-30',100,9,225,'user1'),(6,'2019-11-30',100,2,217,'user1'),(7,'2019-11-30',100,2,219,'user1'),(8,'2019-11-30',0,3,230,'user1'),(9,'2019-11-30',0,2,231,'user1'),(10,'2019-11-30',0,2,222,'user1'),(11,'2019-11-30',100,2,233,'user1'),(12,'2019-11-30',0,3,222,'user1'),(13,'2019-11-30',0,1,237,'user1'),(14,'2019-11-30',100,2,247,'user1'),(15,'2019-11-30',100,2,247,'user1'),(16,'2019-11-30',100,2,238,'user1'),(17,'2019-11-30',100,2,249,'user1'),(18,'2019-11-30',100,2,242,'user1'),(19,'2019-11-30',100,2,228,'user1'),(20,'2019-11-30',100,2,219,'user1'),(21,'2019-11-30',100,3,228,'user1'),(22,'2019-11-30',100,2,219,'user1'),(23,'2019-11-30',100,3,294,'user1'),(24,'2019-11-30',100,2,187,'user1'),(25,'2019-11-30',100,3,195,'user1'),(26,'2019-11-30',100,2,233,'user1'),(27,'2019-11-30',100,2,223,'user1'),(28,'2019-11-30',100,2,339,'user1'),(29,'2019-11-30',100,3,332,'user1'),(30,'2019-11-30',100,2,294,'user1'),(31,'2019-11-30',100,2,195,'user1'),(32,'2019-11-30',100,2,187,'user1'),(33,'2019-11-30',100,2,187,'user1'),(34,'2019-11-30',100,2,195,'user1'),(35,'2019-11-30',100,2,294,'user1'),(36,'2019-11-30',100,3,332,'user1'),(37,'2019-11-30',100,2,339,'user1'),(38,'2019-11-30',100,3,203,'user1'),(39,'2019-11-30',100,2,212,'user1'),(40,'2019-11-30',0,3,175,'user1'),(41,'2019-11-30',100,2,165,'user1'),(42,'2019-11-30',100,3,178,'user1'),(43,'2019-11-30',100,1,168,'user1'),(44,'2019-11-30',100,2,258,'user1'),(45,'2019-11-30',100,3,268,'user1'),(46,'2019-11-30',100,2,258,'user1'),(47,'2019-11-30',100,2,268,'user1'),(48,'2019-11-30',100,2,225,'user1'),(49,'2019-11-30',100,2,217,'user1'),(50,'2019-11-30',100,2,174,'user1'),(51,'2019-11-30',100,2,165,'user1'),(52,'2019-11-30',100,3,288,'user1'),(53,'2019-11-30',100,1,298,'user1'),(54,'2019-11-30',100,2,168,'user1'),(55,'2019-11-30',100,2,178,'user1'),(56,'2019-11-30',100,2,303,'user1'),(57,'2019-11-30',100,2,277,'user1'),(58,'2019-11-30',100,2,285,'user1'),(59,'2019-11-30',100,2,324,'user1'),(60,'2019-11-30',100,1,333,'user1'),(61,'2019-11-30',100,2,332,'user1'),(62,'2019-11-30',100,2,339,'user1'),(63,'2019-11-30',100,3,323,'user1'),(64,'2019-11-30',100,2,313,'user1'),(65,'2019-11-30',100,2,204,'user1'),(66,'2019-11-30',100,2,213,'user1'),(67,'2019-11-30',100,3,178,'user1'),(68,'2019-11-30',100,2,168,'user1'),(69,'2019-11-30',100,2,313,'user1'),(70,'2019-11-30',100,2,323,'user1'),(71,'2019-11-30',100,2,332,'user1'),(72,'2019-11-30',100,1,339,'user1'),(73,'2019-11-30',100,3,332,'user1'),(74,'2019-11-30',100,1,339,'user1'),(75,'2019-11-30',100,2,313,'user1'),(76,'2019-11-30',100,2,323,'user1'),(77,'2019-11-30',100,1,168,'user1'),(78,'2019-11-30',100,1,178,'user1'),(79,'2019-11-30',100,2,168,'user1'),(80,'2019-11-30',100,2,178,'user1'),(81,'2019-11-30',100,3,195,'user1'),(82,'2019-11-30',100,2,294,'user1'),(83,'2019-11-30',100,2,187,'user1'),(84,'2019-11-30',100,2,204,'user1'),(85,'2019-11-30',100,2,213,'user1'),(86,'2019-11-30',100,2,233,'user1'),(87,'2019-11-30',100,2,223,'user1'),(88,'2019-11-30',100,2,242,'user1'),(89,'2019-11-30',100,2,249,'user1'),(90,'2019-11-30',100,1,268,'user1'),(91,'2019-11-30',100,2,258,'user1'),(92,'2019-11-30',100,2,204,'user1'),(93,'2019-11-30',100,2,213,'user1'),(94,'2019-11-30',100,1,204,'user1'),(95,'2019-11-30',100,1,213,'user1'),(96,'2019-11-30',100,1,285,'user1'),(97,'2019-11-30',100,2,277,'user1'),(98,'2019-11-30',100,2,303,'user1'),(99,'2019-11-30',100,2,323,'user1'),(100,'2019-11-30',100,2,313,'user1'),(101,'2019-11-30',100,3,315,'user1'),(102,'2019-11-30',100,2,307,'user1'),(103,'2019-11-30',100,2,339,'user1'),(104,'2019-11-30',100,2,332,'user1'),(105,'2019-11-30',100,2,178,'user1'),(106,'2019-11-30',100,2,168,'user1'),(107,'2019-11-30',100,2,187,'user1'),(108,'2019-11-30',100,1,195,'user1'),(109,'2019-11-30',100,2,294,'user1'),(110,'2019-11-30',100,1,213,'user1'),(111,'2019-11-30',100,2,204,'user1'),(112,'2019-11-30',100,2,187,'user1'),(113,'2019-11-30',100,1,294,'user1'),(114,'2019-11-30',100,2,195,'user1'),(115,'2019-11-30',100,2,339,'user1'),(116,'2019-11-30',100,2,332,'user1'),(117,'2019-11-30',100,2,242,'user1'),(118,'2019-11-30',100,2,249,'user1'),(119,'2019-11-30',100,2,163,'user1'),(120,'2019-11-30',100,2,173,'user1'),(121,'2019-11-30',100,2,178,'user1'),(122,'2019-11-30',100,2,168,'user1'),(123,'2019-11-30',100,8,258,'user1'),(124,'2019-11-30',100,2,268,'user1'),(125,'2019-11-30',100,2,303,'user1'),(126,'2019-11-30',100,2,303,'user1'),(127,'2019-11-30',100,2,303,'user1'),(128,'2019-11-30',100,2,303,'user1'),(129,'2019-11-30',100,1,173,'user1'),(130,'2019-11-30',100,3,163,'user1'),(131,'2019-11-30',100,2,268,'user1'),(132,'2019-11-30',100,2,258,'user1'),(133,'2019-11-30',100,2,279,'user1'),(134,'2019-11-30',0,2,271,'user1'),(135,'2019-11-30',100,1,279,'user1'),(136,'2019-11-30',100,2,272,'user1'),(137,'2019-11-30',100,2,212,'user1'),(138,'2019-11-30',100,2,203,'user1'),(139,'2019-11-30',100,2,187,'user1'),(140,'2019-11-30',100,1,195,'user1'),(141,'2019-11-30',100,2,294,'user1'),(142,'2019-11-30',100,2,213,'user1'),(143,'2019-11-30',100,2,204,'user1'),(144,'2019-11-30',100,2,213,'user1'),(145,'2019-11-30',100,3,204,'user1'),(146,'2019-11-30',100,2,163,'user1'),(147,'2019-11-30',100,3,173,'user1'),(148,'2019-11-30',100,2,258,'user1'),(149,'2019-11-30',100,0,258,'user1'),(150,'2019-11-30',100,2,294,'user1'),(151,'2019-11-30',100,1,187,'user1'),(152,'2019-11-30',100,2,195,'user1'),(153,'2019-11-30',100,2,233,'user1'),(154,'2019-11-30',100,2,223,'user1'),(155,'2019-11-30',100,2,204,'user1'),(156,'2019-11-30',100,2,213,'user1'),(157,'2019-11-30',100,1,213,'user1'),(158,'2019-11-30',100,2,204,'user1'),(159,'2019-11-30',100,3,213,'user1'),(160,'2019-11-30',100,2,204,'user1'),(161,'2019-11-30',100,2,204,'user1'),(162,'2019-11-30',100,1,213,'user1'),(163,'2019-11-30',100,2,285,'user1'),(164,'2019-11-30',100,2,277,'user1'),(165,'2019-11-30',100,2,213,'user1'),(166,'2019-11-30',100,1,204,'user1'),(167,'2019-11-30',100,2,233,'user1'),(168,'2019-11-30',100,2,223,'user1'),(169,'2019-11-30',100,2,263,'user1'),(170,'2019-11-30',100,2,253,'user1'),(171,'2019-11-30',100,2,195,'user1'),(172,'2019-11-30',100,4,294,'user1'),(173,'2019-11-30',100,3,187,'user1'),(174,'2019-11-30',100,2,234,'user1'),(175,'2019-11-30',100,2,243,'user1'),(176,'2019-11-30',100,3,268,'user1'),(177,'2019-11-30',100,2,258,'user1'),(178,'2019-11-30',100,1,234,'user1'),(179,'2019-11-30',100,2,243,'user1'),(180,'2019-11-30',100,3,258,'user1'),(181,'2019-11-30',100,2,268,'user1'),(182,'2019-11-30',100,2,242,'user1'),(183,'2019-11-30',100,2,249,'user1'),(184,'2019-11-30',100,3,285,'user1'),(185,'2019-11-30',100,2,277,'user1'),(186,'2019-11-30',100,3,285,'user1'),(187,'2019-11-30',100,4,277,'user1'),(188,'2019-11-30',100,2,258,'user1'),(189,'2019-11-30',100,2,268,'user1'),(190,'2019-11-30',100,2,258,'user1'),(191,'2019-11-30',100,2,268,'user1'),(192,'2019-11-30',100,2,268,'user1'),(193,'2019-11-30',100,2,258,'user1'),(194,'2019-11-30',100,2,285,'user1'),(195,'2019-11-30',100,2,277,'user1'),(196,'2019-11-30',100,3,242,'user1'),(197,'2019-11-30',100,1,249,'user1'),(198,'2019-11-30',100,3,249,'user1'),(199,'2019-11-30',100,2,242,'user1'),(200,'2019-11-30',100,1,249,'user1'),(201,'2019-11-30',100,2,242,'user1'),(202,'2019-11-30',100,2,272,'user1'),(203,'2019-11-30',100,2,279,'user1'),(204,'2019-11-30',100,2,268,'user1'),(205,'2019-11-30',100,2,258,'user1'),(206,'2019-11-30',100,2,303,'user1'),(207,'2019-11-30',100,2,313,'user1'),(208,'2019-11-30',100,3,323,'user1'),(209,'2019-11-30',100,2,263,'user1'),(210,'2019-11-30',100,2,253,'user1'),(211,'2019-11-30',100,2,339,'user1'),(212,'2019-11-30',100,2,332,'user1'),(213,'2019-11-30',100,2,285,'user1'),(214,'2019-11-30',100,3,277,'user1'),(215,'2019-11-30',100,3,339,'user1'),(216,'2019-11-30',100,2,332,'user1'),(217,'2019-11-30',100,2,168,'user1'),(218,'2019-11-30',100,2,178,'user1'),(219,'2019-11-30',100,2,178,'user1'),(220,'2019-11-30',100,2,168,'user1'),(221,'2019-11-30',100,2,204,'user1'),(222,'2019-11-30',100,1,213,'user1'),(223,'2019-11-30',100,2,294,'user1'),(224,'2019-11-30',100,1,187,'user1'),(225,'2019-11-30',100,3,195,'user1'),(226,'2019-11-30',100,2,189,'user1'),(227,'2019-11-30',100,2,182,'user1'),(228,'2019-11-30',100,2,294,'user1'),(229,'2019-11-30',100,2,195,'user1'),(230,'2019-11-30',100,2,187,'user1'),(231,'2019-11-30',100,2,187,'user1'),(232,'2019-11-30',100,2,195,'user1'),(233,'2019-11-30',100,2,294,'user1'),(234,'2019-11-30',100,2,294,'user1'),(235,'2019-11-30',100,0,294,'user1'),(236,'2019-11-30',100,2,195,'user1'),(237,'2019-11-30',100,1,178,'user1'),(238,'2019-11-30',100,2,168,'user1'),(239,'2019-11-30',100,1,168,'user1'),(240,'2019-11-30',100,2,178,'user1'),(241,'2019-11-30',100,2,178,'user1'),(242,'2019-11-30',100,2,168,'user1'),(243,'2019-11-30',100,2,303,'user1'),(244,'2019-11-30',100,1,168,'user1'),(245,'2019-11-30',100,2,178,'user1'),(246,'2019-11-30',100,2,195,'user1'),(247,'2019-11-30',100,2,294,'user1'),(248,'2019-11-30',100,2,187,'user1'),(249,'2019-11-30',100,2,168,'user1'),(250,'2019-12-01',0,4,280,'user1'),(251,'2019-12-01',0,2,270,'user1'),(252,'2019-12-01',100,2,285,'user1'),(253,'2019-12-01',100,2,277,'user1'),(254,'2019-12-01',100,3,277,'user1'),(255,'2019-12-01',100,2,285,'user1'),(256,'2019-12-01',100,2,332,'user1'),(257,'2019-12-01',100,2,339,'user1'),(258,'2019-12-01',100,3,242,'user1'),(259,'2019-12-01',100,3,249,'user1'),(260,'2019-12-01',100,3,294,'user1'),(261,'2019-12-01',100,3,187,'user1'),(262,'2019-12-01',100,6,195,'user1'),(263,'2019-12-01',100,5,163,'user1'),(264,'2019-12-01',100,3,173,'user1'),(265,'2019-12-01',100,3,307,'user1'),(266,'2019-12-01',100,0,307,'user1'),(267,'2019-12-01',0,22,297,'user1'),(268,'2019-12-01',0,4,289,'user1'),(269,'2019-12-01',100,4,173,'user1'),(270,'2019-12-01',100,1,173,'user1'),(271,'2019-12-02',100,7,333,'user1'),(272,'2019-12-02',100,4,324,'user1'),(273,'2019-12-02',100,3,337,'user1'),(274,'2019-12-02',100,3,328,'user1'),(275,'2019-12-02',100,3,309,'user1'),(276,'2019-12-02',100,3,318,'user1'),(277,'2019-12-02',100,3,253,'user1'),(278,'2019-12-02',100,3,263,'user1'),(279,'2019-12-02',100,6,333,'user1'),(280,'2019-12-02',100,4,324,'user1'),(281,'2019-12-02',100,3,333,'user1'),(282,'2019-12-02',100,9,324,'user1'),(283,'2019-12-02',100,3,163,'user1'),(284,'2019-12-02',100,5,173,'user1'),(285,'2019-12-02',100,3,165,'user1'),(286,'2019-12-02',100,7,174,'user1'),(287,'2019-12-02',100,3,174,'user1'),(288,'2019-12-02',100,3,165,'user1'),(289,'2019-12-02',100,2,323,'user1'),(290,'2019-12-02',100,2,313,'user1'),(291,'2019-12-02',100,3,288,'user1'),(292,'2019-12-02',100,1,298,'user1'),(293,'2019-12-02',100,2,233,'user1'),(294,'2019-12-02',100,2,223,'user1'),(295,'2019-12-02',100,2,242,'user1'),(296,'2019-12-02',100,1,249,'user1'),(297,'2019-12-02',100,1,268,'user1'),(298,'2019-12-02',100,2,258,'user1'),(299,'2019-12-02',100,3,323,'user1'),(300,'2019-12-02',100,2,313,'user1'),(301,'2019-12-02',100,2,178,'user1'),(302,'2019-12-02',100,2,168,'user1'),(303,'2019-12-02',100,2,294,'user1'),(304,'2019-12-02',100,1,187,'user1'),(305,'2019-12-02',100,2,195,'user1'),(306,'2019-12-02',100,2,339,'user1'),(307,'2019-12-02',100,3,332,'user1'),(308,'2019-12-02',100,2,213,'user1'),(309,'2019-12-02',100,2,204,'user1'),(310,'2019-12-02',100,2,268,'user1'),(311,'2019-12-02',100,2,258,'user1'),(312,'2019-12-02',100,1,324,'user1'),(313,'2019-12-02',100,2,333,'user1'),(314,'2019-12-02',100,2,333,'user1'),(315,'2019-12-02',100,2,324,'user1'),(316,'2019-12-02',100,4,324,'user1'),(317,'2019-12-02',100,2,333,'user1'),(318,'2019-12-02',100,2,324,'user1'),(319,'2019-12-02',100,2,333,'user1'),(320,'2019-12-02',100,2,333,'user1'),(321,'2019-12-02',100,2,324,'user1'),(322,'2019-12-02',100,2,208,'user1'),(323,'2019-12-02',100,2,198,'user1'),(324,'2019-12-02',100,2,233,'user1'),(325,'2019-12-02',100,2,223,'user1'),(326,'2019-12-02',100,2,238,'user1'),(327,'2019-12-02',100,2,247,'user1'),(328,'2019-12-02',100,2,198,'user1'),(329,'2019-12-02',100,2,208,'user1'),(330,'2019-12-02',100,2,198,'user1'),(331,'2019-12-02',100,2,208,'user1'),(332,'2019-12-02',100,2,208,'user1'),(333,'2019-12-02',100,2,198,'user1'),(334,'2019-12-02',100,2,294,'user1'),(335,'2019-12-02',100,2,195,'user1'),(336,'2019-12-02',100,3,187,'user1'),(337,'2019-12-02',100,2,198,'user1'),(338,'2019-12-02',100,2,208,'user1'),(339,'2019-12-02',100,2,204,'user1'),(340,'2019-12-02',100,2,213,'user1'),(341,'2019-12-02',100,1,213,'user1'),(342,'2019-12-02',100,2,204,'user1'),(343,'2019-12-02',100,2,213,'user1'),(344,'2019-12-02',100,2,204,'user1'),(345,'2019-12-02',100,2,204,'user1'),(346,'2019-12-02',100,2,213,'user1'),(347,'2019-12-02',100,3,217,'user1'),(348,'2019-12-02',100,2,225,'user1'),(349,'2019-12-02',100,2,198,'user1'),(350,'2019-12-02',100,3,208,'user1'),(351,'2019-12-02',100,2,198,'user1'),(352,'2019-12-02',100,2,208,'user1'),(353,'2019-12-02',100,2,208,'user1'),(354,'2019-12-02',100,1,198,'user1'),(355,'2019-12-02',100,2,213,'user1'),(356,'2019-12-02',100,2,204,'user1'),(357,'2019-12-02',100,2,208,'user1'),(358,'2019-12-02',100,1,198,'user1'),(359,'2019-12-02',100,2,217,'user1'),(360,'2019-12-02',100,3,225,'user1'),(361,'2019-12-04',100,5,195,'user1'),(362,'2019-12-04',100,3,294,'user1'),(363,'2019-12-04',100,3,187,'user1'),(364,'2019-12-04',100,2,189,'user1'),(365,'2019-12-04',100,2,182,'user1'),(366,'2019-12-04',100,2,313,'user1'),(367,'2019-12-04',100,2,323,'user1'),(368,'2019-12-04',100,2,208,'user1'),(369,'2019-12-04',100,3,198,'user1'),(370,'2019-12-04',100,5,198,'user1'),(371,'2019-12-04',100,1,208,'user1'),(372,'2019-12-04',100,2,187,'user1'),(373,'2019-12-04',100,1,294,'user1'),(374,'2019-12-04',100,2,195,'user1');
/*!40000 ALTER TABLE `risposta_utente` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tempo_testo`
--

DROP TABLE IF EXISTS `tempo_testo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tempo_testo` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `parole` bigint(20) DEFAULT NULL,
  `seconds` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=375 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tempo_testo`
--

LOCK TABLES `tempo_testo` WRITE;
/*!40000 ALTER TABLE `tempo_testo` DISABLE KEYS */;
INSERT INTO `tempo_testo` (`id`, `parole`, `seconds`) VALUES (1,16,14),(2,16,3),(3,16,3),(4,16,3),(5,16,9),(6,16,2),(7,16,2),(8,16,3),(9,16,2),(10,16,2),(11,16,2),(12,16,3),(13,16,1),(14,16,2),(15,16,2),(16,16,2),(17,16,2),(18,16,2),(19,16,2),(20,16,2),(21,16,3),(22,16,2),(23,16,3),(24,16,2),(25,16,3),(26,16,2),(27,16,2),(28,16,2),(29,16,3),(30,16,2),(31,16,2),(32,16,2),(33,16,2),(34,16,2),(35,16,2),(36,16,3),(37,16,2),(38,16,3),(39,16,2),(40,16,3),(41,16,2),(42,16,3),(43,16,1),(44,16,2),(45,16,3),(46,16,2),(47,16,2),(48,16,2),(49,16,2),(50,16,2),(51,16,2),(52,16,3),(53,16,1),(54,16,2),(55,16,2),(56,16,2),(57,16,2),(58,16,2),(59,16,2),(60,16,1),(61,16,2),(62,16,2),(63,16,3),(64,16,2),(65,16,2),(66,16,2),(67,16,3),(68,16,2),(69,16,2),(70,16,2),(71,16,2),(72,16,1),(73,16,3),(74,16,1),(75,16,2),(76,16,2),(77,16,1),(78,16,1),(79,16,2),(80,16,2),(81,16,3),(82,16,2),(83,16,2),(84,16,2),(85,16,2),(86,16,2),(87,16,2),(88,16,2),(89,16,2),(90,16,1),(91,16,2),(92,16,2),(93,16,2),(94,16,1),(95,16,1),(96,16,1),(97,16,2),(98,16,2),(99,16,2),(100,16,2),(101,16,3),(102,16,2),(103,16,2),(104,16,2),(105,16,2),(106,16,2),(107,16,2),(108,16,1),(109,16,2),(110,16,1),(111,16,2),(112,16,2),(113,16,1),(114,16,2),(115,16,2),(116,16,2),(117,16,2),(118,16,2),(119,16,2),(120,16,2),(121,16,2),(122,16,2),(123,16,8),(124,16,2),(125,16,2),(126,16,2),(127,16,2),(128,16,2),(129,16,1),(130,16,3),(131,16,2),(132,16,2),(133,16,2),(134,16,2),(135,16,1),(136,16,2),(137,16,2),(138,16,2),(139,16,2),(140,16,1),(141,16,2),(142,16,2),(143,16,2),(144,16,2),(145,16,3),(146,16,2),(147,16,3),(148,16,2),(149,16,0),(150,16,2),(151,16,1),(152,16,2),(153,16,2),(154,16,2),(155,16,2),(156,16,2),(157,16,1),(158,16,2),(159,16,3),(160,16,2),(161,16,2),(162,16,1),(163,16,2),(164,16,2),(165,16,2),(166,16,1),(167,16,2),(168,16,2),(169,16,2),(170,16,2),(171,16,2),(172,16,4),(173,16,3),(174,16,2),(175,16,2),(176,16,3),(177,16,2),(178,16,1),(179,16,2),(180,16,3),(181,16,2),(182,16,2),(183,16,2),(184,16,3),(185,16,2),(186,16,3),(187,16,4),(188,16,2),(189,16,2),(190,16,2),(191,16,2),(192,16,2),(193,16,2),(194,16,2),(195,16,2),(196,16,3),(197,16,1),(198,16,3),(199,16,2),(200,16,1),(201,16,2),(202,16,2),(203,16,2),(204,16,2),(205,16,2),(206,16,2),(207,16,2),(208,16,3),(209,16,2),(210,16,2),(211,16,2),(212,16,2),(213,16,2),(214,16,3),(215,16,3),(216,16,2),(217,16,2),(218,16,2),(219,16,2),(220,16,2),(221,16,2),(222,16,1),(223,16,2),(224,16,1),(225,16,3),(226,16,2),(227,16,2),(228,16,2),(229,16,2),(230,16,2),(231,16,2),(232,16,2),(233,16,2),(234,16,2),(235,16,0),(236,16,2),(237,16,1),(238,16,2),(239,16,1),(240,16,2),(241,16,2),(242,16,2),(243,16,2),(244,16,1),(245,16,2),(246,16,2),(247,16,2),(248,16,2),(249,16,2),(250,16,4),(251,16,2),(252,16,2),(253,16,2),(254,16,3),(255,16,2),(256,16,2),(257,16,2),(258,16,3),(259,16,3),(260,16,3),(261,16,3),(262,16,6),(263,16,5),(264,16,3),(265,16,3),(266,16,0),(267,16,22),(268,16,4),(269,16,4),(270,16,1),(271,16,7),(272,16,4),(273,16,3),(274,16,3),(275,16,3),(276,16,3),(277,16,3),(278,16,3),(279,16,6),(280,16,4),(281,16,3),(282,16,9),(283,16,3),(284,16,5),(285,16,3),(286,16,7),(287,16,3),(288,16,3),(289,16,2),(290,16,2),(291,16,3),(292,16,1),(293,16,2),(294,16,2),(295,16,2),(296,16,1),(297,16,1),(298,16,2),(299,16,3),(300,16,2),(301,16,2),(302,16,2),(303,16,2),(304,16,1),(305,16,2),(306,16,2),(307,16,3),(308,16,2),(309,16,2),(310,16,2),(311,16,2),(312,16,1),(313,16,2),(314,16,2),(315,16,2),(316,16,4),(317,16,2),(318,16,2),(319,16,2),(320,16,2),(321,16,2),(322,16,2),(323,16,2),(324,16,2),(325,16,2),(326,16,2),(327,16,2),(328,16,2),(329,16,2),(330,16,2),(331,16,2),(332,16,2),(333,16,2),(334,16,2),(335,16,2),(336,16,3),(337,16,2),(338,16,2),(339,16,2),(340,16,2),(341,16,1),(342,16,2),(343,16,2),(344,16,2),(345,16,2),(346,16,2),(347,16,3),(348,16,2),(349,16,2),(350,16,3),(351,16,2),(352,16,2),(353,16,2),(354,16,1),(355,16,2),(356,16,2),(357,16,2),(358,16,1),(359,16,2),(360,16,3),(361,16,5),(362,16,3),(363,16,3),(364,16,2),(365,16,2),(366,16,2),(367,16,2),(368,16,2),(369,16,3),(370,16,5),(371,16,1),(372,16,2),(373,16,1),(374,16,2);
/*!40000 ALTER TABLE `tempo_testo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `territorio`
--

DROP TABLE IF EXISTS `territorio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `territorio` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `id_category` bigint(20) DEFAULT NULL,
  `armate` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK8wpg37sjixjidps587am2i7hp` (`id_category`),
  CONSTRAINT `FK8wpg37sjixjidps587am2i7hp` FOREIGN KEY (`id_category`) REFERENCES `categoria` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `territorio`
--

LOCK TABLES `territorio` WRITE;
/*!40000 ALTER TABLE `territorio` DISABLE KEYS */;
INSERT INTO `territorio` (`id`, `id_category`, `armate`) VALUES (1,1,0),(2,2,0),(3,3,0),(4,4,0),(5,5,0),(6,6,0),(7,7,0),(8,8,0),(9,9,0),(10,10,0),(11,1,0),(12,2,0),(13,3,0),(14,4,0),(15,5,0),(16,6,0),(17,7,0),(18,8,0),(19,9,0),(20,10,0),(21,1,0),(22,2,0),(23,3,0),(24,4,0),(25,5,0),(26,6,0),(27,7,0),(28,8,0),(29,9,0),(30,10,0),(31,1,0),(32,2,0),(33,3,0),(34,4,0),(35,5,0),(36,6,0),(37,7,0),(38,8,0),(39,9,0),(40,10,0),(41,1,0),(42,2,0);
/*!40000 ALTER TABLE `territorio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testo_training`
--

DROP TABLE IF EXISTS `testo_training`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `testo_training` (
  `id` bigint(20) NOT NULL AUTO_INCREMENT,
  `testo` varchar(3000) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testo_training`
--

LOCK TABLES `testo_training` WRITE;
/*!40000 ALTER TABLE `testo_training` DISABLE KEYS */;
/*!40000 ALTER TABLE `testo_training` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `username` varchar(255) NOT NULL,
  `cognome` varchar(255) DEFAULT NULL,
  `data_nascita` datetime DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `first_access` bit(1) DEFAULT NULL,
  `livello` bigint(20) DEFAULT NULL,
  `nome` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `usertype` int(11) DEFAULT NULL,
  PRIMARY KEY (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` (`username`, `cognome`, `data_nascita`, `email`, `first_access`, `livello`, `nome`, `password`, `usertype`) VALUES ('admin','Cucchietti','1994-02-18 00:00:00','admin@admin.it',_binary '',3,'Michael','admin',0),('user1','Cuffaro','1997-12-07 00:00:00','user@user.it',_binary '',10,'Francesco','user',1),('user2','Pollio','1994-04-19 00:00:00','user@user.it',_binary '',10,'Antonino','user',1);
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

-- Dump completed on 2019-12-05 15:42:22
