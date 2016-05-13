import React, { Component } from 'react';

export default class ErrorHandler extends Component {
  render() {
    return (
      <div className="row row-centered">
        <div className="login col-md-4 col-centered">
          <h1>Sorry we have encountered an error...</h1>
          <h1>Please contact support</h1>
          <h6>{this.props.errorMsg}</h6>
        </div>
      </div>  
    );
  }
}