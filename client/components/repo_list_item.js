import React, { Component } from 'react';
import Deploy from '../containers/deploy';

export default class RepoItem extends Component {

  render(){ 
  		return (
  			     	<li className="list-group-item">{this.props.repoItem.name}
  	            		<Deploy />
  				    </li>
  			     );
          }
}
