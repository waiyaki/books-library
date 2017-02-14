import Relay from 'react-relay';

export default {
  genres: () => Relay.QL`query { allGenres }`,
};
