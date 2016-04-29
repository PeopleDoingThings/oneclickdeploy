import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';


export default class Header extends Component {
  render() {
    return (
      <div>
        <header className="header">
              <h1>App name</h1>
              {
              // <Link to="/">Home</Link>
              // <Link to="/main-panel">Main Panel</Link>
              }
        </header>
      </div>

    );
  }

}
