import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';
import { Glyphicon, glyph, Badge } from 'react-bootstrap'

let topY = 60;
let bottomY = -400;

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
      bottomDiv: bottomY
    }
    showDetails = showDetails.bind(this);
    hideDetails = hideDetails.bind(this);
  }
  render() {
    return (

      <div>
        <Motion defaultStyle={{ y: topY }} style={{ y: spring(this.state.topDiv) }}>
          {interpolatingStyle =>
          <div className="home-login" style={{height: '100%', width: '100%', position: 'absolute', top: interpolatingStyle.y}}>
            <Motion defaultStyle={{ y: -500 }} style={{ y: spring(100) }}>
            {IntroStyle =>
            <div style={{ textAlign: 'center', minHeight: 400, width: '100%', position: 'absolute', top: IntroStyle.y}}>
              <div className="login col-md-8 col-xs-10 col-centered">
                <div className="home-title">
                  <h1 className="logo">HyperJs</h1>
                  <h3 className="tagline">disclaimer: this app is for those who want to deploy their app
                    but cringe at any complicated deployment process</h3>
                </div>  
                <h2 className="three-steps">wanna give it a try? 3 simple steps</h2>
                <div className="node-intro col-md-4 max-size">
                  <h3>Got node?<Glyphicon glyph="ok" className="glyph" /></h3>
                  <p>you need a node.js app</p>
                  <img src="images/nodejs-logo.png" style={{maxWidth:'50%', height:'auto'}} alt="node.js logo" />
                </div>
                <div className="node-intro col-md-4">
                  <h3>Got github?<Glyphicon glyph="ok" className="glyph" /></h3>
                  <p>your app is in a public github repo</p>
                  <img src="images/Octocat.png" style={{maxWidth: '60%', height:'auto'}} alt="Github logo"/>
                </div>
                <div className="node-intro col-md-4">
                  <h3>Got Proc?<Glyphicon glyph="ok" className="glyph" /></h3>
                  <p>drop in a standard Procfile</p>
                  <img src="images/Octocat.png" style={{maxWidth: '60%', height:'auto'}} alt="Github logo" />
                </div>
                <a href="http://localhost:9001/login/github" className="btn btn-primary">sign in</a>
                <button type="button" className="btn" onClick={showDetails}> find out more </button>
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

//

