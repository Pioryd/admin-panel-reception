import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  FormLabel,
  CircularProgress,
  Box
} from "@material-ui/core";

import useGetCompany from "./graphQL/useGetCompany";

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
  onAdd: (data: {
    customerId: string;
    companyId: string;
    date: string;
    hour: number;
  }) => void;
}) {
  const classes = useStyles();

  const [customerId, setCustomerId] = React.useState("");
  const [companyId, setCompanyId] = React.useState("");
  const [date, setDate] = React.useState(
    new Date().toLocaleDateString("fr-CA", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    })
  );
  const [hour, setHour] = React.useState(1);

  const [hoursInfo, setHoursInfo] = React.useState("");
  const [disabledAdd, setDisabledAdd] = React.useState(false);

  const [error, setError] = React.useState("");
  const [errorOfCompanyId, setErrorOfCompanyId] = React.useState("");

  const queryGetCompany = useGetCompany();

  const add = () => {
    try {
      setDisabledAdd(false);

      Validate.appointment({ date, hour });

      const { hoursFrom, hoursTo } = queryGetCompany.response;

      if (hoursFrom == null || hoursTo == null)
        throw new Error("Invalid received company hours data.");

      if (
        !(hoursFrom < hoursTo && hour >= hoursFrom && hour <= hoursTo) &&
        !(hoursFrom > hoursTo && (hour >= hoursFrom || hour <= hoursTo)) &&
        !(hoursFrom === hoursTo && hour === hoursFrom && hour === hoursTo)
      ) {
        setDisabledAdd(true);
        throw new Error(`Hour must be in range [${hoursFrom}-${hoursTo}]`);
      }

      props.onAdd({ customerId, companyId, date, hour });
      props.onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const onCompanyIdUpdate = async (value: string) => {
    setCompanyId(value);
    try {
      await queryGetCompany.refetch({ id: value });
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    setErrorOfCompanyId("");
    setHoursInfo("");
    setDisabledAdd(false);

    if (queryGetCompany.loading) {
      setHoursInfo("Loading hours...");
      setDisabledAdd(true);
    } else if (queryGetCompany.error != null) {
      setErrorOfCompanyId("Unable to find company with given id.");
      setDisabledAdd(true);
    } else if (
      queryGetCompany.response &&
      queryGetCompany.response.hoursFrom &&
      queryGetCompany.response.hoursTo
    ) {
      setHoursInfo(
        `Hours ${queryGetCompany.response.hoursFrom}-${queryGetCompany.response.hoursTo}`
      );
      setDisabledAdd(false);
    } else {
      setErrorOfCompanyId("Wrong company id.");
      setDisabledAdd(true);
    }
  }, [
    queryGetCompany.response,
    queryGetCompany.loading,
    queryGetCompany.error,
    hour
  ]);

  React.useEffect(() => {
    setDisabledAdd(false);
    setError("");
  }, [customerId, companyId, date, hour]);

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Add appointment2</DialogTitle>
      <DialogContent>
        <TextField
          className={classes.textField}
          autoFocus
          margin="dense"
          id="customer"
          label="Customer ID"
          type="text"
          fullWidth
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
        />
        <TextField
          className={classes.textField}
          autoFocus
          margin="dense"
          id="company"
          label="Company ID"
          type="text"
          fullWidth
          value={companyId}
          onChange={(e) => onCompanyIdUpdate(e.target.value)}
        />
        <TextField
          id="date"
          label="Date"
          type="date"
          InputLabelProps={{
            shrink: true
          }}
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
        <TextField
          className={classes.textField}
          autoFocus
          margin="dense"
          id="hour"
          label="Hour"
          type="number"
          fullWidth
          value={hour}
          onChange={(e) => setHour(Number(e.target.value))}
        />
        <Typography variant="subtitle1">
          {hoursInfo}
          {queryGetCompany.loading && <CircularProgress size={15} />}
        </Typography>
        <Box textAlign="center">
          <FormLabel error>{error}</FormLabel>
        </Box>
        <Box textAlign="center">
          <FormLabel error>{errorOfCompanyId}</FormLabel>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button disabled={disabledAdd} onClick={add} color="primary">
          Add
        </Button>
      </DialogActions>
    </Dialog>
  );
}
