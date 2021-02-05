import React from "react";
import { useQuery, gql } from "@apollo/client";

export interface Data {
  getCompanies: { count: number };
}

const GET_COMPANIES_COUNT = gql`
  query GetCompaniesCount {
    getCompanies(limit: 1) {
      count
    }
  }
`;

export default function useGetCompaniesCount() {
  // To prevent null state
  const [response, setResponse] = React.useState<number>(0);

  const { loading, error, data, refetch } = useQuery<Data>(
    GET_COMPANIES_COUNT,
    {
      notifyOnNetworkStatusChange: true
    }
  );

  React.useEffect(() => {
    if (!loading && data != null) setResponse(data.getCompanies.count);
  }, [data, loading]);

  return { response, loading, error, data, refetch };
}
