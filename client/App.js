import React from 'react';

import ResourceLink from './components/Common/ResourceLink';

import './App.css';

export default function App(props) {
  return (
    <div>
      <nav className="navbar navbar-inverse bg-inverse">
        <ResourceLink to="/">
          <h1 className="display-4 text-center app-brand">Bookeeper</h1>
        </ResourceLink>
      </nav>
      <div className="container">
        <div className="row align-items-center">
          {props.children}
        </div>
      </div>
    </div>
  );
}

App.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: React.PropTypes.node,
};
