import React from "react";
import { useMutation, gql } from "@apollo/client";

import { AppointmentData } from "./types";

const ADD_APPOINTMENT = gql`
  mutation AddAppointment(
    $customerId: Int!
    $companyId: Int!
    $date: String!
    $hour: Int!
  ) {
    createAppointment(
      customerId: $customerId
      companyId: $companyId
      date: $date
      hour: $hour
    ) {
      id
    }
  }
`;

export default function useAddAppointment() {
  // To prevent null state
  const [response, setResponse] = React.useState<AppointmentData[]>([]);

  const [fetch, { loading, error, data }] = useMutation(ADD_APPOINTMENT);

  React.useEffect(() => {
    if (loading && data != null) setResponse(data.createAppointment);
  }, [data, loading]);

  return { loading, error, response, data, fetch };
}
