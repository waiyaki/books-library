import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import Labels from './Labels';

export default function createLabelContainerFor({
  type, // container type, e.g genres, authors
  getRelayQuery, // () => Relay.QL`` - Function that'll be called to get query.
  labelName: {
    singular,
    plural,
  },
}) {
  function TypeLabels({ [type]: types }) {
    const items = types.edges.map(({ node }) => node);

    return (
      <Labels
        items={items}
        labelName={{
          singular,
          plural,
        }}
      />
    );
  }

  TypeLabels.propTypes = {
    [type]: PropTypes.shape({
      edges: PropTypes.arrayOf(PropTypes.shape({
        node: PropTypes.object.isRequired,
      })).isRequired,
    }).isRequired,
  };

  TypeLabels.displayName = `${singular}Labels` || TypeLabels.name;

  return Relay.createContainer(TypeLabels, {
    fragments: {
      [type]: getRelayQuery,
    },
  });
}
