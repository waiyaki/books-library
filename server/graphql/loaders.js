import { composeP } from 'ramda';
import { fromGlobalId } from 'graphql-relay';
import { pascalize } from 'humps';

import models from '../models';
import { setAuthors, setGenres, requireParam } from './helpers';

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
