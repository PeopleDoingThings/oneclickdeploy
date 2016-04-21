import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'

import Login from './login';
import RepoList from './repoList';

export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <header>
            <h1>One Click Deploy</h1>
            {' '}
            <Link to="/">Home</Link>
            {' '}
            <Link to="/main-panel">Main Panel</Link>
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