import React, { Component } from 'react';
import ClassNames from 'classnames';
//import { PanelGroup, Panel } from 'react-bootstrap'
import Logout from '../components/logout';

export default class SidebarNav extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let repoClass;
    let instanceDashClass;
    let appManagement;
    let liveConsole;
    if (this.props.url === "/repos") {
      repoClass = ClassNames({active: true});
    } else if (this.props.url === '/dashboard') {
      instanceDashClass = ClassNames({active: true});
    } else if (this.props.url === '/app-management') {
      appManagement = ClassNames({active: true});
    } else if (this.props.url === '/live-console') {
      liveConsole = ClassNames({active: true});
    }

    return (
          <section className="sidebar-nav">
            <nav>
                  <ul>
                    <li className={instanceDashClass}><a href='/#/dashboard'>Instance Dashboard</a></li>
                    <li className={appManagement}><a href='/#/app-management'>App Management</a></li>
                    <li className={liveConsole}><a href='/#/live-console'>Live Console</a></li>
                    <li className={repoClass}><a href='/#/repos'>Repo List</a></li>
                    <li><Logout /></li>
                  </ul>
            </nav>
          </section>
    )

  }
}            