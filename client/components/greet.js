import React, { Component } from 'react';

export default class Greet extends Component {
  render() {
    return (
      <div className="row row-centered">
        <div className="login col-md-4 col-centered">
          <h4>{this.props.user.login}</h4>
        </div>
      </div>  
    );
  }
}
