import React, { Component } from 'react';

export default class DeployedRepo extends Component {
  constructor(props){
    super(props);
  }

  render() {
    return (
      <div>
        <h1>About your deployed app</h1>

        <h2>{this.props.deployed.age}<h2>
      </div>

    );
  }
}