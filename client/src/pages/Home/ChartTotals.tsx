import React from "react";
import { Pie } from "react-chartjs-2";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles
} from "@material-ui/core";
import {
  Event as EventIcon,
  Business as BusinessCenterIcon,
  People as PeopleIcon
} from "@material-ui/icons";

const options = {
  layout: { padding: 0 },
  legend: {
    display: false
  },
  maintainAspectRatio: false,
  responsive: true
};

const Items = {
  customers: {
    title: "Customers",
    icon: <PeopleIcon />,
    color: colors.blue[600]
  },
  appointments: {
    title: "Appointments",
    icon: <EventIcon />,
    color: colors.orange[600]
  },
  companies: {
    title: "Companies",
    icon: <BusinessCenterIcon />,
    color: colors.green[600]
  }
};

const useStyles = makeStyles((theme) => ({
  itemsBox: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    flexWrap: "wrap"
  },
  itemBox: {
    padding: "0px 10px 0px 10px",
    textAlign: "center",
    marginTop: "15px"
  }
}));

export default function ChartTotals(props: {
  customers: number;
  appointments: number;
  companies: number;
}) {
  const classes = useStyles();

  const [total, setTotal] = React.useState(1);
  const [data, setData] = React.useState({});

  const percentage = (value: number) => ((100 * value) / total).toFixed(2);

  React.useEffect(() => {
    setTotal(props.customers + props.appointments + props.companies);

    setData({
      datasets: [
        {
          data: [props.customers, props.appointments, props.companies],
          backgroundColor: [
            Items.customers.color,
            Items.appointments.color,
            Items.companies.color
          ],
          borderWidth: 10,
          hoverBorderColor: colors.common.white
        }
      ],
      labels: ["Customers", "Appointments", "Companies"]
    });
  }, [props]);

  return (
    <Card>
      <CardHeader title="Total items" />
      <Divider />
      <CardContent>
        <Box height={300}>
          <Pie data={data} options={options} />
        </Box>
        <Box className={classes.itemsBox}>
          {Object.keys(Items).map((key: string) => {
            const item = Items[key as keyof typeof Items];
            return (
              <Box className={classes.itemBox} key={item.title}>
                {item.icon}
                <Typography color="textPrimary" variant="body1">
                  {item.title}
                </Typography>
                <Typography style={{ color: item.color }} variant="h6">
                  {percentage(props[key as keyof typeof props])}%
                </Typography>
              </Box>
            );
          })}
        </Box>
      </CardContent>
    </Card>
  );
}
