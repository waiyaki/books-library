import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import Labels from '../Common/Labels';

export function AuthorLabels({ authors }) {
  const authorItems = authors.edges.map(({ node }) => node);

  return (
    <Labels
      items={authorItems}
      labelName={{
        singular: 'Author',
        plural: 'Authors',
      }}
    />
  );
}

AuthorLabels.propTypes = {
  authors: PropTypes.shape({
    edges: PropTypes.array,
  }).isRequired,
};

const AuthorLabelsContainer = Relay.createContainer(AuthorLabels, {
  fragments: {
    authors: () => Relay.QL`
      fragment on AuthorConnection {
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

export default AuthorLabelsContainer;
