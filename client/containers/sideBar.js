import React, { Component } from 'react';

export default class Aside extends Component {
  render() {
    return (
      <aside>
        <section className="pull-left">
          <nav>
            <ul className="nav nav-pills">
              <li className="icon-bar"><a href='/#/repos'>Repos List</a></li>
              <li classNave="icon-bar"><a href='/#/dashboard'>dashboard</a></li>
            </ul>
          </nav>
          </section>
      </aside>

    );
  }
}

//{this.props.children}