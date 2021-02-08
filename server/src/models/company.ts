import { Field, Int, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn, ObjectID } from "typeorm";

@Entity()
@ObjectType()
export class Company extends BaseEntity {
  @Field(() => String)
  @ObjectIdColumn()
  id: ObjectID | undefined;

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
}
