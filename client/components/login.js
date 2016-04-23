import React, { Component } from 'react';

export default class Login extends Component {
  render() {
    return (
      <div className="row row-centered">
        <div className="login col-md-4 col-centered">
          <h1> Sign in with Github and get started</h1>
          <a href="http://localhost:9001/login/github" className="btn btn-primary">sign in</a>
        </div>
      </div>  
    );
  }
}
