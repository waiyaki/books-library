import { fromGlobalId } from 'graphql-relay';
import models from '../models';


export const extractTableName = source => source.$modelOptions.name.singular;


export const getNodeById = (nodeId) => {
  const query = {};
  const { type: modelName, id } = fromGlobalId(nodeId);

  if (modelName === 'Book') {
    query.include = [models.Author, models.Genre];
  }
  return models[modelName].findById(id, query);
};
