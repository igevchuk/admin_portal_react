import {
  defaultFont
} from "@jss/dashboardStyle.jsx";

const tableStyle = theme => ({
  tableHeadCell: {
    ...defaultFont,
    color: "#757575",
    fontSize: "12px",
    textAlign: "left"
  },
  tableCell: {
    ...defaultFont,
    lineHeight: "1.42857143",
    padding: "12px 8px",
    verticalAlign: "left",
    "&:first-child, &:last-child": {
      paddingLeft: "24px",
      paddingRight: "24px"
    }
  },
  tableResponsive: {
    width: "100%",
    marginTop: theme.spacing.unit * 3,
    overflowX: "auto"
  }
});

export default tableStyle;
