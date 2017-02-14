import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import AuthorContainer from './Author';

export function AuthorList(props) {
  return (
    <div className="col-sm-12">
      <h2 className="text-center section-heading">
        <span className="section-heading-underline">Authors</span>
      </h2>
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card resource-container">
            <ul className="list-group list-group-flush text-center">
              {props.authors.edges.map(({ node }) => (
                <AuthorContainer author={node} key={node.__dataID__} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

AuthorList.propTypes = {
  authors: PropTypes.shape({
    edges: PropTypes.array,
  }).isRequired,
};

const AuthorListContainer = Relay.createContainer(AuthorList, {
  fragments: {
    authors: () => Relay.QL`
      fragment on AuthorConnection {
        edges {
          node {
            ${AuthorContainer.getFragment('author')}
          }
        }
      }
    `,
  },
});

export default AuthorListContainer;
