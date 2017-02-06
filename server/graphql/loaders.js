import humps from 'humps';

import models from '../models';

export const splitNodeId = nodeId => nodeId.split(':');

// Extract table name from Sequelize instance.
export const extractTableName = source => source.$modelOptions.name.singular;

export const dbIdToNodeId = source => `${extractTableName(source)}:${source.id}`;

export const getNodeById = (nodeId) => {
  const [tableName, dbId] = splitNodeId(nodeId);
  return models[humps.pascalize(tableName)].findById(dbId);
};

