import React from 'react';
import Relay from 'react-relay';

import BooksListContainer from '../Books/BooksList';
import GenreLabelsContainer from '../Genres/GenreLabels';
import ResourceContainer from '../Common/ResourceContainer';

export function AuthorDetails({ author, books, genres }) {
  return (
    <span>
      <div className="col-sm-12 col-md-8 offset-md-2">
        <div className="card">
          <div className="card-block">
            <ResourceContainer title={author.name}>
              <p className="lead text-center">
                {author.bio || 'Author bio would go here....'}
              </p>
            </ResourceContainer>
            <hr />
            <div className="row">
              <ResourceContainer size="mid" title="Prolific Genres" >
                <GenreLabelsContainer genres={genres} labelsClass="text-center" />
              </ResourceContainer>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <BooksListContainer books={books} />
    </span>
  );
}

const AuthorDetailsContainer = Relay.createContainer(AuthorDetails, {
  fragments: {
    author: () => Relay.QL`
      fragment on Author {
        id,
        name,
      }
    `,
    books: () => Relay.QL`
      fragment on BookConnection {
        ${BooksListContainer.getFragment('books')}
      }
    `,
    genres: () => Relay.QL`
      fragment on GenreConnection {
        ${GenreLabelsContainer.getFragment('genres')}
      }
    `,
  },
});

export default AuthorDetailsContainer;
