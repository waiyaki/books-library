import React from 'react';
import Relay from 'react-relay';

import BookContainer from './Book';
import ResourceContainer from '../Common/ResourceContainer';

export function BookDetails(props) {
  return (
    <ResourceContainer heading="Book Details">
      <div className="row">
        <div className="col-md-8 offset-md-2">
          <BookContainer {...props} />
        </div>
      </div>
    </ResourceContainer>
  );
}

const BookDetailsContainer = Relay.createContainer(BookDetails, {
  fragments: {
    book: () => Relay.QL`
      fragment on Book {
        ${BookContainer.getFragment('book')}
      }
    `,
  },
});

export default BookDetailsContainer;
