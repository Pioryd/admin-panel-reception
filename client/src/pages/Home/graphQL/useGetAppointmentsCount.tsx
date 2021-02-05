import React from "react";
import { useQuery, gql } from "@apollo/client";

export interface Data {
  getAppointments: { count: number };
}

const GET_APPOINTMENTS_COUNT = gql`
  query GetAppointmentsCount {
    getAppointments(limit: 1) {
      count
    }
  }
`;

export default function useGetAppointmentsCount() {
  // To prevent null state
  const [response, setResponse] = React.useState<number>(0);

  const { loading, error, data, refetch } = useQuery<Data>(
    GET_APPOINTMENTS_COUNT,
    {
      notifyOnNetworkStatusChange: true
    }
  );

  React.useEffect(() => {
    if (!loading && data != null) setResponse(data.getAppointments.count);
  }, [data, loading]);

  return { response, loading, error, data, refetch };
}
