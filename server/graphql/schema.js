import {
  GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLNonNull, GraphQLID,
 } from 'graphql';

import { Book, Author, Genre } from '../models';
import { BookType, GenreType, AuthorType, NodeInterface } from './types';
import { getNodeById } from './loaders';

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
        return getNodeById(args.id);
      },
    },
  }),
});


const Schema = new GraphQLSchema({
  query: RootQuery,
});

export default Schema;
