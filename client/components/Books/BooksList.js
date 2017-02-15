import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import BookContainer from './Book';
import ResourceContainer from '../Common/ResourceContainer';

export function BooksList(props) {
  return (
    <ResourceContainer heading="Books">
      <div className="card-columns">
        {props.books.edges.map(({ node }) => (
          <BookContainer book={node} key={node.__dataID__} />
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
