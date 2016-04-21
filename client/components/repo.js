import React, { Component } from 'react';

export default class Repo extends Component {

  handleClick(event) {
    console.log('clicking works!', event);
  }

  render() {
    return (
        <li>future repo data goes here <button onClick={ this.handleClick }>deploy</button></li>
    );

  }
}