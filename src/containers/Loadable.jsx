import React, { Component } from 'react';
import Loadable from "react-loadable";

import Loading from "@components/Loading";

const LoadableHOC = ComponentToLoad => {
  // const LoadableComponent = props =>
  //   Loadable({ loader: () => <ComponentToLoad {...props} />, loading: Loading });

  // return LoadableComponent;

  return class extends Component {
    render() {
      return Loadable({ loader: () => ComponentToLoad, loading: Loading });
    }
  }
};


export default LoadableHOC;