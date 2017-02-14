import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import GenreContainer from './Genre';

export function GenresList(props) {
  return (
    <div className="col-sm-12">
      <h2 className="text-center section-heading">
        <span className="section-heading-underline">Genres</span>
      </h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card resource-container">
            <ul className="list-group list-group-flush text-center">
              {props.genres.edges.map(({ node }) => (
                <GenreContainer genre={node} key={node.__dataID__} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

GenresList.propTypes = {
  genres: PropTypes.shape({
    edges: PropTypes.array,
  }).isRequired,
};

const GenresListContainer = Relay.createContainer(GenresList, {
  fragments: {
    genres: () => Relay.QL`
      fragment on GenreConnection {
        edges {
          node {
            ${GenreContainer.getFragment('genre')}
          }
        }
      }
    `,
  },
});

export default GenresListContainer;
