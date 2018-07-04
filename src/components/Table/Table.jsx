import React from "react";
import PropTypes from "prop-types";

import withStyles from "@material-ui/core/styles/withStyles";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";

import styled from "styled-components";
import tableStyle from "./tableStyle";

// const Table = styled.table`
//   width: 100%
// `;

// const TableHead = styled.thead`
//   font-size: 12px;
//   text-align: left;
//   &:first-child {
//     padding-left: 24px;
//     padding-right: 24px;
//   }
// `;

// const TableRow = styled.tr``;
// const TableBody = styled.tbody``;
// const TableCell = styled.td`
//   padding: 16px 12px;
//   font-size: 14px;
//   text-align: left;
//   line-height: 17px;
//   &:first-child,
//   &:last-child {
//     padding-left: 24px;
//     padding-right: 24px;
//   }
// `;
// const TableHeadCell = styled(TableCell)`
//   &&& {
//     font-size: 12px;
//   }
// `;

function CustomTable({ ...props }) {
  const { classes, tableCols, tableData } = props;
  console.log(123,tableData)
  return (
    <Table>
      {
        !!tableCols && tableCols.length > 0 ? (
        <TableHead>
          <TableRow>
            {tableCols.map((prop, key) => {
              return (
                <TableCell key={key}>
                  {prop}
                </TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        ) : null
      }
      <TableBody>
        {tableData.map((prop, key) => {
          return (
            <TableRow key={key}>
              {/* {prop.map((prop, key) => {
                return (
                  <TableCell className={classes.tableCell} key={key}>
                    {prop}
                  </TableCell>
                );
              })} */}
              <TableCell className={classes.tableCell}>
                {prop.name}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {prop.email}
              </TableCell>
              <TableCell className={classes.tableCell}>
                {prop.phone}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

CustomTable.defaultProps = {
  tableHeaderColor: "gray"
};

CustomTable.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.object)
};

export default withStyles(tableStyle)(CustomTable);
