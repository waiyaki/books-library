import React from 'react';

import ResourceLink from './components/Common/ResourceLink';

import './App.css';

export default function App(props) {
  return (
    <div className="container">
      <div className="row align-items-center">
        <div className="col">
          <ResourceLink to="/">
            <h1 className="display-4 text-center">Bookeeper</h1>
          </ResourceLink>
          <hr />
        </div>
        {props.children}
      </div>
    </div>
  );
}

App.propTypes = {
  // eslint-disable-next-line react/require-default-props
  children: React.PropTypes.node,
};
