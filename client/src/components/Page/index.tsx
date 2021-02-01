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

import DesktopDrawer from "./DesktopDrawer";
import MobileDrawer from "./MobileDrawer";

const DESKTOP_DRAWER_WIDTH = 240;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1
    },
    mobileContent: {
      flexGrow: 1,
      padding: theme.spacing(3)
    },
    desktopContent: {
      flexGrow: 1,
      padding: theme.spacing(3),
      marginLeft: DESKTOP_DRAWER_WIDTH
    }
  })
);

export default function Page(props: { children: React.ReactNode }) {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up("sm"));

  const classes = useStyles();

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          {!isDesktop && <MobileDrawer />}

          <Typography variant="h6" noWrap>
            <Box ml={!isDesktop ? "40px" : "0"}>
              {process.env.REACT_APP_NAME}
            </Box>
          </Typography>
        </Toolbar>
      </AppBar>

      {isDesktop && <DesktopDrawer width={DESKTOP_DRAWER_WIDTH} />}

      <main
        className={isDesktop ? classes.desktopContent : classes.mobileContent}
      >
        <Toolbar />
        {props.children}
      </main>
    </>
  );
}
