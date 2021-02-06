import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormLabel,
  Box
} from "@material-ui/core";

import * as Validate from "../../util/validate";

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
  onAdd: (data: { name: string; email: string; phone: string }) => void;
}) {
  const classes = useStyles();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const [error, setError] = React.useState("");

  const add = () => {
    try {
      Validate.customer({ name, email, phone });

      props.onAdd({ name, email, phone });
      props.onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  React.useEffect(() => setError(""), [name, email, phone]);

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
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          className={classes.textField}
          autoFocus
          margin="dense"
          id="email"
          label="Email"
          type="email"
          fullWidth
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={classes.textField}
          autoFocus
          margin="dense"
          id="phone"
          label="Phone"
          type="number"
          fullWidth
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <Box textAlign="center">
          <FormLabel error>{error}</FormLabel>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button onClick={add} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
