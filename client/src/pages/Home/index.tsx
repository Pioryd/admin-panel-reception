import { Container, Grid } from "@material-ui/core";
import {
  Event as EventIcon,
  Business as BusinessCenterIcon,
  People as PeopleIcon
} from "@material-ui/icons";

import useGetAppointmentsCount from "./graphQL/useGetAppointmentsCount";
import useGetCompaniesCount from "./graphQL/useGetCompaniesCount";
import useGetCustomersCount from "./graphQL/useGetCustomersCount";
import useGetHoursTotal from "./graphQL/useGetHoursTotal";

import CardTotal from "./CardTotal";
import ChartTotals from "./ChartTotals";
import ChartHours from "./ChartHours";

export default function Home() {
  const queryGetAppointmentsCount = useGetAppointmentsCount();
  const queryGetCompaniesCount = useGetCompaniesCount();
  const queryGetCustomersCount = useGetCustomersCount();
  const queryGetHoursTotal = useGetHoursTotal();

  return (
    <Container maxWidth={false}>
      <Grid container alignItems="center" justify="center" spacing={3}>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <CardTotal
            title="Total customers"
            total={queryGetCustomersCount.response}
            icon={<PeopleIcon />}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <CardTotal
            title="Total appointments"
            total={queryGetAppointmentsCount.response}
            icon={<EventIcon />}
          />
        </Grid>
        <Grid item xl={4} lg={4} md={6} sm={12} xs={12}>
          <CardTotal
            title="Total companies"
            total={queryGetCompaniesCount.response}
            icon={<BusinessCenterIcon />}
          />
        </Grid>
        <Grid item xl={9} lg={8} md={12} sm={12} xs={12}>
          <ChartHours hoursTotal={queryGetHoursTotal.response} />
        </Grid>
        <Grid item xl={3} lg={4} md={12} sm={12} xs={12}>
          <ChartTotals
            customers={queryGetCustomersCount.response}
            appointments={queryGetAppointmentsCount.response}
            companies={queryGetCompaniesCount.response}
          />
        </Grid>
      </Grid>
    </Container>
  );
}
