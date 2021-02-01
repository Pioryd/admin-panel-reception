import { FindManyOptions } from "typeorm/find-options/FindManyOptions";

import { CustomerPaginatedResponse } from "../types/paginated-response";

import * as Models from "../models";

export async function get(data?: {
  id?: number;
  name?: string;
  limit?: number;
  page?: number;
}): Promise<CustomerPaginatedResponse> {
  const SEARCH_LIMIT = Number(process.env.SEARCH_LIMIT);

  const totalItems = await Models.Customer.createQueryBuilder("log_entry")
    .select("DISTINCT(`sender_id`)")
    .getCount();
  const totalPages = Math.max(Math.ceil(totalItems / SEARCH_LIMIT), 1);

  let page = 1;
  let limit = SEARCH_LIMIT;

  const findOptions: FindManyOptions<Models.Customer> = {};
  findOptions.where = {};
  findOptions.take = SEARCH_LIMIT;

  if (data != null) {
    if (data.id != null) findOptions.where.id = data.id;
    if (data.name != null) findOptions.where.name = data.name;
    if (data.limit != null) limit = data.limit;
    if (data.page != null) page = data.page;
  }

  limit = Math.max(Math.min(limit, SEARCH_LIMIT), 1);
  page = Math.max(Math.min(page, totalPages), 1);

  findOptions.skip = (page - 1) * SEARCH_LIMIT;
  findOptions.take = limit;
  limit = Math.max(Math.min(SEARCH_LIMIT, limit), 1);

  return Object.assign(new CustomerPaginatedResponse(), {
    items: await Models.Company.find(findOptions),
    currentPage: page,
    totalPages,
    count: totalItems
  });
}

export async function create(data: { name: string }): Promise<Models.Customer> {
  const customer = Models.Customer.create({ name: data.name });
  await customer.save();

  return customer;
}

export async function remove(data: { id: number }) {
  await Models.Customer.delete({ id: data.id });
}

export async function update(data: { id: number; name: string }) {
  await Models.Customer.update({ id: data.id }, { name: data.name });
}
