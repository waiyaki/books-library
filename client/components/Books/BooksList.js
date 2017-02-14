import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import BookContainer from './Book';

export function BooksList(props) {
  return (
    <div className="col-sm-12">
      <h2 className="text-center section-heading">
        <span className="section-heading-underline">Books</span>
      </h2>
      <div className="card-columns resource-container">
        {props.books.edges.map(({ node }) => (
          <BookContainer book={node} key={node.__dataID__} />
        ))}
      </div>
    </div>
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
