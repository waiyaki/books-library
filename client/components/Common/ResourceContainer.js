import React from 'react';

import './ResourceContainer.css';

export default function ResourceContainer({ heading, children }) {
  return (
    <div className="col-sm-12 resource-container">
      <h2 className="text-center section-heading">
        <span className="section-heading-underline">{heading}</span>
      </h2>
      {children}
    </div>
  );
}

ResourceContainer.propTypes = {
  heading: React.PropTypes.string.isRequired,
  children: React.PropTypes.node, // eslint-disable-line react/require-default-props
};
