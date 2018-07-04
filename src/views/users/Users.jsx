import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as usersActions from "@actions/usersActions";
import PropTypes from "prop-types";
import styled from "styled-components";
import _ from "lodash";
import cx from "classnames";
import { Paper, InputLabel, Select, Input, MenuItem, FormControl } from "@material-ui/core";
import Container from "@components/Container/Container";
import Table from "@components/Table/Table";
import { RaisedButton, SecondaryButton } from "@components/Button/Button";
import SearchInput from "./components/search/SearchInput";
import Dialog from "@components/Dialog/Dialog";
import UserForm from "./components/form/UserForm";

const UsersContainer = Container.extend`
  width: 960px;
`;
const Title = styled.h1`
  color: #424242;
  text-decoration: none;
  font-weight: 300;
  font-size: 40px;
  margin-top: 30px;
  margin-bottom: 25px;
  min-height: 32px;
  font-family: ${props => props.theme.fontSans};
  letter-spacing: 0;
`;
const Toolbar = styled.div`
  min-height: 64px;
  margin-bottom: 25px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  align-content: flex-end;
`;
const OrderingSelect = styled.div`
  & .users-order {
    display: flex;
    position: relative;
    min-width: 200px;
    font-size: 12px;
    .users-order-button {
      display: block;
      min-width: 200px;
      text-align: left;
    }
  }
  & ul {
    display: none;
    position: absolute;
    top: 36px;
    left: 0;
    right: 0;
    padding: 8px 0;
    list-style: none;
    z-index: 10;
    background: white;
    box-shadow: ${props => props.theme.baseBoxShadow} 
    > li {
      padding: 12px 16px;
      cursor: pointer;
    }
  }

  & .active {
    & ul {
      display: block;
    }
  }
`;

const PAGE_SIZE = 10;

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      params: {
        search: "",
        ordering: null
      },
      pagination: {
        page: 1,
        page_size: PAGE_SIZE
      },
      openOrderingSelect: false
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  updateParams(key, value) {
    const { params } = this.state;

    if ([key] !== value) {
      this.setState(
        {
          params: { ...params, [key]: value }
        },
        () => this.fetchUsers()
      );
    }

    if (key === 'ordering') {
      this.toggleOrderingSelect();
    }
  }

  fetchUsers() {
    const params = this.getParams();
    this.props.usersActions.fetchUsers({ ...params });
  }

  getOrderingOptions() {
    return [
      { label: "First Name (A-Z)", key: "first_name", order: "desc" },
      { label: "Last Name (A-Z)", key: "last_name", order: "desc" },
      { label: "Email (A-Z)", key: "email", order: "desc" },
      { label: "First Name (Z-A)", key: "-first_name", order: "asc" },
      { label: "Last Name (Z-A)", key: "-last_name", order: "asc" },
      { label: "Email (Z-A)", key: "-email", order: "asc" }
    ];
  }

  getOrderingLabel() {
    const { ordering } = this.state.params;
    const label = '';

    if (!ordering) {
      return 'Sort by';
    }

    return this.getOrderingOptions()
      .find(option => option.key === ordering)
      .label;
  }

  toggleOrderingSelect() {
    this.setState({
      openOrderingSelect: !this.state.openOrderingSelect
    });
  }

  getParams() {
    const { params, pagination } = this.state;
    const paramsData = { ...params, ...pagination };
    let paramsObj = null;

    Object.keys(paramsData).forEach(key => {
      if (!_.isEmpty(paramsData[key])) {
        paramsObj = { ...(paramsObj || {}), [key]: paramsData[key] };
      }
    });

    return paramsObj;
  }

  getName(user) {
    if (!!user) {
      return `${user.first_name} ${user.last_name}`;
    }

    return "";
  }

  getGroups(user) {
    if (!!user && !!user.group_names && user.group_names.length)
      return user.group_names.join(", ");

    return "";
  }

  getTableData(data) {
    return data.reduce((accum, current) => {
      accum.push([
        this.getName(current),
        current.email,
        this.getGroups(current)
      ]);

      return accum;
    }, []);
  }

  filterUsers() {}

  handleClickOpen() {
    this.dialog.handleOpen();
  }

  handleClickClose() {
    this.dialog.handleClose();
  }

  getDialogTitle() {
    const { user } = this.state;
    return !!user ? `Edit User: ${user.name}` : `Create New User`;
  }

  deleteUser(e) {
    e.preventDefault();
    alert(`User ${user.id} was deleted.`);
    this.handleClickClose();
  }

  saveUser() {
    alert(`User ${user.id} was created.`);
    this.handleClickClose();
  }

  getUsersTable() {
    const { users } = this.props;

    if (!!users && Array.isArray(users) && users.length) {
      return (
        <Table
          tableCols={["Name", "Email", "Role"]}
          tableData={this.getTableData(users)}
        />
      );
    }

    return null;
  }

  getUserFormDialog() {
    return (
      <Dialog
        ref={dialog => (this.dialog = dialog)}
        open={this.state.openDialog}
        dialogTitle={this.getDialogTitle()}
      >
        <UserForm
          handleClose={this.handleClickClose}
          handleDelete={this.deleteUser.bind(this)}
          handleSave={this.saveUser.bind(this)}
        />
      </Dialog>
    );
  }

  render() {
    const { users } = this.props;
    const orderingOptions = this.getOrderingOptions();
    const orderingLabel = this.getOrderingLabel();

    return (
      <UsersContainer>
        <Title>Users</Title>
        <Toolbar>
          <SearchInput onSearch={this.updateParams.bind(this)} />

          <OrderingSelect>
            <div className={ cx('users-order', { active: this.state.openOrderingSelect }) }>
              <SecondaryButton className='users-order-button' onClick={() => this.toggleOrderingSelect()}>
                { orderingLabel }
              </SecondaryButton>

              <ul className='users-order-select'>
                {
                  orderingOptions.map(option => {
                    return (
                      <li key={option.key} onClick={() => this.updateParams('ordering', option.key)}>
                        {option.label}
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          </OrderingSelect>

          <RaisedButton size="medium" onClick={this.handleClickOpen}>
            Create User
          </RaisedButton>
        </Toolbar>

        <Paper>{this.getUsersTable()}</Paper>

        {this.getUserFormDialog()}
      </UsersContainer>
    );
  }
}

Users.propTypes = {
  usersActions: PropTypes.object,
  users: PropTypes.array
};

const mapStateToProps = state => {
  return {
    users: state.users
  };
};
const mapDispatchProps = dispatch => {
  return { usersActions: bindActionCreators(usersActions, dispatch) };
};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(Users);
