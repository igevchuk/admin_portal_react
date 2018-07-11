import React from "react";
import propTypes from "prop-types";
import styled from "styled-components";
import classes from "classnames";

const Button = styled.button`
  padding: 8px 16px;
  min-height: 36px;
  min-width: 88px;
  border-radius: 3px;
  text-align: center;
  font-size: ${props => props.theme.baseFontSize};
  font-weight: ${props => props.theme.fontLight};
  box-shadow: ${props => props.theme.buttonBoxShadow};
  border: none;
  cursor: pointer;
  &:focus {
    outline: none;
  }
  &.primary-btn {
    background: ${props => props.theme.primaryButton};
    color: #FFFFFF;
  }
  &.secondary-btn {
    background: ${props => props.theme.secondaryButton};
    color: ${props => props.theme.baseFontColor}
  }
`;

export default ({ ...props }) => {
  function getClassName(color) {
    switch (color) {
      case "primary":
        return "primary-btn";
      case "secondary":
        return "secondary-btn";
      default:
        return "primary-btn";
    }
  }

  return (
    <Button {...props} className={classes(["btn", getClassName(props.color), props.className])}>
      {props.children}
    </Button>
  );
};

Button.propTypes = {
  children: propTypes.oneOfType([propTypes.element, propTypes.string]),
  color: propTypes.string,
  className: propTypes.string
};
