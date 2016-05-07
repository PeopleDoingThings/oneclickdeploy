import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { Tabs, Tab, PanelGroup, Panel } from 'react-bootstrap';
import Deployable from './deployable';
import DeployedApp from './deployedRepos';
import { fetchRepos, refreshRepo } from '../actions/index';



class RepoList extends Component {
  constructor(props) {
    super(props);
    this.props.fetchRepos();
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(){
    console.log('refresh button is working')
    this.props.refreshRepo();
  }



  renderList() {
    if (this.props.repos.length === 0 || this.props.repos === undefined || this.props.repos[0].length === 0){
      return ''// "Loading....."
    }else {
      return (this.props.repos.map((repo) => {
        return (
          <RepoItem repoItem={repo} />
        )
        })
      );
    }
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
            {''}
            {''}
            {''}
          <h5> Why is my repo not showing?</h5> <button className="btn btn-primary" onClick={()=>this.handleClick()}>Refresh Repo List</button>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRepos, refreshRepo }, dispatch);
}

export default connect(null, mapDispatchToProps)(RepoList);
