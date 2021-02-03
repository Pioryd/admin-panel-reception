import React from "react";

import { Snackbar } from "@material-ui/core";
import Alert, { Color } from "@material-ui/lab/Alert";

export default function SnackbarAlert(props: {
  severity: string;
  toggleOpen: boolean;
  message: string;
}) {
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    if (open === false && props.toggleOpen === true) setOpen(true);
  }, [props.toggleOpen]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}
      onClose={(e, reason) => {
        if (reason !== "clickaway") setOpen(false);
      }}
    >
      <Alert
        severity={props.severity as Color}
        elevation={6}
        variant="filled"
        onClose={() => setOpen(false)}
      >
        {props.message}
      </Alert>
    </Snackbar>
  );
}
