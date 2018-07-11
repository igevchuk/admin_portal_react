import React, { Component } from "react";
import styled from "styled-components";
import { TextField, InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";

const StyledTextField = styled(TextField)`
  & > div {
    align-items: center;
  }
  input {
    font-size: ${props => props.theme.baseFontSize};
    color: ${props => props.theme.brandGray};
    font-weight: ${props => props.theme.fontWeight};
  }
  & .search-input_andornment {
    color: ${props => props.theme.brandGray};
    font-size: 12px;
    & svg {
      font-size: 20px;
    }
  }
`;

export default class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let query = e.target.value;

    this.setState({ query });
    this.props.onSearch("search", query);
  }

  render() {
    return (
      <StyledTextField
        className="search-input"
        value={this.state.query}
        onChange={this.handleChange}
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment
              position="start"
              className="search-input_andornment"
            >
              <Search />
            </InputAdornment>
          )
        }}
      />
    );
  }
}
