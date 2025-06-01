CREATE DATABASE IF NOT EXISTS lca;
USE lca;

CREATE TABLE IF NOT EXISTS `users` (
  `id` VARCHAR(40) NOT NULL,
  `userName` VARCHAR(60) NOT NULL,
  `email` VARCHAR(60) NOT NULL,
  `password` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniqueEmail` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

CREATE TABLE IF NOT EXISTS `favorites` (
  `mediaUserRelationshipID` INT(11) NOT NULL AUTO_INCREMENT,
  `userID` VARCHAR(40) NOT NULL,
  `mediaType` VARCHAR(7) NOT NULL,
  `mediaID` INT(11) NOT NULL,
  PRIMARY KEY (`mediaUserRelationshipID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
