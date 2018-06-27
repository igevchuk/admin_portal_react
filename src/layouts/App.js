import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import withStyles from "@material-ui/core/styles/withStyles";

import Header from '@components/Header/Header';
import Sidebar from '@components/Sidebar/Sidebar';

import dashboardRoutes from '@routes/dashboard';

const switchRoutes = (
  <Switch>
      {
        dashboardRoutes.map((prop, key) => {
          return (
              <Route 
                exact={ prop.exact }
                path={ prop.path } 
                component={ prop.component } 
                key={ key } 
              />
          )
        })
      }
    </Switch>
);

class App extends Component {
  render() {
    return (
      <div>
        <Header />

        <Sidebar routes={ dashboardRoutes } location={ this.props.location } />

        <div className="main">
          { switchRoutes }
        </div>

      </div>
    );
  }
};

export default App;