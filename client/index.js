import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

import Routes from './routes';

const mountNode = document.getElementById('root');

render(
  <AppContainer>
    <Routes />
  </AppContainer>,
  mountNode,
);

if (module.hot) {
  module.hot.accept('./routes', () => {
    // eslint-disable-next-line global-require, no-shadow
    const Routes = require('./routes').default;
    render(
      <AppContainer>
        <Routes />
      </AppContainer>,
      mountNode,
    );
  });
}
