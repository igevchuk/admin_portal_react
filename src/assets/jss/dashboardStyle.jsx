const drawerWidth = 256;

const transition = {
  transition: "all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1)"
};

const container = {
  paddingRight: "15px",
  paddingLeft: "15px",
  marginRight: "auto",
  marginLeft: "auto"
};

const boxShadow = {
  boxShadow:
    "0 10px 30px -12px rgba(0, 0, 0, 0.42), 0 4px 25px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)"
};

const card = {
  display: "inline-block",
  position: "relative",
  width: "100%",
  margin: "25px 0",
  boxShadow: "0 1px 4px 0 rgba(0, 0, 0, 0.14)",
  borderRadius: "3px",
  color: "rgba(0, 0, 0, 0.87)",
  background: "#fff"
};

const defaultFont = {
  fontFamily: '"Helvetica", "Arial", "Roboto", sans-serif',
  fontWeight: "300",
  lineHeight: "1.5em"
};

const defaultText = {
  color: "#424242",
  fontSize: "14px"
};

const activeLink = "#43A047";
const headerBg = "#002888";

const primaryBoxShadow = {
  boxShadow:
    "0 12px 20px -10px rgba(156, 39, 176, 0.28), 0 4px 20px 0px rgba(0, 0, 0, 0.12), 0 7px 8px -5px rgba(156, 39, 176, 0.2)"
};

const defaultBoxShadow = {
  border: "0",
  borderRadius: "3px",
  boxShadow:
    "0 10px 20px -12px rgba(0, 0, 0, 0.42), 0 3px 20px 0px rgba(0, 0, 0, 0.12), 0 8px 10px -5px rgba(0, 0, 0, 0.2)",
  padding: "10px 0",
  transition: "all 150ms ease 0s"
};

const title = {
  color: "#424242",
  textDecoration: "none",
  fontWeight: "300",
  fontSize: "40px",
  marginTop: "30px",
  marginBottom: "25px",
  minHeight: "32px",
  fontFamily: "'Helvetica', 'Arial', Roboto', sans-serif",
  letterSpacing: "0",
  "& small": {
    color: "#777",
    fontSize: "65%",
    fontWeight: "400",
    lineHeight: "1"
  }
};

const cardTitle = {
  ...title,
  marginTop: "0",
  marginBottom: "3px",
  minHeight: "auto",
  "& a": {
    ...title,
    marginTop: ".625rem",
    marginBottom: "0.75rem",
    minHeight: "auto"
  }
};

const cardSubtitle = {
  marginTop: "-.375rem"
};

const cardLink = {
  "& + $cardLink": {
    marginLeft: "1.25rem"
  }
};

const button = {
  textAlign: "center",
  fontSize: "14px",
  letterSpacing: "-0.03px",
  minHeight: "36px"
}

export {
  //variables
  drawerWidth,
  transition,
  container,
  boxShadow,
  card,
  defaultFont,
  defaultText,
  activeLink,
  headerBg,
  primaryBoxShadow,
  defaultBoxShadow,
  title,
  cardTitle,
  cardSubtitle,
  cardLink,
  button
};
