import React, { Component } from "react";
import faker from "faker";
import styled, { extend } from "styled-components";
import { Paper } from "@material-ui/core";
import Container from "@components/Container/Container";
import Table from "@components/Table/Table";
import { RaisedButton } from "@components/Button/Button";
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

class Users extends Component {
  constructor(props) {
    super(props);

    this.state = {
      userList: [],
      filter: null,
      sort: "name",
      searchQuery: "",
      user: null
    };
    this.handleClickOpen = this.handleClickOpen.bind(this);
    this.handleClickClose = this.handleClickClose.bind(this);
  }

  componentDidMount() {
    Promise.resolve(this.getUsers()).then(res => {
      this.setState({
        userList: res
      });
    });
  }

  getUsers() {
    let data = [];

    for (let i = 0; i <= Math.random() * 500; i++) {
      data.push([
        faker.name.findName(),
        faker.internet.email(),
        faker.name.title()
      ]);
    }

    return data;
  }

  setListOption(key, value) {
    this.setState({ [key]: value });
  }

  filterUsers() {
    this.setState({
      userList: userList.filter(user => user[filter] === this.state.filter)
    });
  }

  sortusers() {}

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
    const { user } = this.state;
    return (
      <UsersContainer>
        <Title>Users</Title>
        <Toolbar>
          <SearchInput />

          <RaisedButton size="medium" onClick={this.handleClickOpen}>
            Create User
          </RaisedButton>
        </Toolbar>

        <Paper>
          <Table
            tableCols={["Name", "Email", "Role"]}
            tableData={this.state.userList}
          />
        </Paper>

        {this.getUserFormDialog()}
      </UsersContainer>
    );
  }
}

export default Users;
