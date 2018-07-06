import React, { Component } from "react";
import propTypes from "prop-types";
import Waypoint from "react-waypoint";

const withScrollPaginator = Component =>
  class ScrollPaginator extends Component {
    constructor(props) {
      super(props);

      this.state = {
        loading: false
      };
    }
    loadMoreItems() {
      console.log(427687)
      this.setState({
        loading: true
      });
    }

    render() {
      return (
        <div className="pagination">
          [
            <Component {...this.props} />,
            <Waypoint onEnter={() => this.loadMoreItems} />
          ]
        </div>
      );
    }
  };

export default ScrollPaginator;
