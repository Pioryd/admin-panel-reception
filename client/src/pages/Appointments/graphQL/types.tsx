export interface CompanyData {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  created?: string;
}

export interface CustomerData {
  id?: number;
  name?: string;
  email?: string;
  phone?: string;
  created?: string;
}

export interface AppointmentData {
  id?: number;
  date?: string;
  hour?: number;
  company?: CompanyData;
  customer?: CustomerData;
}
