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
    console.log('props in deployable ',this.props.repos.length)
    if (this.props.repos.length === 0 || this.props.repos === undefined || this.props.repos[0].length === 0){
      return "Loading....."
    } else {
    	var counter = 0;
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
        <PanelGroup accordion>
          {this.renderList()} 
        </PanelGroup>       
      </div>        
    );
  }
}
  

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ fetchRepos }, dispatch);
// }

function mapStateToProps(state) {
	return {
		repos: state.reducers.repos
	};
}


export default connect(mapStateToProps)(DeployedApp);
