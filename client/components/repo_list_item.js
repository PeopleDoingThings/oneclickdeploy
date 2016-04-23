import React, { Component } from 'react';

export default class RepoItem extends Component {

  handleClick(event) {
    console.log('clicking works!', event);
  }

  render(){ 
  		return (
  				<li className="list-group-item">{this.props.repoItem.name}
  				<div><button className="btn btn-primary" onClick={ this.handleClick }>deploy</button></div>
  				</li>
   
  			);

  }

  
}
