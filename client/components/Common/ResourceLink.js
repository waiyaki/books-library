import React from 'react';
import { Link } from 'react-router';

import './ResourceLink.css';

export default function ResourceLink({ to, children }) {
  return (
    <Link to={to} className="link">
      {children}
    </Link>
  );
}

ResourceLink.propTypes = {
  to: React.PropTypes.string.isRequired,
  children: React.PropTypes.node.isRequired,
};
