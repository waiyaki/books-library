import React from 'react';
import Relay from 'react-relay';

export function Book(props) {
  return (
    <div className="col-sm-12">
      Books
      {console.log('getting props: ', props)}
    </div>
  )
}

export default Relay.createContainer(Book, {
  fragments: {
    book: () => Relay.QL`
      fragment on Book {
        title,
        summary
      }
    `
  }
})
