import React from "react";
import { useQuery, gql } from "@apollo/client";

import { CompanyData } from "../../Companies/graphQL/types";

export interface Response {
  items: CompanyData[];
}

export interface Data {
  getCompanies: Response;
}

export interface Vars {
  id?: string;
}

const GET_COMPANY = gql`
  query GetCompany($id: String!) {
    getCompanies(limit: 1, id: $id) {
      items {
        hoursFrom
        hoursTo
      }
    }
  }
`;

export default function useGetCompany() {
  // To prevent null state
  const [response, setResponse] = React.useState<CompanyData>({});

  const { loading, error, data, refetch } = useQuery<Data, Vars>(GET_COMPANY, {
    notifyOnNetworkStatusChange: true
  });

  React.useEffect(() => {
    if (!loading && data != null) setResponse(data.getCompanies.items[0]);
  }, [data, loading]);

  return { response, loading, error, data, refetch };
}
