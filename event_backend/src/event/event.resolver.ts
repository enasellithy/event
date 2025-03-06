import { Resolver, Query, Args } from '@nestjs/graphql';
import { EventService } from './event.service';
import { Event } from './entities/event.entity';

@Resolver(() => Event)
export class EventResolver {
  constructor(private eventService: EventService) {}

  @Query(() => [Event])
  async events(): Promise<Event[]> {
    return this.eventService.findAll();
  }

  @Query(() => Event)
  async event(@Args('id') id: number): Promise<Event>  {
    return this.eventService.findOne(id);
  }
}
