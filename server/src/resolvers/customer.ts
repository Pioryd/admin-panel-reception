import { Query, Resolver, Arg, Mutation, Int } from "type-graphql";

import { CustomerPaginatedResponse } from "../types/paginated-response";

import * as Models from "../models";
import * as Services from "../services";

@Resolver()
export class CustomerResolver {
  @Query(() => CustomerPaginatedResponse)
  async getCustomers(
    @Arg("id", () => String, { nullable: true }) id: string,
    @Arg("name", () => String, { nullable: true }) name: string,
    @Arg("email", () => String, { nullable: true }) email: string,
    @Arg("phone", () => String, { nullable: true }) phone: string,
    @Arg("created", () => String, { nullable: true }) created: string,
    @Arg("limit", () => Int, { nullable: true }) limit: number,
    @Arg("page", () => Int, { nullable: true }) page: number
  ): Promise<CustomerPaginatedResponse> {
    return await Services.Customer.get({
      id,
      name,
      email,
      phone,
      created,
      limit,
      page
    });
  }

  @Mutation(() => Models.Customer)
  async createCustomer(
    @Arg("name", () => String) name: string,
    @Arg("email", () => String) email: string,
    @Arg("phone", () => String) phone: string
  ): Promise<Models.Customer> {
    return await Services.Customer.create({ name, email, phone });
  }

  @Mutation(() => Boolean)
  async removeCustomer(@Arg("id", () => String) id: string) {
    await Services.Customer.remove({ id });
    return true;
  }

  @Mutation(() => Boolean)
  async updateCustomer(
    @Arg("id", () => String) id: string,
    @Arg("name", () => String) name: string,
    @Arg("email", () => String) email: string,
    @Arg("phone", () => String) phone: string
  ) {
    await Services.Customer.update({ id, name, email, phone });
    return true;
  }
}
