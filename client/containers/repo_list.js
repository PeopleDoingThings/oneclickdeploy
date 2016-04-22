import React, { Component } from 'react';
// import Repo from '../components/repo_list_item';  <Repo />
import { connect } from 'react-redux';


class RepoList extends Component {
  renderList(){
  	console.log("this.props: ", this.props)
  	
  	return this.props.repos.map((repo) => {
  		return (
  			<li key={repo.name} className="list-group-item">{repo.name}</li>
  			);
  	});
  }

  render() {
    return (
      <ul className="list-group col-sm-4">
        <h3>Repo list is working</h3>
		{this.renderList()}        
      </ul>  
    );
  }
}


function mapStateToProps(state) {
	//whatever gets returned here will show up
	//as props inside RepoList
	console.log('state: ',state)
	return {
		repos: state.reducers.repos
		//repos: 'xyz'
	};
}

//take this component/mapStateToProps and return a container
export default connect(mapStateToProps)(RepoList);