import React, { Component } from 'react';
import Deploy from '../containers/deploy';

export default class RepoItem extends Component {

  render(){ 
  	console.log('props in repo list-group-item',this.props)
  		return (
  			     	<li className="list-group-item">{this.props.repoItem.name}
  	            		<Deploy id={this.props.repoItem.repoid}/>
  				    </li>
  			     );
          }
}
