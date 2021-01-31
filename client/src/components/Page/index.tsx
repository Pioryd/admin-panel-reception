import {
  useTheme,
  createStyles,
  Theme,
  makeStyles
} from "@material-ui/core/styles";
import {
  useMediaQuery,
  CssBaseline,
  AppBar,
  Toolbar,
  Box,
  Typography
} from "@material-ui/core";

import { DesktopDrawer } from "./DesktopDrawer";
import { MobileDrawer } from "./MobileDrawer";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3)
    }
  })
);

export function Page(props: { children: React.ReactNode }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap>
            <Box ml={!isDesktop && "40px"}>Registration</Box>
          </Typography>
        </Toolbar>
      </AppBar>
      {isDesktop ? <DesktopDrawer /> : <MobileDrawer />}
      <main className={classes.content}>
        <Toolbar />
        {props.children}
      </main>
    </div>
  );
}
