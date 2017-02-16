import { composeP, map, prop } from 'ramda';
import { fromGlobalId } from 'graphql-relay';
import { pascalize } from 'humps';

import models from '../models';
import { setAuthors, setGenres, requireParam, findGenresWithAuthorId } from './helpers';

export const getNodeById = ({ modelName, id }) => {
  const query = {};

  if (modelName === 'Book') {
    query.include = [models.Author, models.Genre];
  }

  return models[modelName].findById(id, query);
};


export async function create(
  model = requireParam('model'),
  fields = requireParam('fields'),
  afterCreate = null,
) {
  const object = await model.create(fields);

  if (afterCreate) {
    return afterCreate(object);
  }
  return object;
}

export async function update(
  model = requireParam('model'),
  { id = requireParam('id'), ...fields },
  afterUpdate = null,
) {
  const { id: objId } = fromGlobalId(id);
  const object = await getNodeById({
    modelName: pascalize(model.name),
    id: objId,
  });
  await object.update(fields, {
    fields: Object.keys(fields),
  });

  if (afterUpdate) {
    return afterUpdate(object);
  }

  return object;
}

/**
 * updateRelationsAndRefetch : ({ genreIds, authorIds }) -> book -> Promise book
 *
 * Update a book's relations to authors and genres and refetch the book
 * from the db after the update to refresh data.
 */
export const updateRelationsAndRefetch = ({ genreIds, authorIds }) =>
  composeP(
    (book) => {
      // Only hit the db if book was updated by either setAuthors or setGenres
      if (genreIds || authorIds) {
        return getNodeById({ modelName: 'Book', id: book.id });
      }
      return book;
    },
    setAuthors(authorIds),
    setGenres(genreIds),
  );

export function findGenres(args) {
  if (args.authorId) {
    return findGenresWithAuthorId(args.authorId);
  }

  return models.Genre.findAll();
}

/**
 * extractField : String -> ([a] -> [b])
 *
 * Given a string field name, return a function expecting a list of
 * elements which will map over the elements and return a list of element
 * values stored under provided field name.
 */
const extractField = field => map(prop(field));

/**
 * findBooksWithArgs : ({ authorId?, genreId? }) -> [Books]
 *
 * Find and return a list of Books from the db.
 *
 * If `genreId` is provided, return only the books classified under the genre
 * with specified id.
 * If `authorId` is provided, return only the books authored/co-authored by
 * the author with specified id.
 * If both are provided, return only the books classified under genre with
 * specified id and author/co-authored by author with specified id.
 */
export async function findBooksWithArgs({ authorId, genreId }) {
  let bookIds = [];

  if (genreId && !authorId) {
    // If we only have the genreId, find all the books that are characterized
    // under the genre with this id.
    const { id } = fromGlobalId(genreId);
    const bookIdsInGenre = await models.BookGenreMapper
      .findAll({
        where: {
          genreId: id,
        },
      })
      .then(extractField('bookId'));
    bookIds = bookIds.concat(bookIdsInGenre);
  } else if (authorId && !genreId) {
    // If we only have the authorId, find the ids of all the books
    // authored/co-authored by the author with this id.
    const { id } = fromGlobalId(authorId);
    const bookIdsFromAuthor = await models.AuthorBookMapper
      .findAll({
        where: {
          authorId: id,
        },
      })
      .then(extractField('bookId'));
    bookIds = bookIds.concat(bookIdsFromAuthor);
  } else if (authorId && genreId) {
    // If we have both the genreId and the authorId, find the ids of the books
    // characterized under the genre with genreId and authored/co-authored
    // by the author with authorId.
    const { id: gId } = fromGlobalId(genreId);
    const { id: aId } = fromGlobalId(authorId);
    const bookIdsInGenreByAuthor = await models.sequelize
      .query(
        `SELECT "author_book_mapper"."bookId" AS "bookId" FROM "author_book_mapper"
          INNER JOIN "book_genre_mapper"
          ON "author_book_mapper"."bookId" = "book_genre_mapper"."bookId"
          WHERE "author_book_mapper"."authorId"='${aId}'
          AND "book_genre_mapper"."genreId"='${gId}'`,
        { model: models.AuthorBookMapper },
      )
      .then(extractField('bookId'));
    bookIds = bookIds.concat(bookIdsInGenreByAuthor);
  }

  // Include all genres this book is characterized under as well as all the
  // authors associated with it.
  const query = {
    include: [models.Genre, models.Author],
  };

  // If we have some bookIds, we want to select only those books.
  if (bookIds.length) {
    query.where = {
      id: {
        in: bookIds,
      },
    };
  }

  return models.Book.findAll(query);
}
