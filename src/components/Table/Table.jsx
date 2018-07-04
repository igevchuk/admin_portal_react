import React from "react";
import PropTypes from "prop-types";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";

function StyledTable({ ...props }) {
  const { tableCols, tableData } = props;
  return (
    <Table>
      { !!tableCols && tableCols.length > 0 ? (
        <TableHead>
          <TableRow>
            { tableCols.map((prop, key) => {
              return (
                <TableCell key={key}>
                  {prop}
              </TableCell>
              );
            }) }
          </TableRow>
        </TableHead>
      ) : null}
      
      <TableBody>
        { tableData.map((prop, key) => {
          return (
            <TableRow key={ key  }>
              { prop.map((prop, key) => {
                return <TableCell key={ key }>{ prop }</TableCell>;
              }) }
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

StyledTable.propTypes = {
  tableCols: PropTypes.arrayOf(PropTypes.string),
  tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string).isRequired)
};

export default StyledTable;
