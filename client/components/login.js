import React, { Component } from 'react';
import Header from '../containers/header';
import {Motion, spring} from 'react-motion';
import { Tabs, Tab } from 'react-bootstrap'

let topY = 75;
let bottomY = -225;

function showDetails() {
  this.setState( {topDiv: -400, bottomDiv: 0} );
  console.log(this.state.bottomDiv)
}

function hideDetails() {
  this.setState( {topDiv: topY, bottomDiv: bottomY} );
  console.log(this.state.bottomDiv)
}

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topDiv: topY,
      bottomDiv: bottomY,
    }
    showDetails = showDetails.bind(this);
    hideDetails = hideDetails.bind(this);
  }
  render() {
    return (
      <div>
        <Header />
        <Motion defaultStyle={{ y: topY }} style={{ y: spring(this.state.topDiv) }}>
          {interpolatingStyle =>
          <div className="home-login" style={{height: '100%', width: '100%', position: 'absolute', top: interpolatingStyle.y}}>
            <div className="row row-centered">
              <div className="login col-md-4 col-centered">
                <h1> Sign in with Github and get started</h1>
                <a href="http://localhost:9001/login/github" className="btn btn-primary">sign in</a>
              </div>
            </div>
          <button type="button" onClick={showDetails}> find out more </button>
          </div>
           }
        </Motion>
        <Motion defaultStyle={{y: bottomY}} style={{ y: spring(this.state.bottomDiv) }}>
          {interpolatingStyle =>
          <div className="home-details" style={{ height: 400, width: '100%', position: 'absolute', bottom: interpolatingStyle.y}} onClick={hideDetails}>
            I wanna slide up</div>
          }
        </Motion>
      </div>
    );
  }
}



