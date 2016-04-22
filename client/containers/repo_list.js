import React, { Component } from 'react';
import RepoList from '../components/repo_list_item'; 
import { connect } from 'react-redux';


class Repo extends Component {

  render() {
    return (
		 	<div className="list-group col-sm-4">
		 		<h3>Repo list is working</h3>
				<Repo />
		 	</div> 
    );
  }
}


function mapStateToProps(state) {
	//whatever gets returned here will show up
	//as props inside RepoList
	console.log('state: ',state)
	return {
		repos: state.reducers.repos
	};
}

//take this component/mapStateToProps and return a container
export default connect(mapStateToProps)(RepoList);