import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import reducers from './reducers';
import routes from '@routes/dashboard';

import './index.css';
import registerServiceWorker from './registerServiceWorker';

import App from './layouts/App';

const createStoreWithMiddleware = applyMiddleware(
  reduxThunk
)(createStore);

ReactDOM.render(
    <Router>
      <Route path="/" component={ App } />
    </Router>,
document.getElementById('root'));
registerServiceWorker();

