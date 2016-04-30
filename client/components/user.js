import React, { Component } from 'react';

export default class UserProfile extends Component {

  render(){
  		return (
        <div>
          <div className="main-logo">GHV</div>
  				<div className="user-profile">
            <img className="avatar" src={this.props.user.avatar_url} />
    				<div className ="user-details">
              <p>{this.props.user.name}</p>
              <p>{this.props.user.login}</p>
            </div>
  				</div>
        </div>
  			);

  }
}

// <ul className="list-group">
//               <li className="list-group-item">You have {this.props.user.followers} followers</li>
//               <li className="list-group-item">You are following {this.props.user.following} devs</li>
//             </ul>
