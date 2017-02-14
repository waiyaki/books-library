import React, { PropTypes } from 'react';

import Label from './Label';

export default function Labels({ items, labelName: { singular, plural } }) {
  const label = items.length > 1 ? `${plural}:` : `${singular}:`;
  return (
    <div className="row">
      <div className="col-sm-3">
        {label}
      </div>
      <div className="col-sm-9">
        {items.map(item => (
          <span key={item.id}>
            <Label content={item.name} />{' '}
          </span>
        ))}
      </div>
    </div>
  );
}

Labels.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  })).isRequired,
  labelName: PropTypes.shape({
    singular: PropTypes.string,
    plural: PropTypes.string,
  }).isRequired,
};
