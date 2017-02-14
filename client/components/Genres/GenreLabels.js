import Relay from 'react-relay';

import createLabelContainerFor from '../Common/createLabelContainerFor';

const getRelayQuery = () => Relay.QL`
  fragment on GenreConnection {
    edges {
      node {
        id,
        name
      }
    }
  }
`;

export default createLabelContainerFor({
  type: 'genres',
  getRelayQuery,
  labelName: {
    singular: 'Genre',
    plural: 'Genres',
  },
});
