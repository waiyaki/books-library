import { pascalize } from 'humps';
import {
  GraphQLObjectType, GraphQLString, GraphQLNonNull,
} from 'graphql';
import {
  nodeDefinitions, globalIdField, connectionDefinitions, connectionArgs,
  connectionFromArray, fromGlobalId,
} from 'graphql-relay';

import { getNodeById } from './loaders';
import { extractTableName } from './helpers';

const { nodeInterface: NodeInterface, nodeField } = nodeDefinitions(
  // The first method resolves an id to it's object.
  (nodeId) => {
    const { type: modelName, id } = fromGlobalId(nodeId);
    return getNodeById({ modelName, id });
  },

  // The second method resolves an object that implements a node to it's type.
  // eslint-disable-next-line no-use-before-define
  obj => nameToTypeMapper[pascalize(extractTableName(obj))],
);

export const NodeField = nodeField;

/**
 * Define a basic Author type.
 */
export const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'Representation of an author',
  interfaces: [NodeInterface],
  fields: () => ({
    id: globalIdField(),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Name of the author',
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

/**
 * Define the connection between a Book and it's Authors
 */
export const {
  connectionType: AuthorConnection,
  edgeType: AuthorEdge,
} = connectionDefinitions({
  nodeType: AuthorType,
});

/**
 * Define a basic Genre type.
 */
export const GenreType = new GraphQLObjectType({
  name: 'Genre',
  description: 'Representation of a book genre',
  interfaces: [NodeInterface],
  fields: () => ({
    id: globalIdField(),
    name: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Name of the Genre',
    },
    description: {
      type: GraphQLString,
      description: 'Short description of this Genre',
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

/**
 * Define the connection between a Book and it's Genres.
 */
export const {
  connectionType: GenreConnection,
  edgeType: GenreEdge,
} = connectionDefinitions({
  nodeType: GenreType,
});

/**
 * Define a basic book type.
 */
export const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'A book representation',
  interfaces: [NodeInterface],
  fields: () => ({
    id: globalIdField(),
    title: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Title of the book',
    },
    summary: {
      type: GraphQLString,
      description: 'Summary of the books contents',
    },
    isbn: {
      type: new GraphQLNonNull(GraphQLString),
      description: 'Unique ISBN number of the book',
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    genres: {
      type: GenreConnection,
      description: 'The genres this book is classified under',
      args: connectionArgs,
      resolve(book, args) {
        return connectionFromArray(book.dataValues.genres, args);
      },
    },
    authors: {
      type: AuthorConnection,
      description: 'The author(s) who have written this book',
      args: connectionArgs,
      resolve(book, args) {
        return connectionFromArray(book.dataValues.authors, args);
      },
    },
  }),
});

export const {
  connectionType: BookConnection,
  edgeType: BookEdge,
} = connectionDefinitions({
  nodeType: BookType,
});

const types = [BookType, AuthorType, GenreType];

const nameToTypeMapper = types.reduce((mapper, type) => ({
  ...mapper,
  [type.name]: type,
}), {});
