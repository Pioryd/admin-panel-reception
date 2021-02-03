import React from "react";
import { useMutation, gql } from "@apollo/client";

import { CompanyData } from "./types";

const REMOVE_COMPANY = gql`
  mutation RemoveCompany($id: Int!) {
    removeCompany(id: $id)
  }
`;

export default function useRemoveCompany() {
  // To prevent null state
  const [response, setResponse] = React.useState<CompanyData[]>([]);

  const [fetch, { loading, error, data }] = useMutation(REMOVE_COMPANY);

  React.useEffect(() => {
    if (!loading && data != null) setResponse(data);
  }, [data, loading]);

  return { loading, error, response, data, fetch };
}
