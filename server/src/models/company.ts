import { Field, ID, Int, ObjectType } from "type-graphql";
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
export class Company extends BaseEntity {
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

  @Field(() => Int)
  @Column()
  hoursFrom: number = 1;

  @Field(() => Int)
  @Column()
  hoursTo: number = 1;

  @Field(() => String)
  @Column()
  created: Date = new Date();

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, (appointment) => appointment.company)
  appointments!: Appointment[];
}
