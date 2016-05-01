import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import RepoItem from '../components/repo_list_item'; 
import { fetchRepos } from '../actions/index';
import { PanelGroup, Panel } from 'react-bootstrap';
import Form from './envVarForm';


class Deployable extends Component {
  constructor(props) {
    super(props);
    this.props.fetchRepos()
  }



renderList() {
    console.log('props in deployable ',this.props.repos.length)
    if (this.props.repos.length === 0 || this.props.repos === undefined || this.props.repos[0].length === 0){
      return "Loading....."
    } else {
    	var counter = 0;
      return (this.props.repos.map((repo) => {
        return (
        	<Panel header={repo.name} eventKey={counter++}>
          		<RepoItem key={repo.repoid} repoItem={repo} />
          		<Form id={repo.repoid}/>
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
  

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ fetchRepos }, dispatch);
}

function mapStateToProps(state) {
	//whatever gets returned here will show up
	//as props inside RepoList
	console.log('state: ', state)
	return {
		repos: state.reducers.repos
	};
}

//take this component/mapStateToProps and return a container
export default connect(mapStateToProps, mapDispatchToProps)(Deployable);
