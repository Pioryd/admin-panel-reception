import { createConnection } from "typeorm";
import * as Models from "../src/models";

const config = {
  customersCount: 256,
  companiesCount: 96,
  appointmentsPerCustomerMin: 5,
  appointmentsPerCustomerMax: 16,

  emailLengthMin: 7,
  emailLengthMax: 20,

  phoneLength: 9
};

function getRandomIntInclusive(min: number, max: number) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function randomEmail() {
  const chars = "abcdefghijklmnopqrstuvwxyz1234567890";
  let email = "";

  const length = getRandomIntInclusive(
    config.emailLengthMin,
    config.emailLengthMax
  );
  for (let i = 0; i < length; i++)
    email += chars[getRandomIntInclusive(0, chars.length - 1)];
  email += "@email.com";

  return email;
}

function randomPhone() {
  let phone = "";
  for (let i = 1; i <= config.phoneLength; i++) {
    if (i === 1) phone += getRandomIntInclusive(5, 7).toString();
    else phone += getRandomIntInclusive(1, 9).toString();

    if (i % 3 === 0 && i < config.phoneLength) phone += "-";
  }
  return phone;
}

async function generateDemo() {
  const connection = await createConnection();
  await connection.dropDatabase();
  await connection.synchronize();

  const customers: { [key: string]: Models.Customer } = {};
  for (let i = 1; i <= config.customersCount; i++) {
    const name = "Customer nr " + i;
    customers[name] = new Models.Customer();
    customers[name].name = name;
    customers[name].email = randomEmail();
    customers[name].phone = randomPhone();
    customers[name].created = new Date();
    customers[name].appointments = [];
    await customers[name].save();
  }

  const companies: { [key: string]: Models.Company } = {};
  for (let i = 1; i <= config.companiesCount; i++) {
    const name = "Company nr " + i;
    companies[name] = new Models.Company();
    companies[name].name = name;
    companies[name].email = randomEmail();
    companies[name].phone = randomPhone();
    companies[name].hoursFrom = getRandomIntInclusive(1, 12);
    companies[name].hoursTo = getRandomIntInclusive(13, 24);
    companies[name].created = new Date();
    companies[name].appointments = [];
    await companies[name].save();
  }

  for (const customer of Object.values(customers)) {
    const appointmentsCount = getRandomIntInclusive(
      config.appointmentsPerCustomerMin,
      config.appointmentsPerCustomerMin
    );

    for (let i = 1; i <= appointmentsCount; i++) {
      const company =
        companies[
          Object.keys(companies)[
            getRandomIntInclusive(0, config.companiesCount - 1)
          ]
        ];

      const appointment = new Models.Appointment(company, customer);
      appointment.date = new Date();
      appointment.hour = getRandomIntInclusive(
        company.hoursFrom,
        company.hoursTo
      );
      await appointment.save();
    }
  }

  await connection.close();
  console.log("Demo database generated");
}

generateDemo();
