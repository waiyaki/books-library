import path from 'path';

import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import graphqlHTTP from 'express-graphql';

import Schema from './server/graphql/schema';

const app = express();

app.use(favicon(path.join(__dirname, 'server/public/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true,
}));

app.use('*', (req, res) => res.status(400).send({
  message: 'All API requests are served at "/graphql" endpoint.',
}));

export default app;
