import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as usersActions from "@actions/usersActions";
import * as userActions from "@actions/userActions";

import PropTypes from "prop-types";
import styled from "styled-components";
import _ from "lodash";
import cx from "classnames";
import {
  Paper,
  InputLabel,
  Select,
  Input,
  MenuItem,
  FormControl
} from "@material-ui/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Container from "@components/Container/Container";
import UsersList from "./components/list/UsersList";
import { RaisedButton, SecondaryButton } from "@components/Button/Button";
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
const OrderingSelect = styled.div`
  & .users-order {
    display: flex;
    align-items: center;
    position: relative;
    min-width: 200px;
    font-size: 12px;
    color: ${props => props.theme.brandGrey};
    .users-order-label {
      padding: 8px 12px;
    }
    .users-order-button {
      display: block;
      min-width: 160px;
      text-align: left;
    }
  }
  & ul {
    display: none;
    position: absolute;
    top: 10px;
    right: 0;
    padding: 8px 0;
    list-style: none;
    z-index: 10;
    background: white;
    width: 160px;
    box-shadow: ${props => props.theme.baseBoxShadow};
    & > li {
      padding: 12px 16px;
      cursor: pointer;
      background: white;
      transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
      &:hover {
        background: rgba(0, 0, 0, 0.08);
      }
    }
  }

  & .active {
    & ul {
      display: block;
    }
  }
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
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
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

    this.props.usersActions.fetchUsers(listParams);
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
    const { ordering } = this.state.listParams;
    let label = "Select an option";

    if (!!ordering) {
      label = this.getOrderingOptions().find(option => option.key === ordering)
        .label;
    }

    return label;
  }

  toggleOrderingSelect(selected = null) {
    this.setState({
      openOrderingSelect: !this.state.openOrderingSelect
    });

    if (!!selected) {
      this.updateListParams("ordering", selected);
    }
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
        id: current.url,
        name: this.getName(current),
        email: current.email,
        groups: this.getGroups(current)
      });

      return accum;
    }, []);
  }

  handleClickOpen() {
    this.dialog.handleOpen();
  }

  handleClickClose(e) {
    e.preventDefault();

    this.dialog.handleClose();
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

  getUserDetail(id = null) {
    if (!!id) {
      this.props.userActions.fetchUser(id);
    }
    this.setState({
      openDialog: true
    });
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
          cols={this.getTableCols()}
          data={this.getTableData(users)}
          onUserClick={this.getUserDetail.bind(this)}
          key="userList"
        />,
        waypointComponent
      ];
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
        <UserForm handleClose={this.handleClickClose} user={this.props.user}/>
      </Dialog>
    );
  }

  render() {
    const orderingOptions = this.getOrderingOptions();
    const orderingLabel = this.getOrderingLabel();

    return <UsersContainer>
        <Title>Users</Title>
        <Toolbar>
          <SearchInput onSearch={this.updateListParams.bind(this)} />

          <OrderingSelect>
            <div className={cx("users-order", {
                active: this.state.openOrderingSelect
              })}>
              <span className="users-order-label">Sort by:</span>
              <SecondaryButton className="users-order-button" onClick={() => this.toggleOrderingSelect()}>
                {orderingLabel}
              </SecondaryButton>

              <EscapeOutside open={this.state.openOrderingSelect} onClickOutside={this.toggleOrderingSelect.bind(this)}>
                <ul className="users-order-select">
                  {orderingOptions.map(option => {
                    return <li key={option.key} onClick={() => this.toggleOrderingSelect(option.key)}>
                        {option.label}
                      </li>;
                  })}
                </ul>
              </EscapeOutside>
            </div>
          </OrderingSelect>

          <RaisedButton size="medium" onClick={this.getUserDetail.bind(this)}>
            Create User
          </RaisedButton>
        </Toolbar>

        <Paper>{this.renderUsersList()}</Paper>

        {this.getUserFormDialog()}
      </UsersContainer>;
  }
}

Users.propTypes = {
  usersActions: PropTypes.object,
  users: PropTypes.array,
  user: PropTypes.object,
  pagination: PropTypes.object
};

const mapStateToProps = ({ usersData, user }) => {
  const { list, pagination } = usersData;
  return {
    users: list,
    pagination,
    user
  };
};
const mapDispatchProps = dispatch => {
  return {
    usersActions: bindActionCreators(usersActions, dispatch),
    userActions: bindActionCreators(userActions, dispatch)};
};

export default connect(
  mapStateToProps,
  mapDispatchProps
)(Users);
