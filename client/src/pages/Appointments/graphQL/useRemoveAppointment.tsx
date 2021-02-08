import React from "react";
import { useMutation, gql } from "@apollo/client";

import { AppointmentData } from "./types";

const REMOVE_APPOINTMENT = gql`
  mutation RemoveAppointment($id: String!) {
    removeAppointment(id: $id)
  }
`;

export default function useRemoveAppointment() {
  // To prevent null state
  const [response, setResponse] = React.useState<AppointmentData[]>([]);

  const [fetch, { loading, error, data }] = useMutation(REMOVE_APPOINTMENT);

  React.useEffect(() => {
    if (!loading && data != null) setResponse(data);
  }, [data, loading]);

  return { loading, error, response, data, fetch };
}
