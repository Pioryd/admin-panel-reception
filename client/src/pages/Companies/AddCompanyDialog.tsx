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

export default function AddCompanyDialog(props: {
  open: boolean;
  onClose: () => void;
  onAdd: (data: {
    name: string;
    email: string;
    phone: string;
    hoursFrom: number;
    hoursTo: number;
  }) => void;
}) {
  const classes = useStyles();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [hoursFrom, setHoursFrom] = React.useState(1);
  const [hoursTo, setHoursTo] = React.useState(1);

  const [error, setError] = React.useState("");

  const add = () => {
    try {
      Validate.company({ name, email, phone, hoursFrom, hoursTo });

      props.onAdd({ name, email, phone, hoursFrom, hoursTo });
      props.onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  React.useEffect(() => setError(""), [name, email, phone, hoursFrom, hoursTo]);

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add company</DialogTitle>
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
        <TextField
          className={classes.textField}
          autoFocus
          margin="dense"
          id="HoursFrom"
          label="Hours from"
          type="number"
          fullWidth
          value={hoursFrom}
          onChange={(e) => setHoursFrom(Number(e.target.value))}
        />
        <TextField
          className={classes.textField}
          autoFocus
          margin="dense"
          id="HoursTo"
          label="Hours to"
          type="number"
          fullWidth
          value={hoursTo}
          onChange={(e) => setHoursTo(Number(e.target.value))}
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
