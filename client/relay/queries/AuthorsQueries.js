import Relay from 'react-relay';

export const AuthorsQueries = {
  authors: () => Relay.QL`query { allAuthors }`,
};

export const AuthorQueries = {
  author: () => Relay.QL`query { node (id: $authorId) }`,
  books: () => Relay.QL`query { allBooks(authorId: $authorId) }`,
  genres: () => Relay.QL`query { allGenres(authorId: $authorId) }`,
};
