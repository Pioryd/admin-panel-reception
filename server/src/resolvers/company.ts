import { Query, Resolver, Arg, Mutation, Int } from "type-graphql";

import { CompanyPaginatedResponse } from "../types/paginated-response";

import * as Models from "../models";
import * as Services from "../services";

@Resolver()
export class CompanyResolver {
  @Query(() => CompanyPaginatedResponse)
  async getCompanies(
    @Arg("id", () => Int, { nullable: true }) id: number,
    @Arg("name", () => String, { nullable: true }) name: string,
    @Arg("limit", () => Int, { nullable: true }) limit: number,
    @Arg("page", () => Int, { nullable: true }) page: number
  ): Promise<CompanyPaginatedResponse> {
    return await Services.Company.get({ id, name, limit, page });
  }

  @Mutation(() => Models.Company)
  async createCompany(
    @Arg("name", () => String) name: string
  ): Promise<Models.Company> {
    return await Services.Company.create({ name });
  }

  @Mutation(() => Boolean)
  async removeCompany(@Arg("id", () => Int) id: number) {
    await Services.Company.remove({ id });
    return true;
  }

  @Mutation(() => Boolean)
  async updateCompany(
    @Arg("id", () => Int) id: number,
    @Arg("name", () => String) name: string
  ) {
    await Services.Company.update({ id, name });
    return true;
  }
}
