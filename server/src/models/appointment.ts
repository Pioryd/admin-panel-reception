import { Field, ObjectType, Int, ID } from "type-graphql";
import {
  BaseEntity,
  Entity,
  JoinColumn,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne
} from "typeorm";

import { Company } from "./company";
import { Customer } from "./customer";

@Entity()
@ObjectType()
export class Appointment extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn()
  id: number | null = null;

  @Field(() => String)
  @Column()
  date: Date = new Date();

  @Field(() => Int)
  @Column()
  hour: number = 0;

  @Field(() => Company)
  @ManyToOne(() => Company, (company) => company.appointments, {
    primary: true,
    eager: true
  })
  @JoinColumn()
  company: Company;

  @Field(() => Customer)
  @ManyToOne(() => Customer, (customer) => customer.appointments, {
    primary: true,
    eager: true
  })
  @JoinColumn()
  customer: Customer;

  constructor(company: Company, customer: Customer) {
    super();
    this.company = company;
    this.customer = customer;
  }
}
