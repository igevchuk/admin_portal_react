import {
  container,
  defaultFont,
  primaryHeaderBg,
} from "@jss/dashboardStyle.jsx";

const headerStyle = theme => ({
  appBar: {
    boxShadow: "none",
    border: "0",
    borderRadius: "0",
    margin: "0",
    padding: "0",
    backgroundColor: primaryHeaderBg,
    position: "fixed",
    width: "100%",
    zIndex: "9999",
    minHeight: "64px",
    display: "block"
  },
  container: {
    ...container,
    paddingLetf: "32px",
    paddingRight: "32px"
  },
  flex: {
    flex: 1
  },
  title: {
    ...defaultFont,
    lineHeight: "30px",
    fontSize: "18px",
    borderRadius: "3px",
    textTransform: "none",
    color: "inherit",
    "&:hover,&:focus": {
      background: "transparent"
    }
  }
});

export default headerStyle;
