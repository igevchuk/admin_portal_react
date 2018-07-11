import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as usersActions from "@actions/usersActions";
import * as userActions from "@actions/userActions";

import propTypes from "prop-types";
import styled from "styled-components";
import _ from "lodash";
import cx from "classnames";
import { Paper } from "@material-ui/core";
import Container from "@components/Container/Container";
import UsersList from "./components/list/UsersList";
import Button from "@components/Button/Button";
import SearchInput from "./components/search/SearchInput";
import Dialog from "@components/Dialog/Dialog";
import UserForm from "./components/form/UserForm";
import Loading from "@components/Loading";
import Waypoint from "react-waypoint";
import queryString from "query-string";
import EscapeOutside from "@containers/EscapeOutside";

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

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      users: [],
      listParams: {},
      loading: false,
      openSelect: false,
      openDialog: false
    };

    this.saveUser = this.saveUser.bind(this);
    this.createUser = this.createUser.bind(this);
    this.closeDialog = this.closeDialog.bind(this);
  }

  componentDidMount() {
    this.fetchUsers();
  }

  getListParams() {
    const { listParams } = this.state;
    let newParams = {};

    Object.keys(listParams).forEach(key => {
      if (!_.isEmpty(listParams[key])) {
        newParams[key] = listParams[key];
      }
    });

    return newParams;
  }

  fetchUsers() {
    const listParams = this.getListParams();

    this.props.fetchUsers(listParams);
  }

  updateListParams(key, value) {
    let { listParams, users } = this.state;

    if (!listParams[key] || listParams[key] !== value) {
      if (key !== "page") {
        listParams = { ...listParams, page: undefined };
      }

      this.setState(
        {
          loading: true,
          listParams: { ...listParams, [key]: value }
        },
        () => {
          this.fetchUsers();
          this.setState({
            loading: false
          });
        }
      );
    }
  }

  getDirection() {
    const { listParams } = this.state;

    return !!listParams &&
      !!listParams.ordering &&
      listParams.ordering.charAt(0) === "-"
      ? "asc"
      : "desc";
  }

  getName(user) {
    let name = "";

    if (!!user) {
      name = `${user.first_name} ${user.last_name}`;
    }

    return name;
  }

  getGroups(user) {
    if (!!user && !!user.group_names && user.group_names.length)
      return user.group_names.join(", ");

    return "";
  }

  getTableCols() {
    return [
      { key: "name", label: "Name" },
      { key: "email", label: "Email" },
      { key: "groups", label: "Groups" }
    ];
  }

  getTableData(data) {
    return data.reduce((accum, current) => {
      accum.push({
        ...current,
        id: current.url,
        groups: this.getGroups(current)
      });

      return accum;
    }, []);
  }

  getDialogTitle() {
    const { user } = this.props;
    return !!user ? `Edit User: ${this.getName(user)}` : `Create New User`;
  }

  onPaginate() {
    const { pagination } = this.props;
    if (!!pagination.next) {
      const parsedNextPageUrl = queryString.parseUrl(pagination.next);
      this.updateListParams("page", parsedNextPageUrl.query.page || 1);
    }
  }

  getUserDetail(url = null) {
    if (!!url) {
      this.props.fetchUser(url);
      if (!this.props.userIsLoading) {
        this.dialog.handleOpen();
      }
    } else {
      this.dialog.handleOpen();
    }
  }

  closeDialog(reload = false) {
    this.dialog.handleClose();
    // this.props.userActions.resetUser();
    if (reload) {
      this.fetchUsers();
    }
  }

  renderUsersList() {
    const { pagination, users } = this.props;

    if (this.state.loading) {
      return <Loading />;
    }

    if (!!users && Array.isArray(users) && users.length) {
      const waypointComponent =
        !!pagination && !!pagination.next ? (
          <Waypoint
            className="users-list_waypoint"
            onEnter={this.onPaginate.bind(this)}
            key="waypoint"
          >
            <Loading />
          </Waypoint>
        ) : null;

      return [
        <UsersList
          className="users-list"
          data={this.getTableData(users)}
          onUserClick={this.getUserDetail.bind(this)}
          orderBy={this.state.listParams.ordering}
          onSort={this.updateListParams.bind(this)}
          direction={this.getDirection()}
          key="userList"
        />,
        waypointComponent
      ];
    }

    return null;
  }

  saveUser(formData, url) {
    this.props.saveUser(formData, url);
  }

  createUser(formData) {
    this.props.userActions.createUser(formData);
  }

  getUserFormDialog() {
    return (
      <Dialog
        className="users-user_dialog"
        ref={dialog => (this.dialog = dialog)}
        dialogTitle={this.getDialogTitle()}
      >
        <UserForm
          className="users-user_dialog_form"
          closeDialog={this.closeDialog}
          onSave={this.saveUser}
          onCreate={this.createUser}
          user={this.props.user}
          error={this.props.userErrors}
          saveErrors={this.props.saveUserErrors}
        />
      </Dialog>
    );
  }

  render() {
    return (
      <UsersContainer className="users">
        <Title className="users-heading">Users</Title>
        <Toolbar className="users-toolbar">
          <SearchInput
            className="users-toolbar_search"
            onSearch={this.updateListParams.bind(this)}
          />

          <Button
            className="users-toolbar_create"
            color="primary"
            onClick={() => this.getUserDetail()}
          >
            CREATE USER
          </Button>
        </Toolbar>

        <Paper>{this.renderUsersList()}</Paper>

        {this.getUserFormDialog()}
      </UsersContainer>
    );
  }
}

Users.propTypes = {
  usersActions: propTypes.object,
  users: propTypes.array,
  user: propTypes.object,
  pagination: propTypes.object
};

const mapStateToProps = ({ usersData, ...rest }) => {
  const { list, pagination } = usersData;
  const { user, userIsLoading, userErrors, saveUserErrors } = rest;
  return {
    users: list,
    pagination,
    user,
    userIsLoading,
    userErrors,
    saveUserErrors
  };
};
const mapDispatchProps = dispatch => {
  return {
    fetchUsers: params => dispatch(usersActions.fetchUsers(params)),
    fetchUser: url => dispatch(userActions.fetchUser(url)),
    saveUser: (data, url) => dispatch(userActions.saveUser(data, url))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(Users);
