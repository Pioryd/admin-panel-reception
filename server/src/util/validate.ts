const validator = require("validator");

export function customer(data: { name: string; email: string; phone: string }) {
  const { name, email, phone } = data;

  if (name.length === 0) {
    throw new Error("Name is empty.");
  }
  if (name.length > 40) {
    throw new Error("Name is too long.");
  }
  if (email == null || !validator.isEmail(email)) {
    throw new Error("Wrong email.");
  }
  if (!validator.isMobilePhone(phone, "any")) {
    throw new Error("Phone number is wrong.");
  }
}

export function company(data: {
  name: string;
  email: string;
  phone: string;
  hoursFrom: number;
  hoursTo: number;
}) {
  const { name, email, phone, hoursFrom, hoursTo } = data;

  if (name.length === 0) {
    throw new Error("Name is empty.");
  }
  if (name.length > 40) {
    throw new Error("Name is too long.");
  }
  if (email == null || !validator.isEmail(email)) {
    throw new Error("Wrong email.");
  }
  if (!validator.isMobilePhone(phone, "any")) {
    throw new Error("Phone number is wrong.");
  }
  if (hoursFrom < 1 || hoursFrom > 24) {
    throw new Error("HoursFrom are not in range [1-24],");
  }
  if (hoursFrom < 1 || hoursFrom > 24) {
    throw new Error("Hours from are not in range [1-24],");
  }
  if (hoursTo < 1 || hoursTo > 24) {
    throw new Error("Hours to are not in range [1-24],");
  }
}

export function appointment(data: { hour: number; date: string }) {
  const { hour, date } = data;

  if (hour < 1 || hour > 24) {
    throw new Error("Hour is not in range [1-24],");
  }

  if (
    !validator.isDate(date, { format: "D/M/YYYY" }) &&
    !validator.isDate(date, { format: "DD/MM/YYYY" }) &&
    !validator.isDate(date, { format: "D/MM/YYYY" }) &&
    !validator.isDate(date, { format: "DD/M/YYYY" })
  ) {
    throw new Error("Date is wrong.");
  }
}
