export interface CompanyData {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  created?: string;
}

export interface CustomerData {
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
  created?: string;
}

export interface AppointmentData {
  id?: string;
  date?: string;
  hour?: number;
  companyId?: string;
  customerId?: string;
}
