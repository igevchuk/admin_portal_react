import React from 'react';
import propTypes from 'prop-types';
import { ListItem, ListItemText } from '@material-ui/core';
import { Link } from 'react-router-dom';

const drawerWith = 256;

export const NavLinks = [
  <ListItem key="contracts">
    <Link to="/contracts">
      <ListItemText primary="Contract Templates" />
    </Link>
  </ListItem>,

  <ListItem key="users">
    <Link to="/users">
      <ListItemText primary="Users" />
    </Link>
  </ListItem>,
];


export default NavLinks;