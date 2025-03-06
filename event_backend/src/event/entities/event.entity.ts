import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Order } from '../../order/entities/order.entity';
import {Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType() 
@Entity()
export class Event {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column({ default: 'Available' }) 
  status: string;

  @Field()
  @Column()
  date: Date;

  @Field(() => Int)
  @Column()
  ticketsAvailable: number;

  @Field(() => [Order])
  @OneToMany(() => Order, (order) => order.event)
  orders: Order[];
}
