import React from "react";
import { useMutation, gql } from "@apollo/client";

import { CompanyData } from "./types";

const ADD_COMPANY = gql`
  mutation AddCompany(
    $name: String!
    $email: String!
    $phone: String!
    $hoursFrom: Int!
    $hoursTo: Int!
  ) {
    createCompany(
      name: $name
      email: $email
      phone: $phone
      hoursFrom: $hoursFrom
      hoursTo: $hoursTo
    ) {
      id
    }
  }
`;

export default function useAddCompany() {
  // To prevent null state
  const [response, setResponse] = React.useState<CompanyData[]>([]);

  const [fetch, { loading, error, data }] = useMutation(ADD_COMPANY);

  React.useEffect(() => {
    if (loading && data != null) setResponse(data.createCompany);
  }, [data, loading]);

  return { loading, error, response, data, fetch };
}
