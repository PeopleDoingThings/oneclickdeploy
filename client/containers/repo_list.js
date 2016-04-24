import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import RepoItem from '../components/repo_list_item'; 
import { fetchRepos } from '../actions/index';


class RepoList extends Component {
  constructor(props) {
    super(props);
    this.props.fetchRepos()
    console.log('props in repoList: ', this.props);
  }


  renderList() {
    if (this.props.repos.length === 0 || this.props.repos === undefined || this.props.repos[0].length === 0){
      return "Loading....."
    } else {
      return (this.props.repos.map((repo) => {
        return (
          <RepoItem key={repo.id}  repoItem={repo} />
        )
        })
      );
    }
  } 

  render() {
    
    return (
		 	<div>
		 		<h3>Repo list</h3>
				<ul className="list-group">
         {this.renderList()}
        </ul>
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
export default connect(mapStateToProps, mapDispatchToProps)(RepoList);
