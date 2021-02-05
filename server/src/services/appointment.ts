import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";

import { AppointmentPaginatedResponse } from "../types/paginated-response";

import * as Models from "../models";

export async function get(data?: {
  customer?: Models.Customer;
  company?: Models.Company;
  date?: string;
  hour?: number;
  limit?: number;
  page?: number;
}): Promise<AppointmentPaginatedResponse> {
  const SEARCH_LIMIT = Number(process.env.SEARCH_LIMIT);

  const totalItems = await Models.Appointment.count();
  const totalPages = Math.max(Math.ceil(totalItems / SEARCH_LIMIT), 1);

  let page = 1;
  let limit = SEARCH_LIMIT;

  const findOptions: FindManyOptions<Models.Appointment> = {};
  findOptions.where = {};
  findOptions.take = SEARCH_LIMIT;
  findOptions.order = { id: "ASC" };

  if (data != null) {
    if (data.customer != null) findOptions.where.customer = data.customer;
    if (data.company != null) findOptions.where.company = data.company;
    if (data.date != null) findOptions.where.date = data.date;
    if (data.hour != null) findOptions.where.hour = data.hour;
    if (data.limit != null) limit = data.limit;
    if (data.page != null) page = data.page;
  }

  limit = Math.max(Math.min(limit, SEARCH_LIMIT), 1);
  page = Math.max(Math.min(page, totalPages), 1);

  findOptions.skip = (page - 1) * SEARCH_LIMIT;
  findOptions.take = limit;

  return Object.assign(new AppointmentPaginatedResponse(), {
    items: await Models.Appointment.find(findOptions),
    currentPage: page,
    totalPages,
    count: totalItems
  });
}

export async function create(data: {
  companyId: number;
  customerId: number;
  date: string;
  hour: number;
}): Promise<Models.Appointment> {
  const company = await Models.Company.findOne({
    where: { id: data.companyId }
  });
  const customer = await Models.Customer.findOne({
    where: { id: data.customerId }
  });

  const appointment = await Models.Appointment.create({
    company,
    customer,
    date: new Date(data.date),
    hour: data.hour
  });
  await appointment.save();
  return appointment;
}

export async function remove(data: { id: number }) {
  await Models.Appointment.delete({ id: data.id });
}

export async function update(data: {
  id: number;
  date?: string;
  hour?: number;
}) {
  const query: QueryDeepPartialEntity<Models.Appointment> = {};
  if (data != null) {
    if (data.date != null) query.date = data.date;
    if (data.hour != null) query.hour = data.hour;
  }

  await Models.Appointment.update({ id: data.id }, query);
  return true;
}

export async function getHoursTotal() {
  const hours: number[] = [];
  for (let i = 0; i < 24; i++)
    hours[i] = await Models.Appointment.count({ where: { hour: i + 1 } });

  return hours;
}
