import { fromGlobalId } from 'graphql-relay';

import models from '../models';

export const extractTableName = source => source.$modelOptions.name.singular;

export function requireParam(param) {
  throw new Error(`Required param ${param} was not provided.`);
}


const getRawSequelizeQuery = (ids, model) => {
  const getRawId = id => fromGlobalId(id).id;
  const quote = string => `'${string}'`;
  const rawIds = ids.map(getRawId).map(quote).join(',');

  const { plural, singular } = model.options.name;

  const query = `select * from ${plural} as ${singular} where ${singular}.id in (${rawIds})`;

  return models.sequelize.query(query, { model });
};


/**
 * setAuthors : [authorIds] -> book -> book
 *
 * Given a list of author ids and a book, set the authors with
 * those ids as the authors of the book.
 * If you need to remove authors, pass in an empty authorIds array.
 */
export const setAuthors = authorIds => async (book) => {
  if (!authorIds) {
    return book;
  }

  try {
    let authors = [];

    if (authorIds.length) {
      authors = await getRawSequelizeQuery(authorIds, models.Author);
    }

    await book.setAuthors(authors);
  } catch (e) {
    // NoOp
  }
  return book;
};


/**
 * setGenres : [genreIds] -> book -> book
 *
 * Given an array of genreIds and a book, set the genres with those ids as
 * the genres the book is classified under.
 * If you need to remove genres, pass in an empty genreIds array.
 */
export const setGenres = genreIds => async (book) => {
  if (!genreIds) {
    return book;
  }

  try {
    let genres = [];

    if (genreIds.length) {
      genres = await getRawSequelizeQuery(genreIds, models.Genre);
    }

    await book.setGenres(genres);
  } catch (e) {
    // Noop
  }
  return book;
};
