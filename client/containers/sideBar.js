import React, { Component } from 'react';
import User from '../components/user';
import Logout from '../components/logout';
import { PanelGroup, Panel } from 'react-bootstrap'

export default class Aside extends Component {
 constructor(props){
    super(props);

  }

  render() {
    return (
      <div className="side-bar aside col-md-2 col-sm-12">
        <User user={this.props.user}/>
          <section className="sidebar-nav">
            <nav>
              <PanelGroup defaultActiveKey="2" accordion>
                <Panel header="Panel 1" eventKey="1">
                  <ul>
                    <li><a href='/#/repos'>Repos List</a></li>
                    <li><a href='/#/dashboard'>Dashboard</a></li>
                  </ul>
                </Panel>
                <Panel header="Panel 2" eventKey="2">Panel 2 content</Panel>
              </PanelGroup>



                <div className="sidebar-logout">
                  <Logout />
                </div>
            </nav>
            </section>
      </div>

    );
  }
}

//{this.props.children}
