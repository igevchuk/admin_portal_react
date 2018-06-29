import {
  drawerWidth,
  container
} from "@jss/dashboardStyle.jsx";

const appStyle = theme => ({
  wrapper: {
    position: "relative",
    top: "0",
    height: "100vh"
  },
  mainPanel: {
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${drawerWidth}px)`
    },
    overflow: "auto",
    position: "relative",
    float: "right",
    maxHeight: "100%",
    width: "100%",
    overflowScrolling: "touch"
  },
  content: {
    marginTop: "64px",
    padding: "30px 15px",
    minHeight: "calc(100vh - 64px)"
  },
  container
});

export default appStyle;
