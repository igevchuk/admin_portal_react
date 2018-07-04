import React, { Component } from "react";
import { TextField, InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ''
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    let query = e.target.value;

    this.setState({ query });
    this.props.onSearch('search', query);
  }

  render() {
    return ( 
      <TextField
        value={ this.state.query }
        onChange={ this.handleChange }
        placeholder="Search..."
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search />
            </InputAdornment>
          )
        }}
      />
    )
  }
}

export default SearchInput;