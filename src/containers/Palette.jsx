import React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

const Palette = (props) => {
  const theme = createMuiTheme({
    palette: {
      primary: { main: props.primary }, 
      secondary: { main: props.secondary } 
    }
  });

  return (
    <MuiThemeProvider theme={ theme }>
      <React.Fragment>
        { props.children }
      </React.Fragment>
    </MuiThemeProvider>
  );
}

export default Palette;
