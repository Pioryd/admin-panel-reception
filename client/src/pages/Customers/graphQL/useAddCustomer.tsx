import React from "react";
import { useMutation, gql } from "@apollo/client";

import { CustomerData } from "./types";

const ADD_CUSTOMER = gql`
  mutation AddCustomer($name: String!, $email: String!, $phone: String!) {
    createCustomer(name: $name, email: $email, phone: $phone) {
      id
    }
  }
`;

export default function useAddCustomer() {
  // To prevent null state
  const [response, setResponse] = React.useState<CustomerData[]>([]);

  const [fetch, { loading, error, data }] = useMutation(ADD_CUSTOMER);

  React.useEffect(() => {
    if (loading && data != null) setResponse(data.createCustomer);
  }, [data, loading]);

  return { loading, error, response, data, fetch };
}
