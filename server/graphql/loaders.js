import { fromGlobalId } from 'graphql-relay';

import models from '../models';


const { Author, Genre } = models;

export const extractTableName = source => source.$modelOptions.name.singular;


export const getNodeById = async ({ modelName, id }) => {
  const query = {};

  if (modelName === 'Book') {
    query.include = [Author, Genre];
  }

  return models[modelName].findById(id, query);
};


function requireParam(param) {
  throw new Error(`Required param ${param} was not provided.`);
}


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

const getRawSequelizeQuery = (ids, model) => {
  const getRawId = id => fromGlobalId(id).id;
  const quote = string => `'${string}'`;
  const rawIds = ids.map(getRawId).map(quote).join(',');

  const { plural, singular } = model.options.name;

  const query = `select * from ${plural} as ${singular} where ${singular}.id in (${rawIds})`;

  return models.sequelize.query(query, { model });
};


export const setAuthors = authorIds => async (book) => {
  if (authorIds) {
    try {
      const authors = await getRawSequelizeQuery(authorIds, Author);
      await book.setAuthors(authors);
    } catch (e) {
      // Noop
    }
  }
  return book;
};


export const setGenres = genreIds => async (book) => {
  if (genreIds) {
    try {
      const genres = await getRawSequelizeQuery(genreIds, Genre);
      await book.setGenres(genres);
    } catch (e) {
      // Noop
    }
  }
  return book;
};


export async function update(
  model = requireParam('model'),
  { id = requireParam('id'), ...fields },
) {
  const object = await model.findById(id);
  await object.update(fields, {
    fields: Object.keys(fields),
  });
  return object;
}
