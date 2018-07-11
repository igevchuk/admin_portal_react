import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { TableCell } from "@material-ui/core";
import Table from "@components/Table/Table";
import TableSortLabel from "@material-ui/core/TableSortLabel";

const styles = { row: { cursor: "pointer" } };
const TableHeaderCell = styled.th`
  & > span {
    cursor: pointer;
    position: relative;
    &:hover {
      color: ${props => props.theme.baseFontColor};
    }
    & > span {
      color: inherit;
      position: absolute;
    }
  }
`;

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.orderUsers = this.orderUsers.bind(this);
  }

  getOrderingOptions() {
    return {
      first_name: { asc: "-first_name", desc: "first_name" },
      last_name: { asc: "-last_name", desc: "last_name" },
      email: { asc: "-email", desc: "email" }
    };
  }

  orderUsers(key) {
    const orderingOptions = this.getOrderingOptions();
    const { orderBy } = this.props;

    let direction;
    if (!orderBy) {
      direction = 'desc';
    } else if (key === orderBy) {
      direction = 'asc';
    } else {
      direction = 'desc';
    }

    this.setState(
      {
        direction,
        order: orderingOptions[key]
      },
      () => {
        this.props.onSort("ordering", orderingOptions[key][direction]);
      }
    );
  }

  _renderSortLabel(key) {
    const orderingOptions = this.getOrderingOptions();
    const direction = this.state ? this.state.direction : 'desc';
    const { orderBy } = this.props;
    console.log(direction)
    if (!!orderBy && orderBy.replace('-', '') === key) {
      return <TableSortLabel active={true} direction={direction} />;            
    }

    return null;

  }

  render() {
    const { styles, data } = this.props;
    const direction = this.state ? this.state.direction : 'desc';

    return (
      <Table className="users-list" styles={styles}>
        <thead>
          <tr>
            <TableHeaderCell sortDirection={direction} width="20%">
              <span onClick={() => this.orderUsers("first_name")}>
                First Name
                {this._renderSortLabel("first_name")}
              </span>
            </TableHeaderCell>

            <TableHeaderCell width="25%">
              <span onClick={() => this.orderUsers("last_name")}>
                Last Name
                {this._renderSortLabel("last_name")}
              </span>
            </TableHeaderCell>

            <TableHeaderCell with="25%">
              <span onClick={() => this.orderUsers("email")}>
                Email
                {this._renderSortLabel("email")}
              </span>
            </TableHeaderCell>

            <TableHeaderCell with="30%">Groups</TableHeaderCell>
          </tr>
        </thead>

        <tbody>
          {data.map(row => {
            return (
              <tr key={row.id} onClick={() => this.props.onUserClick(row.id)}>
                <td key="first_name">{row.first_name}</td>

                <td key="last_name">{row.last_name}</td>

                <td key="email">{row.email}</td>

                <td key="groups">{row.groups}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    );
  }
}

UsersList.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  onUserClick: PropTypes.func
};

export default UsersList;
