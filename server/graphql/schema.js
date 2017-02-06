import {
  GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID,
 } from 'graphql';

import { Book, Author, Genre } from '../models';
import { BookType, GenreType, AuthorType, NodeInterface } from './types';
import * as loaders from './loaders';
import * as mutations from './mutations';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query',
  fields: () => ({
    allBooks: {
      type: new GraphQLList(BookType),
      resolve() {
        return Book.all();
      },
    },
    allAuthors: {
      type: new GraphQLList(AuthorType),
      resolve() {
        return Author.all();
      },
    },
    allGenres: {
      type: new GraphQLList(GenreType),
      resolve() {
        return Genre.all();
      },
    },
    node: {
      type: NodeInterface,
      args: {
        id: {
          type: new GraphQLNonNull(GraphQLID),
        },
      },
      resolve(source, args) {
        return loaders.getNodeById(args.id);
      },
    },
  }),
});

const RootMutation = new GraphQLObjectType({
  name: 'RootMutation',
  description: 'The root mutation',
  fields: () => ({
    ...mutations,
  }),
});

const Schema = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation,
});

export default Schema;
