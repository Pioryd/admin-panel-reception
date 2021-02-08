import { QueryDeepPartialEntity } from "typeorm/query-builder/QueryPartialEntity";
import { FindManyOptions } from "typeorm/find-options/FindManyOptions";
import { ObjectId } from "mongodb";

import * as Validate from "../util/validate";

import { AppointmentPaginatedResponse } from "../types/paginated-response";

import * as Models from "../models";

export async function get(data?: {
  customerId?: string;
  companyId?: string;
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
    if (data.customerId != null) findOptions.where.customerId = data.customerId;
    if (data.companyId != null) findOptions.where.companyId = data.companyId;
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
  companyId: string;
  customerId: string;
  date: string;
  hour: number;
}): Promise<Models.Appointment> {
  Validate.appointment(data);

  const company = await Models.Company.findOne({
    where: { _id: new ObjectId(data.companyId) }
  });
  const customer = await Models.Customer.findOne({
    where: { _id: new ObjectId(data.customerId) }
  });

  if (company == null) throw new Error("Company not found.");
  if (customer == null) throw new Error("Customer not found.");

  if (data.hour < company.hoursFrom || data.hour > company.hoursTo)
    throw new Error("Hours is not allowed by company.");

  if (
    !(
      company.hoursFrom < company.hoursTo &&
      data.hour >= company.hoursFrom &&
      data.hour <= company.hoursTo
    ) &&
    !(
      company.hoursFrom > company.hoursTo &&
      (data.hour >= company.hoursFrom || data.hour <= company.hoursTo)
    ) &&
    !(
      company.hoursFrom === company.hoursTo &&
      data.hour === company.hoursFrom &&
      data.hour === company.hoursTo
    )
  ) {
    throw new Error(
      `Hour must be in range [${company.hoursFrom}-${company.hoursTo}]`
    );
  }

  if (company.id == null) throw new Error("Wrong company id.");
  if (customer.id == null) throw new Error("Wrong customer id.");

  const appointment = await Models.Appointment.create({
    companyId: company.id.toHexString(),
    customerId: customer.id.toHexString(),
    date: new Date(data.date),
    hour: data.hour
  });
  await appointment.save();
  return appointment;
}

export async function remove(data: { id: string }) {
  await Models.Appointment.delete({ id: new ObjectId(data.id) });
}

export async function update(data: {
  id: string;
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
    hours[i] = await Models.Appointment.count({ hour: i + 1 });
  return hours;
}
