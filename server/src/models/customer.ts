import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, ObjectIdColumn, ObjectID } from "typeorm";

@Entity()
@ObjectType()
export class Customer extends BaseEntity {
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

  @Field(() => String)
  @Column()
  created: Date = new Date();
}
