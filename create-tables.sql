/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump of table department
# ------------------------------------------------------------

DROP TABLE IF EXISTS `department`;

CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;

INSERT INTO `department` (`id`, `name`)
VALUES
	(1,'Tech'),
	(2,'Sales'),
	(3,'Agriculture'),
	(4,'Photography'),
	(5,'Multimedia'),
	(6,'Astronomy'),
	(7,'Education'),
	(8,'Landscape');

/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;


# Dump of table employee
# ------------------------------------------------------------

DROP TABLE IF EXISTS `employee`;

CREATE TABLE `employee` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `salary` int(11) NOT NULL,
  `department` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_employee_department` (`department`),
  CONSTRAINT `fk_employee_department` FOREIGN KEY (`department`) REFERENCES `department` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;

INSERT INTO `employee` (`id`, `name`, `salary`, `department`)
VALUES
	(7,'Danielle Tesla',70000,1),
	(8,'Chris Cao',20000,1),
	(11,'Lewis Alfaro',40000,1),
	(22,'Employee One',15000,2),
	(23,'Paul Agriculture',75000,3),
	(24,'Chris Fotographer',35000,4),
	(25,'John Planets',95000,6),
	(26,'Media Employee',75000,5),
	(27,'Rachel Video',95000,5),
	(28,'Paul Techincal',65000,1),
	(29,'Sebastian Green',80000,1),
	(30,'David Editor',73000,5),
	(31,'Interstelar Employee',65000,6),
	(34,'Luke Stars',75000,1);

/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
