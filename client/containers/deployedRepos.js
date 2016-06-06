import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import RepoItem from '../components/repo_list_item'; 
import { fetchRepos } from '../actions/index';
import { PanelGroup, Panel } from 'react-bootstrap';


class DeployedApp extends Component {
  constructor(props) {
    super(props);
  }



renderList() {
    if (this.props.repos.length === 0 || this.props.repos === undefined || this.props.repos[0].length === 0){
      return <div className="loader">Loading...</div>
    } else {
      	var counter = 0;
        var now= Date.now();
        var old = Date.parse(this.props.repos[0].age);
        if(Math.abs(now - old ) > (259200000))
        {this.props.refreshRepo()}
      return (this.props.repos.map((repo) => {
        if(repo.deployed===true)
        return (
        	  <Panel key={repo.repoid} header={repo.name} eventKey={counter++}>
          		<RepoItem repoItem={repo} />
          	</Panel>
        	)
        })
      );
    }
  } 

  render() {
    return (
      <div>
        <PanelGroup accordion className="repo-list">
          {this.renderList()} 
        </PanelGroup>       
      </div>        
    );
  }
}

function mapStateToProps(state) {
	return {
		repos: state.reducers.repos
	};
}


export default connect(mapStateToProps)(DeployedApp);
