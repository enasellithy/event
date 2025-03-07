## Event 
- backend is nestjs
- front end react native

-in every folder there is a README.md file  show how installation and running 

Every File Have Docker file to deploy 


## Requirements 
- node
- npm 
- Docker if will run through docker

## Docker Deploy Backend 
- cd event_backend
- docker build -t nestjs-app .
- docker run -p 3000:3000 --env-file .env nestjs-app
- docker-compose up --build

## Docker Deploy Frontend 
- cd event_frontend
- docker build -t react-native-app .
- docker run -p 9001:9001 react-native-app


## Installation

- git clone https://github.com/enasellithy/event.git

## Backend 
- event_backend

## Frontend
- event_frontend

## Database 
- mysql
### RUN

```bash
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


## API 
- http://localhost:3000/graphql => POST 

### For Creation 
```
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

### For Get All
query {
  events {
    id
    name
    date
    ticketsAvailable
  }
}


### for get single event 
query {
  event(id: 1) {
        id
        name
        date
        ticketsAvailable
    }
}

