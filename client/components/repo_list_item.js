import React, { Component } from 'react';
//import Deploy from '../containers/deploy';

export default class RepoItem extends Component {

  render(){

    //  var date = new Date((this.props.repoItem.age).slice(0,19));
      return (

            <div>

              <b>Repo URL: </b><a href={this.props.repoItem.clone_url} target="blank">{this.props.repoItem.clone_url}</a>
              <br/>
              <b>Owned by:  </b>{this.props.repoItem.ownername}
              </div>
             );
          }
}