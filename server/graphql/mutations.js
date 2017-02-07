import {
  GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';
import { mutationWithClientMutationId } from 'graphql-relay';
import { composeP } from 'ramda';

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
      composeP(
        book => loaders.getNodeById({ modelName: 'Book', id: book.id }),
        loaders.setAuthors(authorIds),
        loaders.setGenres(genreIds),
      ),
    );
  },
});
