import React from "react";
import { Bar } from "react-chartjs-2";

import { Box, Card, CardContent, CardHeader, Divider } from "@material-ui/core";

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  },
  legend: {
    display: false
  },
  maintainAspectRatio: false,
  responsive: true
};

export default function ChartHours(props: { hoursTotal: number[] }) {
  const [data, setData] = React.useState({});

  React.useEffect(() => {
    const labels: string[] = [];
    const backgroundColor: string[] = [];
    const borderColor: string[] = [];

    for (let i = 0; i < props.hoursTotal.length; i++) {
      labels.push((i + 1).toString());
      backgroundColor.push("rgba(54, 162, 235, 1)");
      borderColor.push("rgba(153, 102, 255, 1)");
    }

    setData({
      labels,
      datasets: [
        {
          label: "total",
          data: props.hoursTotal,
          backgroundColor,
          borderColor,
          borderWidth: 1
        }
      ]
    });
  }, [props]);

  return (
    <Card>
      <CardHeader title="Popularity of hours" />
      <Divider />
      <CardContent>
        <Box height={400}>
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
    </Card>
  );
}
