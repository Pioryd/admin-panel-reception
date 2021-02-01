import React from "react";

import { makeStyles, createStyles, Theme } from "@material-ui/core/styles";
import { SwipeableDrawer, IconButton } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

import Items from "./Items";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    drawerContainer: {
      width: "auto"
    },
    openButton: {
      color: theme.palette.primary.contrastText
    }
  })
);

export default function MobileDrawer() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (open: boolean) => (
    event: React.KeyboardEvent | React.MouseEvent
  ) => {
    if (
      event &&
      event.type === "keydown" &&
      ((event as React.KeyboardEvent).key === "Tab" ||
        (event as React.KeyboardEvent).key === "Shift")
    ) {
      return;
    }

    setOpen(open);
  };

  if (!open)
    return (
      <IconButton
        className={classes.openButton}
        aria-label="open drawer"
        edge="end"
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
    );

  return (
    <SwipeableDrawer
      anchor="top"
      open={open}
      onClose={toggleDrawer(false)}
      onOpen={toggleDrawer(true)}
    >
      <div
        className={classes.drawerContainer}
        role="presentation"
        onClick={toggleDrawer(false)}
        onKeyDown={toggleDrawer(false)}
      >
        <IconButton aria-label="close drawer" edge="end">
          <MenuIcon />
        </IconButton>
        <Items />
      </div>
    </SwipeableDrawer>
  );
}
