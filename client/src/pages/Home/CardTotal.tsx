import React from "react";

import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography,
  makeStyles,
  Divider
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  avatar: {
    backgroundColor: theme.palette.primary.main,
    height: 50,
    width: 50
  }
}));

export default function CardTotal(props: {
  title: string;
  total: number;
  icon: JSX.Element;
}) {
  const classes = useStyles();

  return (
    <Card>
      <CardContent>
        <Grid container justify="space-between">
          <Grid item>
            <Typography color="primary" variant="body1">
              {props.title}
            </Typography>
            <Divider />
            <Typography variant="h6">{props.total}</Typography>
          </Grid>
          <Grid item>
            <Avatar className={classes.avatar}>{props.icon}</Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
