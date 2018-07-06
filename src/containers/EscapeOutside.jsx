import React, { Component } from "react";
import ReactDOM from 'react-dom';
import PropTypes from "prop-types";
import styled from "styled-components";
import cx from "classnames";

const Wrapper = styled.div`
   {
    display: none;
    position: relative;
    &.active {
      display: block;
    }
  }
`;

class EscapeOutside extends Component {
  constructor() {
    super();

    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount() {
    document.addEventListener("mousedown", this.handleClickOutside, false);
  }
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside, false);
  }
  handleClickOutside(event) {
    let wrapperNode = ReactDOM.findDOMNode(this.wrapper);

    if (this.props.open && wrapperNode && !wrapperNode.contains(event.target)) {
      this.props.onClickOutside();
    }
  }
  render() {
    return (
      <Wrapper
        className={cx("escape-outside", {
          active: this.props.open
        })}
        ref={node => (this.wrapper = node)}
      >
        {this.props.children}
      </Wrapper>
    );
  }
}

EscapeOutside.propTypes = { children: PropTypes.element.isRequired };

export default EscapeOutside;
