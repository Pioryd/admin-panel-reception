import { FindManyOptions } from "typeorm/find-options/FindManyOptions";

import * as Models from "../models";

export async function get(data?: {
  id?: number;
  name?: string;
  limit?: number;
}): Promise<Models.Company[]> {
  const SEARCH_LIMIT = Number(process.env.SEARCH_LIMIT);

  const findOptions: FindManyOptions<Models.Company> = {};
  findOptions.where = {};
  findOptions.take = SEARCH_LIMIT;

  if (data != null) {
    if (data.id != null) {
      findOptions.where.id = data.id;
    }
    if (data.name != null) {
      findOptions.where.name = data.name;
    }
    if (data.limit != null) {
      findOptions.take = Math.max(Math.min(SEARCH_LIMIT, data.limit), 1);
    }
  }

  return await Models.Company.find(findOptions);
}

export async function create(data: { name: string }): Promise<Models.Company> {
  const company = Models.Company.create({ name: data.name });
  await company.save();

  return company;
}

export async function remove(data: { id: number }) {
  await Models.Company.delete({ id: data.id });
}

export async function update(data: { id: number; name: string }) {
  await Models.Company.update({ id: data.id }, { name: data.name });
}
