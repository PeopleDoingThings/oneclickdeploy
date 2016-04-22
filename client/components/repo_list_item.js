import React, { Component } from 'react';

export default class Repo extends Component {

  handleClick(event) {
    console.log('clicking works!', event);
  }
  renderList(){
  	console.log("this.props: ", this.props)
  	
  	return this.props.repos.map((repo) => {
  		return (
  				<li key={repo.name} className="list-group-item">{repo.name}
  				<div><button onClick={ this.handleClick }>deploy</button></div>
  				</li>
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
