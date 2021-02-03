import React from "react";
import { useMutation, gql } from "@apollo/client";

import { CustomerData } from "./types";

const REMOVE_CUSTOMER = gql`
  mutation RemoveCustomer($id: Int!) {
    removeCustomer(id: $id)
  }
`;

export default function useRemoveCustomer() {
  // To prevent null state
  const [response, setResponse] = React.useState<CustomerData[]>([]);

  const [fetch, { loading, error, data }] = useMutation(REMOVE_CUSTOMER);

  React.useEffect(() => {
    if (!loading && data != null) setResponse(data);
  }, [data, loading]);

  return { loading, error, response, data, fetch };
}
