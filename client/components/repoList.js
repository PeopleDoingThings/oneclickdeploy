import React, { Component } from 'react';
import Repo from './repo';

export default class RepoList extends Component {
  render() {
    return (
      <ul>
        <h3>Repo list is working</h3>
        <Repo />
      </ul>  
    );
  }
}