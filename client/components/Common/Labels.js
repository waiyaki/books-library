import React, { PropTypes } from 'react';

import Label from './Label';

export default function Labels({ items }) {
  return (
    <div>
      {items.map(item => (
        <span key={item.id}>
          <Label content={item.name} key={item.id} />{' '}
        </span>
      ))}
    </div>
  );
}

Labels.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
};
