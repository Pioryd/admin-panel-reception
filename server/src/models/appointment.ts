import { Field, ObjectType, Int } from "type-graphql";
import { BaseEntity, Entity, Column, ObjectIdColumn, ObjectID } from "typeorm";

@Entity()
@ObjectType()
export class Appointment extends BaseEntity {
  @Field(() => String)
  @ObjectIdColumn()
  id: ObjectID | undefined;

  @Field(() => String)
  @Column()
  date: Date = new Date();

  @Field(() => Int)
  @Column()
  hour: number = 0;

  @Field(() => String)
  @Column()
  companyId: string = "";

  @Field(() => String)
  @Column()
  customerId: string = "";

  constructor(companyId: string, customerId: string) {
    super();
    this.companyId = companyId;
    this.customerId = customerId;
  }
}
