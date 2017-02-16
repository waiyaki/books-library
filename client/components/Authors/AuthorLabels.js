import Relay from 'react-relay';

import createLabelContainerFor from '../Common/createLabelContainerFor';

const getRelayQuery = () => Relay.QL`
  fragment on AuthorConnection {
    edges {
      node {
        id,
        name
      }
    }
  }
`;

export default createLabelContainerFor({
  type: 'authors',
  getRelayQuery,
  labelName: 'Author',
});
