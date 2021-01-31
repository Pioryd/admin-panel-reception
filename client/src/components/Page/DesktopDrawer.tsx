import React from "react";

import { createStyles, Theme, makeStyles } from "@material-ui/core/styles";
import { Drawer, Toolbar } from "@material-ui/core";

import { Items } from "./Items";

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawer: {
      width: drawerWidth,
      flexShrink: 0
    },
    drawerPaper: {
      width: drawerWidth
    },
    drawerContainer: {
      overflow: "auto"
    }
  })
);

export function DesktopDrawer() {
  const classes = useStyles();

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
