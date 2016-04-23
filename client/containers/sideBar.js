import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';

export default class Aside extends Component {
  render() {
    return (
      <aside>
        <section className="pull-left">
          <nav>
            <ul className="nav nav-pills">
              <li className="icon-bar"><Link to='/repos'>Repos List</Link></li>
              <li classNave="icon-bar"><Link to='/dashboard'>dashboard</Link></li>
            </ul>
          </nav>
          </section>
      </aside>

    );
  }
}

//{this.props.children}