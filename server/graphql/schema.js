import {
  GraphQLSchema, GraphQLObjectType, GraphQLList,
 } from 'graphql';

import { Book, Author, Genre } from '../models';
import { BookType, GenreType, AuthorType } from './types';

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
  }),
});


const Schema = new GraphQLSchema({
  query: RootQuery,
});

export default Schema;
