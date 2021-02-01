import { Query, Resolver, Arg, Mutation, Int } from "type-graphql";

import { AppointmentPaginatedResponse } from "../types/paginated-response";

import * as Models from "../models";
import * as Services from "../services";

@Resolver()
export class AppointmentResolver {
  @Query(() => AppointmentPaginatedResponse)
  async getAppointments(
    @Arg("customerName", () => String, { nullable: true }) customerName: string,
    @Arg("customerId", () => Int, { nullable: true }) customerId: number,
    @Arg("companyName", () => String, { nullable: true }) companyName: string,
    @Arg("companyId", () => Int, { nullable: true }) companyId: number,
    @Arg("date", () => String, { nullable: true }) date: string,
    @Arg("hour", () => Int, { nullable: true }) hour: number,
    @Arg("limit", () => Int, { nullable: true }) limit: number,
    @Arg("page", () => Int, { nullable: true }) page: number
  ): Promise<AppointmentPaginatedResponse> {
    let customers: Models.Customer[] = [];
    if (customerId != null || customerName != null)
      customers = (
        await Services.Customer.get({
          id: customerId,
          name: customerName,
          limit: 1
        })
      ).items;

    let companies: Models.Company[] = [];
    if (companyId != null || companyName != null)
      companies = (
        await Services.Company.get({
          id: companyId,
          name: companyName,
          limit: 1
        })
      ).items;

    return await Services.Appointment.get({
      customer: customers[0],
      company: companies[0],
      date,
      hour,
      limit,
      page
    });
  }

  @Mutation(() => Models.Appointment)
  async createAppointment(
    @Arg("companyId", () => Int) companyId: number,
    @Arg("customerId", () => Int) customerId: number,
    @Arg("date", () => String) date: string,
    @Arg("hour", () => Int) hour: number
  ): Promise<Models.Appointment> {
    return await Services.Appointment.create({
      companyId,
      customerId,
      date,
      hour
    });
  }

  @Mutation(() => Boolean)
  async removeAppointment(@Arg("id", () => Int) id: number) {
    await Services.Appointment.remove({ id });
    return true;
  }

  @Mutation(() => Boolean)
  async updateAppointment(
    @Arg("id", () => Int) id: number,
    @Arg("date", () => String, { nullable: true }) date: string,
    @Arg("hour", () => Int, { nullable: true }) hour: number
  ) {
    await Services.Appointment.update({ id, date, hour });
    return true;
  }
}
