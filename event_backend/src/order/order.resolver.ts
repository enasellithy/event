import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Order } from './entities/order.entity';
import { OrderService } from './order.service';

@Resolver(() => Order)
export class OrderResolver {
  constructor(private orderService: OrderService) {}

  @Mutation(() => Order)
  async purchaseTickets(
    @Args('orderNumber') orderNumber: string,
    @Args('eventId') eventId: number,
    @Args('ticketsPurchased') ticketsPurchased: number,
  ): Promise<Order> {
    return this.orderService.create(orderNumber, eventId, ticketsPurchased);
  }
}