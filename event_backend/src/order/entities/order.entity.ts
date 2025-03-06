import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Event } from "../../event/entities/event.entity";

@ObjectType()
@Entity()
export class Order {
    @Field(() => Int)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    orderNumber: string;

    @Field(() => Int)
    @Column()
    ticketsPurchased: number;

    @Field(() => Event)
    @ManyToOne(() => Event, (event) => event.orders)
    event: Event;
}