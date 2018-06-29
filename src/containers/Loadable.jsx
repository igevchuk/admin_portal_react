import React, { Component } from 'react';
import Loadable from "react-loadable";

import Loading from "@components/Loading";

const LoadableHOC = ComponentToLoad => {

  return class extends Component {
    render() {
      return Loadable({ loader: () => ComponentToLoad, loading: Loading });
    }
  }
};


export default LoadableHOC;