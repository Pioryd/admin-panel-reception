import React from "react";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Drawer, Toolbar } from "@material-ui/core";

import Items from "./Items";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: (props: { width: number }) => props.width,
      flexShrink: 0
    },
    drawerPaper: {
      width: (props: { width: number }) => props.width
    },
    drawerContainer: {
      overflow: "auto"
    }
  })
);

export default function DesktopDrawer(props: { width: number }) {
  const classes = useStyles({ width: props.width });

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper
      }}
    >
      <Toolbar />
      <div className={classes.drawerContainer}>
        <Items />
      </div>
    </Drawer>
  );
}
