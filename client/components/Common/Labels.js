import React, { PropTypes } from 'react';

import Label from './Label';
import ResourceLink from '../Common/ResourceLink';

export default function Labels({ items, baseUrl }) {
  return (
    <div>
      {items.map(item => (
        <ResourceLink to={`${baseUrl}/${item.id}`} key={item.id}>
          <Label content={item.name} key={item.id} />{' '}
        </ResourceLink>
      ))}
    </div>
  );
}

Labels.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
};
