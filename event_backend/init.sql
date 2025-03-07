-- Create the `event` table
CREATE TABLE IF NOT EXISTS `event` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `date` datetime NOT NULL,
  `ticketsAvailable` int(11) NOT NULL,
  `status` ENUM('Available','Sold Out') NOT NULL DEFAULT 'Available',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Create the `order` table
CREATE TABLE IF NOT EXISTS `order` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderNumber` varchar(255) NOT NULL,
  `ticketsPurchased` int(11) NOT NULL,
  `eventId` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `FK_b76e4eedb99633c207ab48cdd3e` (`eventId`),
  CONSTRAINT `FK_b76e4eedb99633c207ab48cdd3e` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- Insert initial data into the `event` table
INSERT INTO `event` (`name`, `date`, `ticketsAvailable`) VALUES ('event 1', '2025-03-25 00:00:00', 100);
INSERT INTO `event` (`name`, `date`, `ticketsAvailable`) VALUES ('event 2', '2025-03-25 00:00:00', 75);
INSERT INTO `event` (`name`, `date`, `ticketsAvailable`) VALUES ('event 3', '2025-03-25 00:00:00', 20);
INSERT INTO `event` (`name`, `date`, `ticketsAvailable`) VALUES ('event 3', '2025-03-25 00:00:00', 20);
INSERT INTO `event` (`name`, `date`, `ticketsAvailable`) VALUES ('event test 1', '2025-04-25 00:00:00', 1);
INSERT INTO `event` (`name`, `date`, `ticketsAvailable`) VALUES ('event test 2', '2025-03-25 00:00:00', 1);