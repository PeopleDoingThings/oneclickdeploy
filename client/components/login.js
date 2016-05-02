import React, { Component } from 'react';
import Header from '../containers/header';
import {Motion, spring} from 'react-motion';

let topY = 70;
let bottomY = -225;

function showDetails() {
  this.setState( {topDiv: -400, bottomDiv: 0} );
}

function hideDetails() {
  this.setState( {topDiv: topY, bottomDiv: bottomY} );
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
            <Motion defaultStyle={{ y: -500 }} style={{ y: spring(100) }}>
            {IntroStyle =>
            <div style={{ textAlign: 'center', minHeight: 400, width: '100%', position: 'absolute', top: IntroStyle.y}}>
              <div className="login col-md-8 col-xs-10 col-centered">
                <div className="home-title">
                  <h1 className="logo">Git Hypervisor</h1>
                  <h3 className="tagline">one-click solution for app deployment</h3>
                </div>  
                <p>Wanna deploy your node.js app?</p>
                <p>It's easy! Just sign in to Github from our link below and choose the app to deploy from your public Github repos</p>
                <h1> Sign in with Github and get started</h1>
                <a href="http://localhost:9001/login/github" className="btn btn-primary">sign in</a>
                <button type="button" onClick={showDetails}> find out more </button>
              </div>
              
            </div>
            }
          </Motion>
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



