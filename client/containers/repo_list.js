import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { Tabs, Tab, PanelGroup, Panel } from 'react-bootstrap';
import Deployable from './deployable';
import DeployedApp from './deployedRepos';
import { fetchRepos } from '../actions/index';



class RepoList extends Component {
  constructor(props) {
    super(props);
    this.props.fetchRepos();
  }



  render() {
    return (
      <div>
           <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Deployable Repos">
                  <Deployable />
                </Tab>
                <Tab eventKey={2} title="Deployed Repos">
                 <DeployedApp />
                </Tab>
           </Tabs>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRepos}, dispatch);
}

export default connect(null, mapDispatchToProps)(RepoList);
