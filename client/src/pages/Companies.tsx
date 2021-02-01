import React from "react";
import { useQuery, gql } from "@apollo/client";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  CircularProgress
} from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Add as AddIcon, Delete as DeleteIcon } from "@material-ui/icons";

interface CompanyData {
  id?: number;
  name?: string;
}

interface Response {
  items: CompanyData[];
  currentPage: number;
  totalPages: number;
  count: number;
}

interface Data {
  getCompanies: Response;
}

interface Vars {
  id?: number;
  name?: string;
  limit?: number;
  page?: number;
}

const GET_COMPANIES = gql`
  query GetCompanies($page: Int!) {
    getCompanies(page: $page) {
      items {
        id
        name
      }
      currentPage
      totalPages
      count
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pagination: {
      display: "flex",
      justifyContent: "center",
      marginTop: "10px"
    },
    addButton: {
      marginBottom: "30px",
      float: "right"
    },
    tableRow: {
      "&:hover": {
        backgroundColor: theme.palette.grey[100]
      }
    },
    loadingIcon: {
      position: "absolute",
      top: "50%",
      left: "50%"
    }
  })
);

export default function Companies() {
  const classes = useStyles();

  const [page, setPage] = React.useState(0);
  const [response, setResponse] = React.useState<Response>({
    items: new Array<CompanyData>(),
    currentPage: 1,
    totalPages: 1,
    count: 1
  });

  const { loading, error, data } = useQuery<Data, Vars>(GET_COMPANIES, {
    variables: { page }
  });

  React.useEffect(() => {
    if (loading || data == null) return;
    // to prevent clear table on change page
    setResponse(data.getCompanies);
  }, [data]);

  if (error)
    return (
      <>
        <Typography align="center" variant="h4">
          Error
        </Typography>
        <Typography align="center" variant="h5">
          Unable to load data
        </Typography>
      </>
    );

  return (
    <>
      {loading && <CircularProgress className={classes.loadingIcon} />}

      <Button
        variant="contained"
        color="primary"
        size="medium"
        className={classes.addButton}
        startIcon={<AddIcon />}
      >
        Add
      </Button>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="companies data">
          <TableHead>
            <TableRow className={classes.tableRow}>
              <TableCell>ID</TableCell>
              <TableCell align="center">Name</TableCell>
              <TableCell align="right">Appointments</TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {response.items.map((row) => (
              <TableRow className={classes.tableRow} key={row.id}>
                <TableCell component="th" scope="row">
                  {row.name}
                </TableCell>
                <TableCell align="right">{row.name}</TableCell>
                <TableCell align="right">{0}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<DeleteIcon />}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination
        className={classes.pagination}
        count={response.totalPages}
        page={response.currentPage}
        siblingCount={0}
        boundaryCount={1}
        onChange={(event, page) => setPage(page)}
      />
    </>
  );
}
