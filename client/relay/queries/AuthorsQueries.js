import Relay from 'react-relay';

export default {
  authors: () => Relay.QL`query { allAuthors }`,
};
