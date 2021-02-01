import { Int, ObjectType, Field, ClassType } from "type-graphql";

import * as Models from "../models";

function PaginatedResponse<T>(T_Class: ClassType<T>) {
  @ObjectType(`${T_Class.name}PaginatedResponse`)
  class PaginatedResponseClass {
    @Field(() => [T_Class])
    items: T[] = [];
    @Field(() => Int)
    currentPage: number = 1;
    @Field(() => Int)
    totalPages: number = 1;
    @Field(() => Int)
    count: number = 1;
  }

  return PaginatedResponseClass;
}

export const CompanyPaginatedResponse = PaginatedResponse(Models.Company);
export type CompanyPaginatedResponse = InstanceType<
  typeof CompanyPaginatedResponse
>;

export const CustomerPaginatedResponse = PaginatedResponse(Models.Customer);
export type CustomerPaginatedResponse = InstanceType<
  typeof CustomerPaginatedResponse
>;

export const AppointmentPaginatedResponse = PaginatedResponse(
  Models.Appointment
);
export type AppointmentPaginatedResponse = InstanceType<
  typeof AppointmentPaginatedResponse
>;
