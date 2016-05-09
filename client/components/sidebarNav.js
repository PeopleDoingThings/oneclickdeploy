import React, { Component } from 'react';
import ClassNames from 'classnames';
import { PanelGroup, Panel } from 'react-bootstrap'
import Logout from '../components/logout';

export default class SidebarNav extends Component {
  constructor(props){
    super(props);
  }

  render() {
    let repoClass;
    let instanceDashClass;
    let liveMonitorDashClass
    if (this.props.url === "/repos") {
      repoClass = ClassNames({active: true});
    } else if (this.props.url === '/dashboard') {
      instanceDashClass = ClassNames({active: true});
    } else if (this.props.url === '/live-monitor') {
      liveMonitorDashClass = ClassNames({active: true});
    }

    return (
          <section className="sidebar-nav">
            <nav>
              <PanelGroup defaultActiveKey="1" accordion>
                <Panel header="Dashboards" eventKey="1">
                  <ul>
                    <li className={instanceDashClass}><a href='/#/dashboard'>Instance Dashboard</a></li>
                    <li className={liveMonitorDashClass}><a href='/#/app-management'>App Management</a></li>
                  </ul>
                </Panel>
                <Panel header="Github Repos" eventKey="2">
                  <ul>
                    <li className={repoClass}><a href='/#/repos'>Repo List</a></li>
                  </ul>
                </Panel>
              </PanelGroup>
                <div className="sidebar-logout">
                  <Logout />
                </div>
            </nav>
          </section>
    )

  }
}            