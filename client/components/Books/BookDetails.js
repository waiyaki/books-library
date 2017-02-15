import React from 'react';
import Relay from 'react-relay';

import BookContainer from './Book';

export function BookDetails(props) {
  return (
    <div className="col-sm-12">
      <h2 className="text-center section-heading">
        <span className="section-heading-underline">Book Details</span>
      </h2>
      <div className="row resource-container">
        <div className="col-md-8 offset-md-2">
          <BookContainer {...props} />
        </div>
      </div>
    </div>
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
