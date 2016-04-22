import React, { Component } from 'react';
import { connect } from 'react-redux';
import Repo from './repo';

class RepoList extends Component {
  render() {
    
    return (
    
      <ul>
        <h3>Repo list is working</h3>
        <Repo />
      </ul>  
    );
  }
}

function mapStateToProps(state) {
  return {
    test: state.test
  };
}

export default connect(mapStateToProps)(RepoList);