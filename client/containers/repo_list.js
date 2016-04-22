import React, { Component } from 'react';
import RepoItem from '../components/repo_list_item'; 
import { connect } from 'react-redux';


class RepoList extends Component {

  renderList() {
    return (this.props.repos.map((repo) => {
      return (
        <RepoItem key={repo.name}  repoItem={repo} />
      )
      })
    );
  } 

  render() {
    return (
		 	<div>
		 		<h3>Repo list is working</h3>
				<ul className="list-group">
         {this.renderList()}
        </ul>
		 	</div> 
    );
  }
}


function mapStateToProps(state) {
	//whatever gets returned here will show up
	//as props inside RepoList
	console.log('state: ', state.reducers.repos)
	return {
		repos: state.reducers.repos
	};
}

//take this component/mapStateToProps and return a container
export default connect(mapStateToProps)(RepoList);

//<Repo repos={state.reducers.repos}/>