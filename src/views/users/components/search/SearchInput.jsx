import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { TextField, InputAdornment } from "@material-ui/core";
import { Search } from "@material-ui/icons";

class SearchInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({
      query: e.target.value
    });
  }

  render() {
    return ( 
      <TextField
        value={ this.state.query }
        onChange={ this.handleChange }
        placeholder="Search..."
        margin="normal"
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