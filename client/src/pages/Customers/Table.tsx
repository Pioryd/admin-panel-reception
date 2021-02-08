import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Table as MuiTable,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button
} from "@material-ui/core";

import { Delete as DeleteIcon } from "@material-ui/icons";

import { CustomerData } from "./graphQL/types";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    tableRow: {
      "&:hover": {
        backgroundColor: theme.palette.grey[100]
      }
    }
  })
);

export default function Table(props: {
  rows: CustomerData[];
  onRemove: (id: string) => void;
}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <MuiTable size="small" aria-label="Customers data">
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell>ID</TableCell>
            <TableCell align="left">Name</TableCell>
            <TableCell align="left">Email</TableCell>
            <TableCell align="left">Phone</TableCell>
            <TableCell align="left">Create date</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow className={classes.tableRow} key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">{row.name}</TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{row.phone}</TableCell>
              <TableCell align="left">
                {new Date(Number(row.created)).toLocaleDateString("en-US")}
              </TableCell>
              <TableCell align="center">
                <Button
                  color="primary"
                  startIcon={<DeleteIcon />}
                  onClick={() => props.onRemove(row.id || "")}
                >
                  Remove
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </MuiTable>
    </TableContainer>
  );
}
