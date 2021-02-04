import React from "react";
import { useQuery, gql } from "@apollo/client";

import { AppointmentData } from "./types";

export interface Response {
  items: AppointmentData[];
  currentPage: number;
  totalPages: number;
  count: number;
}

export interface Data {
  getAppointments: Response;
}

export interface Vars {
  id?: number;
  name?: string;
  limit?: number;
  page?: number;
}

const GET_APPOINTMENTS = gql`
  query GetAppointments($page: Int! = 1) {
    getAppointments(page: $page) {
      items {
        id
        date
        hour
        company {
          name
        }
        customer {
          name
        }
      }
      currentPage
      totalPages
      count
    }
  }
`;

export default function useGetAppointments() {
  // To prevent null state
  const [response, setResponse] = React.useState<Response>({
    items: new Array<AppointmentData>(),
    currentPage: 1,
    totalPages: 1,
    count: 1
  });

  const { loading, error, data, refetch } = useQuery<Data, Vars>(
    GET_APPOINTMENTS,
    {
      notifyOnNetworkStatusChange: true
    }
  );

  React.useEffect(() => {
    if (!loading && data != null) setResponse(data.getAppointments);
  }, [data, loading]);

  return { response, loading, error, data, refetch };
}
