import React from "react";
import { useQuery, gql } from "@apollo/client";

export interface Data {
  getCustomers: { count: number };
}

const GET_CUSTOMERS_COUNT = gql`
  query GetCustomersCount {
    getCustomers(limit: 1) {
      count
    }
  }
`;

export default function useGetCustomersCount() {
  // To prevent null state
  const [response, setResponse] = React.useState<number>(0);

  const { loading, error, data, refetch } = useQuery<Data>(
    GET_CUSTOMERS_COUNT,
    {
      notifyOnNetworkStatusChange: true
    }
  );

  React.useEffect(() => {
    if (!loading && data != null) setResponse(data.getCustomers.count);
  }, [data, loading]);

  return { response, loading, error, data, refetch };
}
