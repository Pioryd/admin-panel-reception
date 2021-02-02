import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  Unique,
  PrimaryGeneratedColumn,
  OneToMany
} from "typeorm";

import { Appointment } from "./appointment";

@Entity()
@Unique(["name"])
@ObjectType()
export class Customer extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number | null = null;

  @Field(() => String)
  @Column()
  name: string = "";

  @Field(() => String)
  @Column()
  email: string = "";

  @Field(() => String)
  @Column()
  phone: string = "";

  @Field(() => String)
  @Column()
  created: Date = new Date();

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, (appointment) => appointment.customer)
  appointments!: Appointment[];
}
