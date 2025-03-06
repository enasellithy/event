import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class EventService {

  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<Event>,
  )
  {}


  findAll(): Promise<Event[]> {
    return this.eventRepository.find();
  }

  async findOne(id: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new Error(`Event with ID ${id} not found`);
    }
    return event;
  }

  async updateTicketsAvailable(id: number, ticketsPurchased: number): Promise<Event> {
    const event = await this.eventRepository.findOne({ where: { id } });
    if (!event) {
      throw new Error(`Event with ID ${id} not found`);
    }

    //check is event Sold Out
    if(event.status === "Sold Out"){
      throw new Error(`Event is Sold Out`);
    }

    // check is ticketsPurchased valid
    else if(event.ticketsAvailable < ticketsPurchased) {
      throw new Error(`Not enough tickets available`);
    }
  
    event.ticketsAvailable -= ticketsPurchased;

    if(event.ticketsAvailable === 0){
      event.status = 'Sold Out';
    }

    return this.eventRepository.save(event);
  }


}
