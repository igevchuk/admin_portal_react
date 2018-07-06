import React from "react";
import styled from "styled-components";
import cx from "classnames";
import { Drawer } from "@material-ui/core";

const List = styled.ul`
  padding: 8px 0;
  margin-top: 56px;
  list-style: none;
  & > li {
    padding: 12px 24px;
    background: #ffffff;
    transition: background 250ms cubic-bezier(0.4, 0, 0.2, 1) 0ms;
    &:hover {
      background: rgba(0, 0, 0, 0.08);
    }
    & a {
      clear: both;
      text-decoration: none;
    }
    & img {
      height: 32px;
      width: auto;
      float: left;
      text-align: center;
      vertical-align: center;
    }
    & span {
      font-size: ${props => props.theme.baseFontSize};
      color: ${props => props.theme.brandGrey};
      padding: 0 16px;
      font-weight: ${props => props.theme.fontLight};
      line-height: 30px;
      font-family: ${props => props.theme.fontSans};
      margin: 0;
    }
  }
  & > li.active {
    span {
      color: ${props => props.theme.brandGreen};
    }
  }
`;

const Sidebar = ({ ...props }) => {
  function activeRoute(routeName) {
    return !!~props.location.pathname.indexOf(routeName);
  }

  const { routes } = props;
  const links = (
    <List className="sidebar">
      {routes.map((prop, key) => {
        if (prop.redirect) return null;

        let iconSrc = activeRoute(prop.path) ? prop.activeIcon : prop.icon;
        return (
          <li className={cx({ active: activeRoute(prop.path) })} key={key}>
            <a href={prop.path}>
              <img src={iconSrc} />

              <span>{prop.label}</span>
            </a>
          </li>
        );
      })}
    </List>
  );

  return (
    <div>
      <Drawer anchor="left" variant="permanent" open>
        <div>{links}</div>
      </Drawer>
    </div>
  );
};

export default Sidebar;
