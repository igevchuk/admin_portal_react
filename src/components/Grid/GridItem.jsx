import React from "react";
import Grid from "@material-ui/core/Grid";

function GridItem({ ...props }) {
  const { classes, children, ...rest } = props;

  return (
    <Grid item { ...rest }>
      { children }
    </Grid>
  );
}

export default GridItem;
