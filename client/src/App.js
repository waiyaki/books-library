import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="row align-items-center">
          <div className="col">
            <h1 className="display-4 text-center">Bookeeper</h1>
            <hr />
          </div>
          {this.props.children}
        </div>
      </div>
    );
  }
}

export default App;
