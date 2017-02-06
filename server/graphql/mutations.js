import {
  GraphQLNonNull, GraphQLString, GraphQLList,
} from 'graphql';

import { BookType, GenreType, AuthorType } from './types';
import { Book, Genre, Author, sequelize } from '../models';
import { splitNodeId } from './loaders';

export const createGenre = {
  type: GenreType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
  },
  resolve(source, args) {
    return Genre.create(args);
  },
};

export const createAuthor = {
  type: AuthorType,
  args: {
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
  },
  resolve(source, args) {
    return Author.create(args);
  },
};

export const createBook = {
  type: BookType,
  args: {
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
  resolve: async (source, args) => {
    const getRawSequelizeQuery = (ids, model) => {
      const getRawId = id => splitNodeId(id).slice(-1)[0];
      const quote = string => `'${string}'`;
      const rawIds = ids.map(getRawId).map(quote).join(',');

      const { plural, singular } = model.options.name;

      const query = `select * from ${plural} as ${singular} where ${singular}.id in (${rawIds})`;

      return sequelize.query(query, { model });
    };


    const { authorIds, genreIds, ...fields } = args;
    const book = await Book.create(fields);

    try {
      if (authorIds) {
        const authors = await getRawSequelizeQuery(authorIds, Author);
        book.setAuthors(authors);
      }
    } catch (e) {
      // console.log('Error adding authors', e);
    }

    try {
      if (genreIds) {
        const genres = await getRawSequelizeQuery(genreIds, Genre);
        book.setGenres(genres);
      }
    } catch (e) {
      // console.log('Error adding genres: ', e);
    }

    return Book.findById(book.id, {
      include: [Genre, Author],
    });
  },
};

