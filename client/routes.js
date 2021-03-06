import React from 'react';
import { Router, Route, browserHistory, IndexRoute, applyRouterMiddleware } from 'react-router';
import Relay from 'react-relay';
import useRelay from 'react-router-relay';

import App from './App';
import Home from './components/Home';
import BooksListContainer from './components/Books/BooksList';
import BookDetailsContainer from './components/Books/BookDetails';
import AuthorListContainer from './components/Authors/AuthorsList';
import AuthorDetailsContainer from './components/Authors/AuthorDetails';
import GenreListContainer from './components/Genres/GenresList';

import { BooksQueries, BookQueries } from './relay/queries/BooksQueries';
import { AuthorsQueries, AuthorQueries } from './relay/queries/AuthorsQueries';
import GenreQueries from './relay/queries/GenreQueries';

export default () => (
  <Router
    history={browserHistory}
    environment={Relay.Store}
    render={applyRouterMiddleware(useRelay)}
  >
    <Route path="/" component={App}>
      <IndexRoute component={Home} />
      <Route path="books">
        <IndexRoute component={BooksListContainer} queries={BooksQueries} />
        <Route path=":bookId" component={BookDetailsContainer} queries={BookQueries} />
      </Route>
      <Route path="authors">
        <IndexRoute component={AuthorListContainer} queries={AuthorsQueries} />
        <Route path=":authorId" component={AuthorDetailsContainer} queries={AuthorQueries} />
      </Route>
      <Route path="genres">
        <IndexRoute component={GenreListContainer} queries={GenreQueries} />
      </Route>
    </Route>
  </Router>
);
