import React, { Component } from "react";
import _ from "lodash";
import styled from "styled-components";
import { TextField } from "@material-ui/core";
import Button from "@components/Button/Button";

const FormActions = styled.div`
  margin-top: 16px;
  clear: both;
  & button {
    margin: 8px;
  }
  & .users-form_actions_left {
    float: left;
    & button:first-child {
      margin-left: 0;
    }
  }
  & .users-form_actions_right {
    float: right;
    & button:last-child {
      margin-right: 0;
    }
  }
`;

const StyledTextField = styled(TextField)`
  & label,
  input {
    font-size: ${props => props.theme.baseFontSize};
  }
  color: ${props => props.theme.brandGray};
`;

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: null,
      disabled: false,
      isSubmitting: false
    };
    this.onCancel = this.onCancel.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    if (!!nextProps.user) {
      this.setState({
        formData: { ...nextProps.user }
      });
    }
  }

  componentWillUnmount() {
    this.setState({
      formData: null
    });
  }

  updateFormData(key, value) {
    this.setState({
      formData: { ...this.state.formData, [key]: value }
    });
  }

  onDelete(e) {
    e.preventDefault();

    this.props.deleteUser(this.props.user.url);

    this.props.closeDialog(true);
  }

  onCancel(e) {
    e.preventDefault();

    this.setState({
      formData: !!this.props.user ? this.props.user : null
    });

    this.props.closeDialog(false);
  }

  onSubmit(e) {
    e.preventDefault();

    const { user } = this.props;

    if (!!user) {
      this.props.onSave(this.state.formData, user.url);
    } else {
      this.props.onCreate(this.state.formData);
    }

    this.setState({
      formData: null
    });

    this.props.closeDialog(true);
  }

  render() {
    const { user } = this.props;
    const { formData } = this.state;

    console.log(this.props.saveErrors);

    return (
      <form className="user-form" autoComplete="off">
        <StyledTextField
          autoFocus
          margin="dense"
          id="username"
          label="Username*"
          type="text"
          value={!!formData && !!formData.username ? formData.username : ""}
          onChange={e => this.updateFormData("username", e.target.value)}
          fullWidth
        />

        <StyledTextField
          margin="dense"
          id="first_name"
          label="First Name"
          type="text"
          value={!!formData && !!formData.first_name ? formData.first_name : ""}
          onChange={e => this.updateFormData("first_name", e.target.value)}
          fullWidth
        />

        <StyledTextField
          margin="dense"
          id="last_name"
          label="Last Name"
          type="text"
          value={!!formData && !!formData.last_name ? formData.last_name : ""}
          onChange={e => this.updateFormData("last_name", e.target.value)}
          fullWidth
        />

        <StyledTextField
          margin="dense"
          id="email"
          label="Email*"
          type="email"
          value={!!formData && !!formData.email ? formData.email : ""}
          onChange={e => this.updateFormData("email", e.target.value)}
          fullWidth
        />

        {
          !user && (
            <StyledTextField
              margin="dense"
              id="password"
              label="Password*"
              type="password"
              value={!!formData && !!formData.password ? formData.password : ""}
              onChange={e => this.updateFormData("password", e.target.value)}
              fullWidth
            />
          )
        }

        <FormActions className="users-form_actions">
          {!!user && (
            <div className="users-form_actions_left">
              <Button color="secondary" onClick={this.onDelete}>
                DELETE USER
              </Button>
            </div>
          )}

          <div className="users-form_actions_right">
            <Button color="secondary" onClick={this.onCancel}>
              CANCEL
            </Button>

            <Button color="secondary" onClick={this.onSubmit}>
              {!!this.props.user ? "UPDATE" : "SAVE"}
            </Button>
          </div>
        </FormActions>
      </form>
    );
  }
}

export default UserForm;
