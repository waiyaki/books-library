import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import './Book.css';
import AuthorLabelsContainer from '../Authors/AuthorLabels';
import GenreLabelsContainer from '../Genres/GenreLabels';
import ResourceLink from '../Common/ResourceLink';

export const RenderLabels = ({ children: Labels, labelName }) => (
  <div className="row">
    <div className="col-sm-3">{`${labelName}:`}</div>
    <div className="col-sm-9">{ Labels }</div>
  </div>
);

export function Book({ book }) {
  return (
    <div className="card card-outline-primary">
      <div className="card-block">
        <ResourceLink to={`/books/${book.id}`}>
          <h4 className="card-title text-center">{book.title}</h4>
        </ResourceLink>
        <hr />
        <p className="card-text">{book.summary}</p>
      </div>
      <div className="card-footer text-muted">
        <RenderLabels labelName="Authors">
          <AuthorLabelsContainer authors={book.authors} />
        </RenderLabels>
        <hr />
        <RenderLabels labelName="Genres">
          <GenreLabelsContainer genres={book.genres} />
        </RenderLabels>
      </div>
    </div>
  );
}

RenderLabels.propTypes = {
  children: PropTypes.node.isRequired,
  labelName: PropTypes.string.isRequired,
};

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
