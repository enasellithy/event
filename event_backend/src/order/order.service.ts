import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { EventService } from '../event/event.service';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private orderRepository: Repository<Order>,
    private eventService: EventService,
  ) {}

  async create(orderNumber: string, eventId: number, ticketsPurchased: number): Promise<Order> {
    const event = await this.eventService.findOne(eventId);
    if (event.ticketsAvailable < ticketsPurchased) {
      throw new Error('Not enough tickets available');
    }

    const order = this.orderRepository.create({
      orderNumber,
      ticketsPurchased,
      event,
    });

    await this.eventService.updateTicketsAvailable(eventId, ticketsPurchased);
    return this.orderRepository.save(order);
  }
}