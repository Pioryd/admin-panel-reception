import { createConnection } from "typeorm";
import * as Modles from "../src/models";

async function generateDemo() {
  const connection = await createConnection();
  await connection.dropDatabase();
  await connection.synchronize();

  const APPOINTMENTS_COUNT = 96;
  const COMPANIES_COUNT = 97;
  const CUSTOMERS_COUNT = 98;

  const customers: { [key: string]: Modles.Customer } = {};
  for (let i = 1; i <= CUSTOMERS_COUNT; i++) {
    const name = "Customer nr " + i;
    customers[name] = new Modles.Customer();
    customers[name].name = name;
    customers[name].appointments = [];
    await customers[name].save();
  }

  const companies: { [key: string]: Modles.Company } = {};
  for (let i = 1; i <= COMPANIES_COUNT; i++) {
    const name = "Company nr " + i;
    companies[name] = new Modles.Company();
    companies[name].name = name;
    companies[name].appointments = [];
    await companies[name].save();
  }

  const getRandomIntInclusive = (min: number, max: number) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
  };

  for (let i = 1; i <= APPOINTMENTS_COUNT; i++) {
    const company =
      companies[
        Object.keys(companies)[getRandomIntInclusive(0, COMPANIES_COUNT - 1)]
      ];
    const customer =
      customers[
        Object.keys(customers)[getRandomIntInclusive(0, CUSTOMERS_COUNT - 1)]
      ];

    const appointment = new Modles.Appointment(company, customer);
    appointment.date = new Date();
    appointment.hour = getRandomIntInclusive(8, 16);
    await appointment.save();
  }

  await connection.close();
  console.log("Demo database generated");
}

generateDemo();
