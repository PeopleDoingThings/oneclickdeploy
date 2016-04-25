import React, { Component } from 'react';
import User from '../components/user';
import Logout from '../components/logout';

export default class Aside extends Component {
 constructor(props){
    super(props);
    console.log('props in aside:' ,this.props);
  
  }

  render() {
    return (
      <aside>
      <User user={this.props.user}/>
        <section className="pull-left">
          <nav>
            <ul className="nav nav-pills">
              Go To:
              <li className="icon-bar"><a href='/#/repos'>Repos List</a></li>
              <li classNave="icon-bar"><a href='/#/dashboard'>Dashboard</a></li>
              <Logout />
            </ul>
          </nav>
          </section>
      </aside>

    );
  }
}

//{this.props.children}