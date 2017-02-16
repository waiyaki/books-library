import React, { PropTypes } from 'react';
import Relay from 'react-relay';

import AuthorContainer from './Author';
import ResourceContainer from '../Common/ResourceContainer';

export function AuthorList(props) {
  return (
    <ResourceContainer title="Authors">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <div className="card">
            <ul className="list-group list-group-flush text-center">
              {props.authors.edges.map(({ node }) => (
                <AuthorContainer author={node} key={node.__dataID__} />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </ResourceContainer>
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
