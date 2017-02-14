import React from 'react';
import Relay from 'react-relay';

export function Author({ author }) {
  return (
    <li className="list-group-item">
      {author.name}
    </li>
  );
}

Author.propTypes = {
  author: React.PropTypes.shape({
    id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
  }).isRequired,
};

const AuthorContainer = Relay.createContainer(Author, {
  fragments: {
    author: () => Relay.QL`
      fragment on Author {
        id,
        name
      }
    `,
  },
});

export default AuthorContainer;
