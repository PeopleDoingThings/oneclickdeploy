import React, { Component } from 'react';
import Repo from './repo';

export default class RepoList extends Component {
  render() {
    return (
      <ul>
        <Repo />
      </ul>  
    );
  }
}