import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import BookContainer from './Book';
import ResourceContainer from '../Common/ResourceContainer';

export function BooksList(props) {
  return (
    <ResourceContainer title="Books">
      <div className="row">
        {props.books.edges.map(({ node }) => (
          <div className="col-sm-12 col-md-8 offset-md-2 offset-lg-0 col-lg-4 book-card" key={node.__dataID__}>
            <BookContainer book={node} />
          </div>
        ))}
      </div>
    </ResourceContainer>
  );
}

BooksList.propTypes = {
  books: PropTypes.shape({
    edges: PropTypes.array,
  }).isRequired,
};

const BooksListContainer = Relay.createContainer(BooksList, {
  fragments: {
    books: () => Relay.QL`
      fragment on BookConnection {
        edges {
          node {
            ${BookContainer.getFragment('book')}
          }
        }
      }
    `,
  },
});

export default BooksListContainer;
