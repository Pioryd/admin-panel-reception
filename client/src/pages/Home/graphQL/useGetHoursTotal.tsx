import React from "react";
import { useQuery, gql } from "@apollo/client";

export interface Data {
  getHoursTotal: [number];
}

const GET_HOURS_TOTAL = gql`
  query GetHoursTotal {
    getHoursTotal
  }
`;

export default function useGetHoursTotal() {
  // To prevent null state
  const [response, setResponse] = React.useState<number[]>([]);

  const { loading, error, data, refetch } = useQuery<Data>(GET_HOURS_TOTAL, {
    notifyOnNetworkStatusChange: true
  });

  React.useEffect(() => {
    if (!loading && data != null) setResponse(data.getHoursTotal);
  }, [data, loading]);

  return { response, loading, error, data, refetch };
}
