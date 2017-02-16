import React from 'react';

import './ResourceContainer.css';

export default function ResourceContainer({ title, children, size = 'full' }) {
  return (
    <div className="col-sm-12 resource-container">
      <h2 className={`text-center section-heading section-heading-${size}`}>
        <span className="section-heading-underline">{title}</span>
      </h2>
      {children}
    </div>
  );
}

ResourceContainer.propTypes = {
  title: React.PropTypes.string.isRequired,
  size: React.PropTypes.string, // eslint-disable-line react/require-default-props
  children: React.PropTypes.node, // eslint-disable-line react/require-default-props
};
