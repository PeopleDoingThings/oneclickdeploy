import React, { Component } from 'react';
//import Deploy from '../containers/deploy';

export default class RepoItem extends Component {

  render(){
  	//console.log('props in repo list-group-item',this.props)
  		console.log ('props in repo item', this.props)
      var date = new Date((this.props.repoItem.age).slice(0,19));
      return (

  					<div>
  			     	
              <b>Date Created:  </b>{date.toString()}
              <br/>
              <b>Owner's Name:  </b>{this.props.repoItem.ownername}

  				    </div>
  			     );
          }
}
