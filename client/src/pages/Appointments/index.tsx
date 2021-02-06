import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Button, Typography, CircularProgress, Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Add as AddIcon, Cached as CachedIcon } from "@material-ui/icons";

import SnackbarAlert from "../../components/SnackbarAlert";

import useGetAppointments from "./graphQL/useGetAppointments";
import useAddAppointment from "./graphQL/useAddAppointment";
import useRemoveAppointment from "./graphQL/useRemoveAppointment";

import Table from "./Table";
import AddAppointmentDialog from "./AddAppointmentDialog";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    pagination: {
      display: "flex",
      justifyContent: "center",
      marginTop: "10px"
    },
    topButton: {
      marginBottom: "30px",
      marginRight: "20px",
      float: "right",
      color: theme.palette.primary.main
    },
    button: {
      color: theme.palette.primary.main
    },
    loadingIcon: {
      position: "absolute",
      top: "50%",
      left: "50%"
    }
  })
);

export default function Appointments() {
  const classes = useStyles();

  const mounted = React.useRef(false);

  const queryGetAppointments = useGetAppointments();
  const mutationAddAppointment = useAddAppointment();
  const mutationRemoveAppointment = useRemoveAppointment();

  const [
    dialogAddAppointmentOpened,
    setDialogAddAppointmentOpened
  ] = React.useState(false);

  const getAppointments = async (page: number) => {
    try {
      await queryGetAppointments.refetch({ page });
    } catch (err) {
      console.log(err);
    }
  };

  const addAppointment = async (data: {
    customerId: number;
    companyId: number;
    date: string;
    hour: number;
  }) => {
    const { customerId, companyId, date, hour } = data;

    try {
      await mutationAddAppointment.fetch({
        variables: { customerId, companyId, date, hour }
      });

      if (mounted.current !== true) return;

      await queryGetAppointments.refetch({
        page: queryGetAppointments.response.currentPage
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeAppointment = async (id: number) => {
    try {
      await mutationRemoveAppointment.fetch({ variables: { id: Number(id) } });

      if (mounted.current !== true) return;

      await queryGetAppointments.refetch({
        page: queryGetAppointments.response.currentPage
      });
    } catch (err) {
      console.log(err);
    }
  };

  const reloadAppointments = async () => {
    try {
      await queryGetAppointments.refetch({
        page: queryGetAppointments.response.currentPage
      });
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  if (queryGetAppointments.error)
    return (
      <Box textAlign="center">
        <Typography align="center" variant="h4">
          Error
        </Typography>
        <Typography align="center" variant="h5">
          Unable to load data
        </Typography>

        <Button
          className={classes.button}
          startIcon={<CachedIcon />}
          onClick={reloadAppointments}
        >
          Refresh
        </Button>
      </Box>
    );

  return (
    <>
      <SnackbarAlert
        severity="error"
        toggleOpen={mutationAddAppointment.error != null}
        message="Unable to get appointments."
      />

      <SnackbarAlert
        severity="error"
        toggleOpen={mutationAddAppointment.error != null}
        message="Unable to add appointment."
      />
      <SnackbarAlert
        severity="success"
        toggleOpen={mutationAddAppointment.data != null}
        message="Appointment added."
      />

      <SnackbarAlert
        severity="error"
        toggleOpen={mutationRemoveAppointment.error != null}
        message="Unable to remove appointment."
      />
      <SnackbarAlert
        severity="success"
        toggleOpen={mutationRemoveAppointment.data != null}
        message="Appointment removed."
      />

      {queryGetAppointments.loading && (
        <CircularProgress className={classes.loadingIcon} />
      )}

      <AddAppointmentDialog
        open={dialogAddAppointmentOpened}
        onClose={() => setDialogAddAppointmentOpened(false)}
        onAdd={addAppointment}
      />

      <>
        <>
          <Button
            className={classes.topButton}
            startIcon={<AddIcon />}
            onClick={() => setDialogAddAppointmentOpened(true)}
          >
            Add
          </Button>

          <Button
            className={classes.topButton}
            startIcon={<CachedIcon />}
            onClick={reloadAppointments}
          >
            Refresh
          </Button>

          <Typography align="center" variant="h5">
            Appointments
          </Typography>
        </>

        <Table
          rows={queryGetAppointments.response.items}
          onRemove={removeAppointment}
        />

        <Pagination
          className={classes.pagination}
          count={queryGetAppointments.response.totalPages}
          page={queryGetAppointments.response.currentPage}
          siblingCount={0}
          boundaryCount={1}
          onChange={(event, page) => getAppointments(page)}
        />
      </>
    </>
  );
}
