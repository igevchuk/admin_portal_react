import React from "react";
import styled from "styled-components";
import Table from './Table';

export default ({ ...props }) => {
  function _renderTableCols(cols) {
    return cols.map(col => <td key={col.key}>{col.value}</td>);
  }

  const { cols, data } = props;
  return (
    <Table {...props}>
      {!!cols && cols.length > 0 ? (
        <thead>
          <tr>
            {cols.map(col => {
              return <td key={col.key}>{col.label}</td>;
            })}
          </tr>
        </thead>
      ) : null}

      <tbody>
        {data.map(row => {
          return (
            <tr key={row.key}>
              {
                _renderTableCols(row.cols)
              }
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
