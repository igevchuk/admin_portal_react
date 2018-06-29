import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons

// core components
import cardHeaderStyle from "./cardHeaderStyle.jsx";

function CardHeader({ ...props }) {
  const {
    classes,
    className,
    children,
    plain,
    stats,
    ...rest
  } = props;
  const cardHeaderClasses = classNames({
    [classes.cardHeader]: true,
    [classes.cardHeaderPlain]: plain,
    [classes.cardHeaderStats]: stats,
    [className]: className !== undefined
  });
  return (
    <div className={cardHeaderClasses} {...rest}>
      {children}
    </div>
  );
}

CardHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  plain: PropTypes.bool,
  stats: PropTypes.bool
};

export default withStyles(cardHeaderStyle)(CardHeader);
