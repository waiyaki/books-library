import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import Book from './Book';

export function BooksList(props) {
  return (
    <div className="col-sm-12">
      <div className="card-columns resource-container">
        {props.books.edges.map(({ node }) => (
          <Book book={node} key={node.__dataID__} />
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

export default Relay.createContainer(BooksList, {
  fragments: {
    books: () => Relay.QL`
      fragment on BookConnection {
        edges {
          node {
            ${Book.getFragment('book')}
          }
        }
      }
    `,
  },
});
