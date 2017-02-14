import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import Labels from '../Common/Labels';

export function GenreLabels({ genres }) {
  const genreItems = genres.edges.map(({ node }) => node);

  return (
    <Labels
      items={genreItems}
      labelName={{
        singular: 'Genre',
        plural: 'Genres',
      }}
    />
  );
}

GenreLabels.propTypes = {
  genres: PropTypes.shape({
    edges: PropTypes.array,
  }).isRequired,
};

const GenreLabelsContainer = Relay.createContainer(GenreLabels, {
  fragments: {
    genres: () => Relay.QL`
      fragment on GenreConnection {
        edges {
          node {
            id,
            name
          }
        }
      }
    `,
  },
});

export default GenreLabelsContainer;
