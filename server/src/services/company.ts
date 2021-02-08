import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { getManager } from "typeorm";
import { ObjectId } from "mongodb";

import * as Validate from "../util/validate";

import { CompanyPaginatedResponse } from "../types/paginated-response";

import * as Models from "../models";

export async function get(data?: {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  hoursFrom?: number;
  hoursTo?: number;
  created?: string;
  limit?: number;
  page?: number;
}): Promise<CompanyPaginatedResponse> {
  const SEARCH_LIMIT = Number(process.env.SEARCH_LIMIT);

  const totalItems = await Models.Company.count();

  const totalPages = Math.max(Math.ceil(totalItems / SEARCH_LIMIT), 1);

  let page = 1;
  let limit = SEARCH_LIMIT;

  const findOptions: FindManyOptions<Models.Company | any> = {};
  findOptions.where = {};
  findOptions.take = SEARCH_LIMIT;
  findOptions.order = { created: "ASC" };

  if (data != null) {
    if (data.id != null) findOptions.where._id = new ObjectId(data.id);
    if (data.name != null) findOptions.where.name = data.name;
    if (data.email != null) findOptions.where.email = data.email;
    if (data.phone != null) findOptions.where.phone = data.phone;
    if (data.hoursFrom != null) findOptions.where.hoursFrom = data.hoursFrom;
    if (data.hoursTo != null) findOptions.where.hoursTo = data.hoursTo;
    if (data.created != null) findOptions.where.created = data.created;
    if (data.limit != null) limit = data.limit;
    if (data.page != null) page = data.page;
  }

  limit = Math.max(Math.min(limit, SEARCH_LIMIT), 1);
  page = Math.max(Math.min(page, totalPages), 1);

  findOptions.skip = (page - 1) * SEARCH_LIMIT;
  findOptions.take = limit;

  return Object.assign(new CompanyPaginatedResponse(), {
    items: await Models.Company.find(findOptions),
    currentPage: page,
    totalPages,
    count: totalItems
  });
}

export async function create(data: {
  name: string;
  email: string;
  phone: string;
  hoursFrom: number;
  hoursTo: number;
}): Promise<Models.Company> {
  Validate.company(data);

  const company = Models.Company.create({ ...data, created: new Date() });
  await company.save();

  return company;
}

export async function remove(data: { id: string }) {
  await Models.Appointment.delete({ companyId: data.id });
  await Models.Company.delete({ id: new ObjectId(data.id) });
}

export async function update(data: {
  id: string;
  name?: string;
  email?: string;
  phone?: string;
  hoursFrom: number;
  hoursTo: number;
}) {
  const partialEntity: QueryDeepPartialEntity<Models.Company> = {};
  if (data != null) {
    if (data.name != null) partialEntity.name = data.name;
    if (data.email != null) partialEntity.email = data.email;
    if (data.phone != null) partialEntity.phone = data.phone;
    if (data.hoursFrom != null) partialEntity.hoursFrom = data.hoursFrom;
    if (data.hoursTo != null) partialEntity.hoursTo = data.hoursTo;
  }

  await Models.Company.update({ id: data.id }, partialEntity);
}
