import React from 'react';
import Relay from 'react-relay';

import Book from './Book';

export function BooksList(props) {
  return (
    <div className="col-sm-12">
      Books
      {console.log('getting props: ', props)}
    </div>
  )
}

export default Relay.createContainer(BooksList, {
  fragments: {
    books: () => Relay.QL`
      fragment on allBooks {
        edges {
          node {
            id,
            ${Book.getFragment('book')}
          }
        }
      }
    `
  }
})
