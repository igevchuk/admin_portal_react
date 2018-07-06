import React, { Component } from "react";
import _ from "lodash";
import styled from "styled-components";
import {
  FormControl,
  TextField,
  Select,
  InputLabel,
  MenuItem
} from "@material-ui/core";
import { SecondaryButton } from "@components/Button/Button";

const StyledFormControl = styled(FormControl)`
  &&& {
    display: block;
  }
`;
const StyledSelect = styled(Select)`
  width: 100%;
`;
const FormActions = styled.div`
  margin-top: 16px;
  clear: both;
`;
const StyledSecondaryButton = styled(SecondaryButton)`
  float: right;
  margin: 8px;
  &:last-child {
    margin-right: 0;
  }
`;

const StyledTextField = styled(TextField)`
  & label,
  input {
    font-size: ${props => props.theme.baseFontSize};
  }
  color: ${props => props.theme.brandGrey};
`;

class UserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      formData: {
        name: "",
        email: "",
        groups: [],
        products: []
      }
    };
  }

  updateFormData(key, value) {
    this.setState(_.set(this.state[key], value));
  }

  render() {
    const { user } = this.props;

    return (
      <form className="user-form" autoComplete="off">
        <StyledTextField
          autoFocus
          margin="dense"
          id="first_name"
          label="First Name"
          type="text"
          value={!!user && !!user.first_name ? user.first_name : ""}
          onChange={e => this.updateFormData("first_name", e.target.value)}
          fullWidth
        />

        <StyledTextField
          autoFocus
          margin="dense"
          id="last_name"
          label="Last Name"
          type="text"
          value={!!user && !!user.last_name ? user.last_name : ""}
          onChange={e => this.updateFormData("last_name", e.target.value)}
          fullWidth
        />

        <StyledTextField
          autoFocus
          margin="dense"
          id="name"
          label="Email"
          type="email"
          value={!!user && !!user.email ? user.email : ""}
          onChange={e => this.updateFormData("email", e.target.value)}
          fullWidth
        />

        {/* <StyledFormControl className="user-form_control">
          <InputLabel htmlFor="user-role">Role</InputLabel>
          <StyledSelect
            value="Admin"
            inputProps={{ name: "role", id: "user-role" }}
            onChange={e => this.updateFormData('groups', e.target.value)}

          >
            <MenuItem value="Admin">
              <em>Admin</em>
            </MenuItem>
            <MenuItem value="Editor">Editor</MenuItem>
          </StyledSelect>
        </StyledFormControl> */}

        {/* {!!user && (
          <SecondaryButton
            onClick={this.handleClose}
            color="secondary"
            onClick={this.props.deleteUser}
          >
            Delete User
          </SecondaryButton>
        )} */}

        <FormActions>
          <StyledSecondaryButton onClick={e => this.props.handleCloe}>
            {!!user ? "Update" : "Save"}
          </StyledSecondaryButton>

          <StyledSecondaryButton onClick={e => this.props.handleClose}>
            Cancel
          </StyledSecondaryButton>
        </FormActions>
      </form>
    );
  }
}

export default UserForm;
