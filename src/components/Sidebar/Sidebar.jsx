import React from 'react';
import propTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import { NavLink } from 'react-router-dom';

import './Sidebar.scss';
import sidebarStyle from '@jss/components/sidebarStyle';

const Sidebar = ({ ...props }) => {
  function activeRoute(routeName) {
    return !!~props.location.pathname.indexOf(routeName);
  }

  const { classes, routes } = props;
  const links = (
    <List className={ classes.root }>
      { routes.map((prop, key) => {
        if (prop.redirect) 
          return null;
        
        let iconSrc = activeRoute(prop.path) ? prop.activeIcon : prop.icon;
        return (
          <NavLink
            to={ prop.path }
            className={ classes.item }
            activeClassName="active"
            key={ key }
          >
            <ListItem button>
              <ListItemIcon className={ classes.itemIcon }>
                <img src={ iconSrc } />
              </ListItemIcon>

              <ListItemText
                className={ classes.itemText }
                disableTypography={ true }
              >
                { prop.label }
              </ListItemText>
            </ListItem>
          </NavLink>
        );
      }) }
    </List>
  );

  return (
    <div>
      <Drawer
          anchor="left"
          variant="permanent"
          open
          classes={{
            paper: classes.drawerPaper
          }}
        >
          <div className={ classes }>{ links }</div>
        </Drawer>
    </div>
  );
};


Sidebar.propTypes = {
  classes: propTypes.object.isRequired
};

export default withStyles(sidebarStyle)(Sidebar);
