import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import './Book.css';
import AuthorLabelsContainer from '../Authors/AuthorLabels';
import GenreLabelsContainer from '../Genres/GenreLabels';


export function Book({ book }) {
  return (
    <div className="card card-outline-primary">
      <div className="card-block">
        <h4 className="card-title text-center">{book.title}</h4>
        <hr />
        <p className="card-text">{book.summary}</p>
      </div>
      <div className="card-footer text-muted">
        <AuthorLabelsContainer authors={book.authors} />
        <hr />
        <GenreLabelsContainer genres={book.genres} />
      </div>
    </div>
  );
}

Book.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string,
    authors: PropTypes.object,
    genres: PropTypes.object,
  }).isRequired,
};

const BookContainer = Relay.createContainer(Book, {
  fragments: {
    book: () => Relay.QL`
      fragment on Book {
        id,
        title,
        summary,
        authors(first: 5) {
          ${AuthorLabelsContainer.getFragment('authors')}
        }
        genres(first: 5) {
          ${GenreLabelsContainer.getFragment('genres')}
        }
      }
    `,
  },
});

export default BookContainer;
