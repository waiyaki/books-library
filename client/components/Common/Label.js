import React from 'react';

export default function Label({ content }) {
  return (
    <span className="badge badge-pill badge-default">
      {content}
    </span>
  );
}

Label.propTypes = {
  content: React.PropTypes.string.isRequired,
};
