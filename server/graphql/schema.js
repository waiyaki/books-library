import {
  GraphQLSchema, GraphQLObjectType, GraphQLString,
 } from 'graphql';

import { connectionArgs, connectionFromPromisedArray } from 'graphql-relay';
import { Book, Author } from '../models';
import {
  NodeField, BookConnection, AuthorConnection, GenreConnection,
} from './types';

import * as mutations from './mutations';
import { constructBookQuery } from './helpers';
import { findGenres } from './loaders';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query',
  fields: () => ({
    allBooks: {
      type: BookConnection,
      args: {
        authorId: {
          type: GraphQLString,
        },
        genreId: {
          type: GraphQLString,
        },
        ...connectionArgs,
      },
      resolve(_, args) {
        return connectionFromPromisedArray(
          Book.findAll(constructBookQuery(args)),
          args,
        );
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
      args: {
        authorId: {
          type: GraphQLString,
          description: 'Limit genres to a list associated with books written by the author with this id.',
        },
        ...connectionArgs,
      },
      resolve(_, args) {
        return connectionFromPromisedArray(findGenres(args), args);
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
