import React from "react";

import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import { Button, Typography, CircularProgress, Box } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import { Add as AddIcon, Cached as CachedIcon } from "@material-ui/icons";

import SnackbarAlert from "../../components/SnackbarAlert";

import useGetCompanies from "./graphQL/useGetCompanies";
import useAddCompany from "./graphQL/useAddCompany";
import useRemoveCompany from "./graphQL/useRemoveCompany";

import Table from "./Table";
import AddCompanyDialog from "./AddCompanyDialog";

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

export default function Companies() {
  const classes = useStyles();

  const mounted = React.useRef(false);

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");

  const queryGetCompanies = useGetCompanies();
  const mutationAddCompany = useAddCompany();
  const mutationRemoveCompany = useRemoveCompany();

  const [dialogAddCompanyOpened, setDialogAddCompanyOpened] = React.useState(
    false
  );

  const addCompany = async () => {
    try {
      await mutationAddCompany.fetch({ variables: { name, email, phone } });

      if (mounted.current !== true) return;

      queryGetCompanies.refetch({
        page: queryGetCompanies.response.currentPage
      });
    } catch (err) {
      console.log(err);
    }
  };

  const removeCompany = async (id: number) => {
    try {
      await mutationRemoveCompany.fetch({ variables: { id: Number(id) } });

      if (mounted.current !== true) return;

      queryGetCompanies.refetch({
        page: queryGetCompanies.response.currentPage
      });
    } catch (err) {
      console.log(err);
    }
  };

  const reloadCompanies = () =>
    queryGetCompanies
      .refetch({
        page: queryGetCompanies.response.currentPage
      })
      .catch((err) => console.log(err));

  React.useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  if (queryGetCompanies.error)
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
          onClick={reloadCompanies}
        >
          Refresh
        </Button>
      </Box>
    );

  return (
    <>
      <SnackbarAlert
        severity="error"
        toggleOpen={mutationAddCompany.error != null}
        message="Unable to get companies."
      />

      <SnackbarAlert
        severity="error"
        toggleOpen={mutationAddCompany.error != null}
        message="Unable to add company."
      />
      <SnackbarAlert
        severity="success"
        toggleOpen={mutationAddCompany.data != null}
        message="Company added."
      />

      <SnackbarAlert
        severity="error"
        toggleOpen={mutationRemoveCompany.error != null}
        message="Unable to remove company."
      />
      <SnackbarAlert
        severity="success"
        toggleOpen={mutationRemoveCompany.data != null}
        message="Company removed."
      />

      {queryGetCompanies.loading && (
        <CircularProgress className={classes.loadingIcon} />
      )}

      <AddCompanyDialog
        open={dialogAddCompanyOpened}
        onClose={() => setDialogAddCompanyOpened(false)}
        onAdd={addCompany}
        onUpdateName={setName}
        onUpdateEmail={setEmail}
        onUpdatePhone={setPhone}
      />

      <>
        <>
          <Button
            className={classes.topButton}
            startIcon={<AddIcon />}
            onClick={() => setDialogAddCompanyOpened(true)}
          >
            Add
          </Button>

          <Button
            className={classes.topButton}
            startIcon={<CachedIcon />}
            onClick={reloadCompanies}
          >
            Refresh
          </Button>

          <Typography align="center" variant="h5">
            Companies
          </Typography>
        </>

        <Table
          rows={queryGetCompanies.response.items}
          onRemove={removeCompany}
        />

        <Pagination
          className={classes.pagination}
          count={queryGetCompanies.response.totalPages}
          page={queryGetCompanies.response.currentPage}
          siblingCount={0}
          boundaryCount={1}
          onChange={(event, page) => queryGetCompanies.refetch({ page })}
        />
      </>
    </>
  );
}
