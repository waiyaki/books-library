import { pascalize } from 'humps';
import {
  GraphQLObjectType, GraphQLString, GraphQLNonNull, GraphQLID,
  GraphQLInterfaceType,
} from 'graphql';

import { dbIdToNodeId, extractTableName } from './loaders';


export const NodeInterface = new GraphQLInterfaceType({
  name: 'Node',
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
  }),
  // eslint-disable-next-line no-use-before-define
  resolveType: source => nameToTypeMapper[pascalize(extractTableName(source))],
});

export const BookType = new GraphQLObjectType({
  name: 'Book',
  description: 'A book representation',
  interfaces: [NodeInterface],
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: dbIdToNodeId,
    },
    title: {
      type: new GraphQLNonNull(GraphQLString),
    },
    summary: {
      type: GraphQLString,
    },
    isbn: {
      type: new GraphQLNonNull(GraphQLString),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

export const AuthorType = new GraphQLObjectType({
  name: 'Author',
  description: 'Representation of an author',
  interfaces: [NodeInterface],
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: dbIdToNodeId,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

export const GenreType = new GraphQLObjectType({
  name: 'Genre',
  description: 'Representation of a book genre',
  interfaces: [NodeInterface],
  fields: () => ({
    id: {
      type: new GraphQLNonNull(GraphQLID),
      resolve: dbIdToNodeId,
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: GraphQLString,
    },
    createdAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
    updatedAt: {
      type: new GraphQLNonNull(GraphQLString),
    },
  }),
});

const types = [BookType, AuthorType, GenreType];

const nameToTypeMapper = types.reduce((mapper, type) => ({
  ...mapper,
  [type.name]: type,
}), {});
