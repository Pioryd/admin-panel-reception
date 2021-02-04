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

import { AppointmentData } from "./graphQL/types";

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
  rows: AppointmentData[];
  onRemove: (id: number) => void;
}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <MuiTable size="small" aria-label="Appointments data">
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell>ID</TableCell>
            <TableCell align="left">Customer</TableCell>
            <TableCell align="left">Company</TableCell>
            <TableCell align="left">Date</TableCell>
            <TableCell align="left">Hour</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {props.rows.map((row) => (
            <TableRow className={classes.tableRow} key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="left">
                {row.customer && row.customer.name}
              </TableCell>
              <TableCell align="left">
                {row.company && row.company.name}
              </TableCell>
              <TableCell align="left">
                {new Date(Number(row.date)).toLocaleDateString("en-US")}
              </TableCell>
              <TableCell align="left">{row.hour}</TableCell>
              <TableCell align="center">
                <Button
                  color="primary"
                  startIcon={<DeleteIcon />}
                  onClick={() => props.onRemove(Number(row.id))}
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
