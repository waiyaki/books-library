import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import Labels from './Labels';

export default function createLabelContainerFor({
  type, // container type, e.g genres, authors
  getRelayQuery, // () => Relay.QL`` - Function that'll be called to get query.
  labelName, // e.g Author, Genre
  baseUrl = `/${type}`,
}) {
  function TypeLabels({ [type]: types }) {
    const items = types.edges.map(({ node }) => node);

    return (
      <Labels
        baseUrl={baseUrl}
        items={items}
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

  TypeLabels.displayName = `${labelName}Labels` || TypeLabels.name;

  return Relay.createContainer(TypeLabels, {
    fragments: {
      [type]: getRelayQuery,
    },
  });
}
