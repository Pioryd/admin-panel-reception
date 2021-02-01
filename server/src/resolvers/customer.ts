import { Query, Resolver, Arg, Mutation, Int } from "type-graphql";

import { CustomerPaginatedResponse } from "../types/paginated-response";

import * as Models from "../models";
import * as Services from "../services";

@Resolver()
export class CustomerResolver {
  @Query(() => CustomerPaginatedResponse)
  async getCustomers(
    @Arg("id", () => Int, { nullable: true }) id: number,
    @Arg("name", () => String, { nullable: true }) name: string,
    @Arg("limit", () => Int, { nullable: true }) limit: number,
    @Arg("page", () => Int, { nullable: true }) page: number
  ): Promise<CustomerPaginatedResponse> {
    return await Services.Customer.get({ id, name, limit, page });
  }

  @Mutation(() => Models.Customer)
  async createCustomer(
    @Arg("name", () => String) name: string
  ): Promise<Models.Customer> {
    return await Services.Customer.create({ name });
  }

  @Mutation(() => Boolean)
  async removeCustomer(@Arg("id", () => Int) id: number) {
    await Services.Customer.remove({ id });
    return true;
  }

  @Mutation(() => Boolean)
  async updateCustomer(
    @Arg("id", () => Int) id: number,
    @Arg("name", () => String) name: string
  ) {
    await Services.Customer.update({ id, name });
    return true;
  }
}
