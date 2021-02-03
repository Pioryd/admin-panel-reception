import React from "react";
import { useQuery, gql } from "@apollo/client";

import { CompanyData } from "./types";

export interface Response {
  items: CompanyData[];
  currentPage: number;
  totalPages: number;
  count: number;
}

export interface Data {
  getCompanies: Response;
}

export interface Vars {
  id?: number;
  name?: string;
  limit?: number;
  page?: number;
}

const GET_COMPANIES = gql`
  query GetCompanies($page: Int! = 1) {
    getCompanies(page: $page) {
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

export default function useGetCompanies() {
  // To prevent null state
  const [response, setResponse] = React.useState<Response>({
    items: new Array<CompanyData>(),
    currentPage: 1,
    totalPages: 1,
    count: 1
  });

  const { loading, error, data, refetch } = useQuery<Data, Vars>(
    GET_COMPANIES,
    {
      notifyOnNetworkStatusChange: true
    }
  );

  React.useEffect(() => {
    if (!loading && data != null) setResponse(data.getCompanies);
  }, [data, loading]);

  return { response, loading, error, data, refetch };
}
