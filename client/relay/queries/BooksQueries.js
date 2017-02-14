import Relay from 'react-relay';

export default {
  books: () => Relay.QL`query { allBooks }`,
};
