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
  CircularProgress
} from "@material-ui/core";

import useGetCompany from "./graphQL/useGetCompany";

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

  const [companyInfo, setCompanyInfo] = React.useState("");
  const [disabledAdd, setDisabledAdd] = React.useState(false);
  const { error, loading, refetch, response } = useGetCompany();

  const onCompanyIdUpdate = async (value: number) => {
    props.onUpdateCompanyId(value);

    try {
      await refetch({ id: value });
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    if (loading) {
      setCompanyInfo("Loading hours...");
      setDisabledAdd(true);
    } else if (error != null) {
      setCompanyInfo("Unable to find company with given id.");
      setDisabledAdd(true);
    } else if (response && response.hoursFrom && response.hoursTo) {
      setCompanyInfo(`Hours ${response.hoursFrom}-${response.hoursTo}`);
      setDisabledAdd(false);
    } else {
      setCompanyInfo("Set proper company id.");
      setDisabledAdd(true);
    }
  }, [response, loading, error]);

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
          onChange={(e) => onCompanyIdUpdate(Number(e.target.value))}
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
          disabled={disabledAdd}
          className={classes.textField}
          autoFocus
          margin="dense"
          id="hour"
          label="Hour"
          type="number"
          fullWidth
          onChange={(e) => props.onUpdateHour(Number(e.target.value))}
        />
        <Typography variant="subtitle1">
          {companyInfo}
          {loading && <CircularProgress size={15} />}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="primary">
          Cancel
        </Button>
        <Button
          disabled={disabledAdd}
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
