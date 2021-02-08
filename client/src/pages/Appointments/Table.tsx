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
  onRemove: (id: string) => void;
}) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <MuiTable size="small" aria-label="Appointments data">
        <TableHead>
          <TableRow className={classes.tableRow}>
            <TableCell>ID</TableCell>
            <TableCell align="left">Customer ID</TableCell>
            <TableCell align="left">Company ID</TableCell>
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
              <TableCell align="left">{row.customerId}</TableCell>
              <TableCell align="left">{row.companyId}</TableCell>
              <TableCell align="left">
                {new Date(Number(row.date)).toLocaleDateString("en-US")}
              </TableCell>
              <TableCell align="left">{row.hour}</TableCell>
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
