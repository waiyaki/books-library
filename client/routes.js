import React from 'react';
import { Router, Route, browserHistory, IndexRoute, applyRouterMiddleware } from 'react-router';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';

import App from './App';
import Home from './components/Home';
import BooksList from './components/BooksList';

import BooksQueries from './relay/queries/BooksQueries';

export default () => (
  <Router
    history={browserHistory}
    environment={Relay.Store}
    render={applyRouterMiddleware(useRelay)}
  >
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="/books" component={BooksList} queries={BooksQueries} />
    </Route>
  </Router>
);
