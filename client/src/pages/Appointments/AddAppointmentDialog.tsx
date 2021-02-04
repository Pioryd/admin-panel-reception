import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@material-ui/core";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    textField: {
      marginTop: "25px",
      marginBottom: "25px"
    }
  })
);

export default function AddCustomerDialog(props: {
  open: boolean;
  onClose: () => void;
  onAdd: () => void;
  onUpdateCustomerId: (value: number) => void;
  onUpdateCompanyId: (value: number) => void;
  onUpdateDate: (value: string) => void;
  onUpdateHour: (value: number) => void;
}) {
  const classes = useStyles();

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add appointment</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.textField}
          autoFocus
          margin="dense"
          id="customer"
          label="Customer ID"
          type="text"
          fullWidth
          onChange={(e) => props.onUpdateCustomerId(Number(e.target.value))}
        />
        <TextField
          className={classes.textField}
          autoFocus
          margin="dense"
          id="company"
          label="Company ID"
          type="text"
          fullWidth
          onChange={(e) => props.onUpdateCompanyId(Number(e.target.value))}
        />
        <TextField
          className={classes.textField}
          autoFocus
          margin="dense"
          id="date"
          label="Date"
          type="text"
          fullWidth
          onChange={(e) => props.onUpdateDate(e.target.value)}
        />
        <TextField
          className={classes.textField}
          autoFocus
          margin="dense"
          id="hour"
          label="Hour"
          type="number"
          fullWidth
          onChange={(e) => props.onUpdateHour(Number(e.target.value))}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => {
            props.onAdd();
            props.onClose();
          }}
          color="primary"
        >
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
