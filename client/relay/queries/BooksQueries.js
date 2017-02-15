import Relay from 'react-relay';

export const BooksQueries = {
  books: () => Relay.QL`query { allBooks }`,
};

export const BookQueries = {
  book: () => Relay.QL`query { node (id: $bookId) }`,
};
