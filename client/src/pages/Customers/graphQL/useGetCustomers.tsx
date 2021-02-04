import React from "react";
import { useQuery, gql } from "@apollo/client";

import { CustomerData } from "./types";

export interface Response {
  items: CustomerData[];
  currentPage: number;
  totalPages: number;
  count: number;
}

export interface Data {
  getCustomers: Response;
}

export interface Vars {
  id?: number;
  name?: string;
  limit?: number;
  page?: number;
}

const GET_CUSTOMERS = gql`
  query GetCustomers($page: Int! = 1) {
    getCustomers(page: $page) {
      items {
        id
        name
        email
        phone
        created
      }
      currentPage
      totalPages
      count
    }
  }
`;

export default function useGetCustomers() {
  // To prevent null state
  const [response, setResponse] = React.useState<Response>({
    items: new Array<CustomerData>(),
    currentPage: 1,
    totalPages: 1,
    count: 1
  });

  const { loading, error, data, refetch } = useQuery<Data, Vars>(
    GET_CUSTOMERS,
    {
      notifyOnNetworkStatusChange: true
    }
  );

  React.useEffect(() => {
    if (!loading && data != null) setResponse(data.getCustomers);
  }, [data, loading]);

  return { response, loading, error, data, refetch };
}
