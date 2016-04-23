import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'

import Header from '../containers/header'
import Login from './login';
import RepoList from '../containers/repo_list';


export default class App extends Component {
  render() {
    return (
      <div>
        <div>
          <Header />
          <div className="main-panel">
            <div>{this.props.children}</div>
          </div>
        </div>
      </div>
    );
  }
}

// <div>
//   <button onClick={() => browserHistory.push('/foo')}>Go to /foo</button>
// </div>