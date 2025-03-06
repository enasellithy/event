##Installation

- node
- npm 

## cd event_backend
## npm install
## cp env .env 

- change  your database connection in .env
./src/app.module.ts
```bash
host: process.env.DB_HOST,
      port: 3306,
      username: 'root',
      password: process.env.DB_PASSWORD,
      database: 'event_ticketing',
```

## npm run build
## npm run start

#database 

CREATE TABLE `event` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `name` varchar(255) NOT NULL,
 `date` datetime NOT NULL,
 `ticketsAvailable` int(11) NOT NULL,
 `status` ENUM('Available','Sold Out') NOT NULL DEFAULT 'Available'
 PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci

CREATE TABLE `order` (
 `id` int(11) NOT NULL AUTO_INCREMENT,
 `orderNumber` varchar(255) NOT NULL,
 `ticketsPurchased` int(11) NOT NULL,
 `eventId` int(11) DEFAULT NULL,
 PRIMARY KEY (`id`),
 KEY `FK_b76e4eedb99633c207ab48cdd3e` (`eventId`),
 CONSTRAINT `FK_b76e4eedb99633c207ab48cdd3e` FOREIGN KEY (`eventId`) REFERENCES `event` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci


INSERT INTO `event`( `name`, `date`, `ticketsAvailable`) VALUES ('event 1','2025-3-25',100);
INSERT INTO `event`( `name`, `date`, `ticketsAvailable`) VALUES ('event 2','2025-3-25',75);
INSERT INTO `event`( `name`, `date`, `ticketsAvailable`) VALUES ('event 3','2025-3-25',20);


## GETWAY
# http://localhost:3000/graphql => POST 

### For Creation 
 

 - to create order purchaseTickets
 mutation {
  purchaseTickets(orderNumber: "ORDER123", eventId: 1, ticketsPurchased: 2) {
    id
    orderNumber
    ticketsPurchased
    event {
      id
      name
      ticketsAvailable
    }
  }
}


for get All events 

query {
  events {
    id
    name
    date
    ticketsAvailable
  }
}

for get single event 
query {
  event(id: 1) {
        id
        name
        date
        ticketsAvailable
    }
}