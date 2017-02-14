import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import './Book.css';

export function Book({ book }) {
  return (
    <div className="card card-outline-primary">
      <div className="card-block">
        <h4 className="card-title text-center">{book.title}</h4>
        <hr />
        <p className="card-text">{book.summary}</p>
      </div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    authors: PropTypes.array,
    genres: PropTypes.array,
  }).isRequired,
};
export default Relay.createContainer(Book, {
  fragments: {
    book: () => Relay.QL`
      fragment on Book {
        id,
        title,
        summary
      }
    `,
  },
});
