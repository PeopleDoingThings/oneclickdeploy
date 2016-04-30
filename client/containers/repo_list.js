import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { Tabs, Tab, PanelGroup, Panel } from 'react-bootstrap';
import Deployable from './deployable';
import DeployedApp from './DeployedApps';


class RepoList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <h3 className='repoInstance'>Some Random Text Here Later</h3>
           <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Deployable Repos">
                  <Deployable />
                </Tab>
                <Tab eventKey={2} title="Deployed Instances">
                 <DeployedApp />
                </Tab>
           </Tabs>
      </div>
    );
  }
}


export default connect(null,null)(RepoList);