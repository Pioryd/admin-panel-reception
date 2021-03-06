import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Button, Typography, CircularProgress, Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Add as AddIcon, Cached as CachedIcon } from "@material-ui/icons";

import SnackbarAlert from "../../components/SnackbarAlert";

import useGetCustomers from "./graphQL/useGetCustomers";
import useAddCustomer from "./graphQL/useAddCustomer";
import useRemoveCustomer from "./graphQL/useRemoveCustomer";

import Table from "./Table";
import AddCustomerDialog from "./AddCustomerDialog";

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

export default function Customers() {
  const classes = useStyles();

  const mounted = React.useRef(false);

  const queryGetCustomers = useGetCustomers();
  const mutationAddCustomer = useAddCustomer();
  const mutationRemoveCustomer = useRemoveCustomer();

  const [dialogAddCustomerOpened, setDialogAddCustomerOpened] = React.useState(
    false
  );

  const getCustomers = async (page: number) => {
    try {
      await queryGetCustomers.refetch({ page });
    } catch (err) {
      console.log(err);
    }
  };

  const addCustomer = async (data: {
    name: string;
    email: string;
    phone: string;
  }) => {
    try {
      const { name, email, phone } = data;
      await mutationAddCustomer.fetch({ variables: { name, email, phone } });

      if (mounted.current !== true) return;

      await queryGetCustomers.refetch({
        page: queryGetCustomers.response.currentPage
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeCustomer = async (id: number) => {
    try {
      await mutationRemoveCustomer.fetch({ variables: { id: Number(id) } });

      if (mounted.current !== true) return;

      await queryGetCustomers.refetch({
        page: queryGetCustomers.response.currentPage
      });
    } catch (err) {
      console.log(err);
    }
  };

  const reloadCustomers = async () => {
    try {
      await queryGetCustomers.refetch({
        page: queryGetCustomers.response.currentPage
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

  if (queryGetCustomers.error)
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
          onClick={reloadCustomers}
        >
          Refresh
        </Button>
      </Box>
    );

  return (
    <Box>
      <SnackbarAlert
        severity="error"
        toggleOpen={mutationAddCustomer.error != null}
        message="Unable to get customers."
      />

      <SnackbarAlert
        severity="error"
        toggleOpen={mutationAddCustomer.error != null}
        message="Unable to add customer."
      />
      <SnackbarAlert
        severity="success"
        toggleOpen={mutationAddCustomer.data != null}
        message="Customer added."
      />

      <SnackbarAlert
        severity="error"
        toggleOpen={mutationRemoveCustomer.error != null}
        message="Unable to remove customer."
      />
      <SnackbarAlert
        severity="success"
        toggleOpen={mutationRemoveCustomer.data != null}
        message="Customer removed."
      />

      {queryGetCustomers.loading && (
        <CircularProgress className={classes.loadingIcon} />
      )}

      <AddCustomerDialog
        open={dialogAddCustomerOpened}
        onClose={() => setDialogAddCustomerOpened(false)}
        onAdd={addCustomer}
      />

      <>
        <>
          <Button
            className={classes.topButton}
            startIcon={<AddIcon />}
            onClick={() => setDialogAddCustomerOpened(true)}
          >
            Add
          </Button>

          <Button
            className={classes.topButton}
            startIcon={<CachedIcon />}
            onClick={reloadCustomers}
          >
            Refresh
          </Button>

          <Typography align="center" variant="h5">
            Customers
          </Typography>
        </>

        <Table
          rows={queryGetCustomers.response.items}
          onRemove={removeCustomer}
        />

        <Pagination
          className={classes.pagination}
          count={queryGetCustomers.response.totalPages}
          page={queryGetCustomers.response.currentPage}
          siblingCount={0}
          boundaryCount={1}
          onChange={(event, page) => getCustomers(page)}
        />
      </>
    </Box>
  );
}
