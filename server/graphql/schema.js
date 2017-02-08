import {
  GraphQLSchema, GraphQLObjectType, GraphQLList,
 } from 'graphql';

import { Book, Author, Genre } from '../models';
import { BookType, GenreType, AuthorType, NodeField } from './types';

import * as mutations from './mutations';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'The root query',
  fields: () => ({
    allBooks: {
      type: new GraphQLList(BookType),
      resolve() {
        return Book.findAll({
          include: [Author, Genre],
        });
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
