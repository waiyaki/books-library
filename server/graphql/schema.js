import {
  GraphQLSchema, GraphQLObjectType,
 } from 'graphql';

import { connectionArgs, connectionFromPromisedArray } from 'graphql-relay';
import { Book, Author, Genre } from '../models';
import {
  NodeField, BookConnection, AuthorConnection, GenreConnection,
} from './types';

import * as mutations from './mutations';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query',
  fields: () => ({
    allBooks: {
      type: BookConnection,
      args: connectionArgs,
      resolve(_, args) {
        return connectionFromPromisedArray(Book.findAll({
          include: [Author, Genre],
        }), args);
      },
    },
    allAuthors: {
      type: AuthorConnection,
      args: connectionArgs,
      resolve(_, args) {
        return connectionFromPromisedArray(Author.all(), args);
      },
    },
    allGenres: {
      type: GenreConnection,
      args: connectionArgs,
      resolve(_, args) {
        return connectionFromPromisedArray(Genre.all(), args);
      },
    },
    node: NodeField,
  }),
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'The root mutation',
  fields: () => ({
    createGenre: mutations.createGenreMutation,
    createAuthor: mutations.createAuthorMutation,
    createBook: mutations.createBookMutation,
    updateAuthor: mutations.updateAuthorMutation,
    updateGenre: mutations.updateGenreMutation,
    updateBook: mutations.updateBookMutation,
  }),
});

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

export default Schema;
