import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import GenreContainer from './Genre';
import ResourceContainer from '../Common/ResourceContainer';

export function GenresList(props) {
  return (
    <ResourceContainer title="Genres">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <ul className="list-group list-group-flush text-center">
              {props.genres.edges.map(({ node }) => (
                <GenreContainer genre={node} key={node.__dataID__} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ResourceContainer>
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
