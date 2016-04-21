import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'

import Login from './login';
import RepoList from './repoList';

export default class App extends Component {
  render() {
    return (
      <div>
        <h1>App</h1>
        <div>
          <header>
            Links:
            {' '}
            <Link to="/">Home</Link>
            {' '}
            <Link to="/dashboard">dashboard</Link>
            {' '}
          </header>
          
          <div style={{ marginTop: '1.5em' }}>{this.props.children}</div>
        </div>
      </div>
    );
  }
}

// <div>
//   <button onClick={() => browserHistory.push('/foo')}>Go to /foo</button>
// </div>