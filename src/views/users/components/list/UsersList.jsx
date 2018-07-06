import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell
} from "@material-ui/core";

const UsersList = styled.div`
  & table tbody tr {
    background: #FFFFFF;
    transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    cursor: pointer;
    &:hover {
      background: rgba(0, 0, 0, 0.08);
    }
  }
`;

UsersList.propTypes = {
  cols: PropTypes.arrayOf(PropTypes.object),
  data: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ({ ...props }) => {
  const { cols, data } = props;
  return (
    <UsersList className="users-list" {...props}>
      <Table>
        {!!cols && cols.length > 0 ? (
          <TableHead>
            <TableRow>
              {cols.map(col => {
                return (
                  <TableCell key={col.key}>
                    {col.label}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}

        <TableBody>
          {data.map(row => {
            return (
              <TableRow key={row.id}>
                <TableCell key="name" onClick={() => props.onUserClick(row.id)}>{row.name}</TableCell>
                <TableCell key="email">{row.email}</TableCell>
                <TableCell key="groups">{row.groups}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </UsersList>
  );
}
