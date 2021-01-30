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
export class Company extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number | null = null;

  @Field(() => String)
  @Column()
  name: string = "";

  @Field(() => [Appointment])
  @OneToMany(() => Appointment, (appointment) => appointment.company)
  appointments!: Appointment[];
}
