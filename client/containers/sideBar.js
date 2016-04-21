import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class Aside extends Component {
  render() {
    return (
      <div>
        <h1>Aside Content</h1>
         {' '}
          <Link to='/repos'>Repos List</Link>
          {' '}
          <Link to='/dashboard'>dashboard</Link>
      </div>

    );
  }
}

//{this.props.children}