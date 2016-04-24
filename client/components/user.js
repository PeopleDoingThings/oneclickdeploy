import React, { Component } from 'react';

export default class UserProfile extends Component {

  render(){ 
  		return (
  				<div className="user-profile">
  				<h5>Hello: <div className ="git-handle">{this.props.user.login}</div></h5>
  				<ul className="list-group">
  				<img className="avatar" src={this.props.user.avatar_url} />
  				<li className="list-group-item">You have {this.props.user.followers} followers</li>
  				<li className="list-group-item">You are following {this.props.user.following} devs</li>
  				</ul>
  				</div>
 
  			);

  }  
}
