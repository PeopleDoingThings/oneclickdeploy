import React, { Component } from 'react';

import Header from '../containers/header';
import Login from './login';
//import RepoList from '../containers/repo_list';

export default class App extends Component {
  constructor(props) {
    super(props);
    //uncomment below when isAuthenticated function on the backend starts working
  }

  render() {
    return (
      <div>
        <Header />
        <div>{this.props.children}</div>     
      </div>

    );
  }
}