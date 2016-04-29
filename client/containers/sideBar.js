import React, { Component } from 'react';
import User from '../components/user';
import Logout from '../components/logout';

export default class Aside extends Component {
 constructor(props){
    super(props);
  
  }

  render() {
    return (
      <div className="side-bar affix">
      <button class="js-slideout-toggle">
               menu
               </button>
        <User user={this.props.user}/>
          <section>
            <nav>
              <ul className="nav nav-pills">
                Go To:
                <li className="icon-bar"><a href='/#/repos'>Repos List</a></li>
                <li classNave="icon-bar"><a href='/#/dashboard'>Dashboard</a></li>
                <Logout />
              </ul>
            </nav>
            </section>   
      </div>

    );
  }
}

//{this.props.children}