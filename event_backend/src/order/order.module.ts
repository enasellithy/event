import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderService } from './order.service';
import { OrderResolver } from './order.resolver';
import { Order } from './entities/order.entity';
import { EventModule } from '../event/event.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order]),
    EventModule,
  ],
  providers: [OrderService, OrderResolver],
  exports: [OrderService],
})
export class OrderModule {}
