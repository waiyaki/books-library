import {
  GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';

import { BookType, GenreType, AuthorType } from './types';
import { Book, Genre, Author } from '../models';
import * as loaders from './loaders';


export const createGenreMutation = mutationWithClientMutationId({
  name: 'CreateGenre',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
  },
  outputFields: {
    genre: {
      type: GenreType,
      resolve(genre) {
        return genre;
      },
    },
  },
  mutateAndGetPayload({ name, description }) {
    return loaders.create(Genre, { name, description });
  },
});

export const createAuthorMutation = mutationWithClientMutationId({
  name: 'CreateAuthor',
  inputFields: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  outputFields: {
    author: {
      type: AuthorType,
      resolve(author) {
        return author;
      },
    },
  },
  mutateAndGetPayload({ name }) {
    return loaders.create(Author, { name });
  },
});

export const createBookMutation = mutationWithClientMutationId({
  name: 'CreateBook',
  inputFields: {
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    summary: {
      type: GraphQLString,
    },
    isbn: {
      type: new GraphQLNonNull(GraphQLString),
    },
    authorIds: {
      type: new GraphQLList(GraphQLString),
    },
    genreIds: {
      type: new GraphQLList(GraphQLString),
    },
  },
  outputFields: {
    book: {
      type: BookType,
      resolve(book) {
        return book;
      },
    },
  },
  mutateAndGetPayload({ title, summary, isbn, authorIds, genreIds }) {
    return loaders.create(
      Book,
      { title, summary, isbn },
      loaders.updateRelationsAndRefetch({ authorIds, genreIds }),
    );
  },
});

// UPDATE MUTATIONS

/**
 * Update author details
 */
export const updateAuthorMutation = mutationWithClientMutationId({
  name: 'UpdateAuthor',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLString,
    },
  },
  outputFields: {
    author: {
      type: AuthorType,
      resolve(author) {
        return author;
      },
    },
  },
  mutateAndGetPayload({ id, name }) {
    return loaders.update(Author, { id, name });
  },
});


/**
 * Update Genre details
 */
export const updateGenreMutation = mutationWithClientMutationId({
  name: 'UpdateGenre',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    name: {
      type: GraphQLString,
    },
    description: {
      type: GraphQLString,
    },
  },
  outputFields: {
    genre: {
      type: GenreType,
      resolve(genre) {
        return genre;
      },
    },
  },
  mutateAndGetPayload({ id, name, description }) {
    return loaders.update(Genre, { id, name, description });
  },
});

export const updateBookMutation = mutationWithClientMutationId({
  name: 'UpdateBook',
  inputFields: {
    id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    title: {
      type: GraphQLString,
    },
    summary: {
      type: GraphQLString,
    },
    isbn: {
      type: GraphQLString,
    },
    authorIds: {
      type: new GraphQLList(GraphQLString),
      description: [
        'Author IDs for the authors to add to the book.',
        'To remove some authors, pass in the IDs of all the authors',
        'except the ones you want to remove.',
        'Pass in an empty array to remove all authors.',
        'No changes are effected if this field is undefined.',
      ].join(' '),
    },
    genreIds: {
      type: new GraphQLList(GraphQLString),
      description: [
        'Genre IDs for the genres to add to the book.',
        'To remove some genres, pass in the IDs of all the genres',
        'except the ones you want to remove.',
        'Pass in an empty array to remove all genres.',
        'No changes are effected if this field is undefined.',
      ].join(' '),
    },
  },
  outputFields: {
    book: {
      type: BookType,
      resolve(book) {
        return book;
      },
    },
  },
  mutateAndGetPayload({ id, authorIds, genreIds, ...rest }) {
    return loaders.update(
      Book,
      { id, ...rest },
      loaders.updateRelationsAndRefetch({ authorIds, genreIds }),
    );
  },
});
