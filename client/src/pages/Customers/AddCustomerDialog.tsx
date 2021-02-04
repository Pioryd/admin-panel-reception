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
  onUpdateName: (value: string) => void;
  onUpdateEmail: (value: string) => void;
  onUpdatePhone: (value: string) => void;
}) {
  const classes = useStyles();

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add customer</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.textField}
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          onChange={(e) => props.onUpdateName(e.target.value)}
        />
        <TextField
          className={classes.textField}
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
          onChange={(e) => props.onUpdateEmail(e.target.value)}
        />
        <TextField
          className={classes.textField}
          autoFocus
          margin="dense"
          id="phone"
          label="Phone"
          type="number"
          fullWidth
          onChange={(e) => props.onUpdatePhone(e.target.value)}
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
