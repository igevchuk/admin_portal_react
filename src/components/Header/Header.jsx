import React from 'react';
import propTypes from 'prop-types';
import cx from 'classnames';
import { withStyles } from '@material-ui/core/styles';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from "@material-ui/core/Toolbar";
import Button from '@material-ui/core/Button';
import headerStyle from '@jss/components/headerStyle';

const Header = (props) => {
  const { classes, color } = props;
  const appBarClasses = cx({
    [" " + classes[color]]: color
  });

  return (
    <AppBar className={ classes.appBar + appBarClasses }>
        <Toolbar className={classes.container}>
          <div className={classes.flex}>
            <Button color="inherit" href="#" className={classes.title}>
              Header
            </Button>
          </div>
        </Toolbar>
    </AppBar>
  );
}

Header.propTypes = {
  classes: propTypes.object.isRequired
};

export default withStyles(headerStyle)(Header);