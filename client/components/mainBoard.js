import React, { Component } from 'react';

export default class MainBoard extends Component {
  render() {
    return (
      <div>
        <h1>Welcome to the main dashboard</h1>
        {this.props.children}
      </div>

    );
  }
}
