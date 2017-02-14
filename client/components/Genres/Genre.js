import React, { PropTypes } from 'react';
import Relay from 'react-relay';

export function Genre({ genre }) {
  return (
    <li className="list-group-item">
      {genre.name}
    </li>
  );
}

Genre.propTypes = {
  genre: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.string,
  }).isRequired,
};

const GenreContainer = Relay.createContainer(Genre, {
  fragments: {
    genre: () => Relay.QL`
      fragment on Genre {
        id,
        name
      }
    `,
  },
});

export default GenreContainer;
