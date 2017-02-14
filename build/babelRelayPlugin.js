const getbabelRelayPlugin = require('babel-relay-plugin');
const schema = require('../server/graphql/schema.json');

module.exports = getbabelRelayPlugin(schema.data);
