import React, { Component } from 'react';
import { Glyphicon, glyph, Badge } from 'react-bootstrap'

export default class UserProfile extends Component {

  render(){
  		return (
        <div>
          <div className="sidebar-logo"></div>
  				<div className="user-profile">
            <ul className="user-profile-widget">
              <li><button><Glyphicon glyph="cog" /></button></li>
              <li><img className="avatar" src={this.props.user.avatar_url} /></li>
              <li><button><Badge pullRight="true">1</Badge><Glyphicon glyph="bell" /></button></li>
            </ul>
    				<div className ="user-details">
              <p className="name">{this.props.user.name}</p>
              <p className="handle">{this.props.user.login}</p>
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
