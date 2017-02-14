import path from 'path';

import express from 'express';
import logger from 'morgan';
import bodyParser from 'body-parser';
import favicon from 'serve-favicon';
import graphqlHTTP from 'express-graphql';

import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import webpackConfig from './webpack.config';


import Schema from './server/graphql/schema';

const env = process.env.NODE_ENV;
const publicPath = path.resolve(__dirname, './client/dist');

const app = express();

app.use(favicon(path.join(__dirname, 'server/public/favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(logger('dev'));

app.use('/graphql', graphqlHTTP({
  schema: Schema,
  graphiql: true,
}));

// Configure webpack hot reloading
if (env === 'development') {
  const compiler = webpack(webpackConfig);
  app.use(webpackDevMiddleware(compiler, {
    noInfo: true,
    chunks: false,
    color: true,
    publicPath: webpackConfig.output.publicPath,
  }));
  app.use(webpackHotMiddleware(compiler));
}

app.use(express.static(publicPath));

app.get('*', (req, res) => res.sendFile(
  path.resolve(publicPath, 'index.html'),
));

export default app;
