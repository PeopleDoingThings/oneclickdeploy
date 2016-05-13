import React, { Component } from 'react';
//import {Motion, spring} from 'react-motion';
import ClassNames from 'classnames';
import { Glyphicon, glyph, Badge, Panel, Button, Tooltip } from 'react-bootstrap'

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      up: false,
      down: false,
    }

    this.showDetails = this.showDetails.bind(this);
    this.hideDetails = this.hideDetails.bind(this);
    
  }

  showDetails() {
    this.setState({up: true});
    this.setState({down: false});
  }

  hideDetails() {
    this.setState({up: false});
    this.setState({down: true});
  }


  render() {
    let slideUp = ClassNames({slideUp: false});
    let slideDown = ClassNames({slideDown: false});
    if (this.state.up === true) {
      slideUp = ClassNames({slideUp: true});
    } 
    if (this.state.down === true) {
      slideDown = ClassNames({slideDown: true});
    }
    return (
     <div>
          <div className={"home-login " + slideUp + slideDown}>
              <div className="login col-centered">
                <div className="home-title">
                 <div className="main-logo"></div>
                  <h3 style={{textAlign:'center'}} className="tagline">A fast way to put your node.js apps online</h3>
                </div>  
                <div className="intro col-md-4 col-xs-12">
                  <h2>node<Glyphicon glyph="ok" className="glyph" /></h2>
                  <p>1. Write a node.js app</p>
                  <img src="images/nodejs-logo.png" style={{maxWidth:'50%', height:'auto'}} alt="node.js logo" />
                </div>
                <div className="intro col-md-4 col-xs-12">
                  <h2>github<Glyphicon glyph="ok" className="glyph" /></h2>
                  <p>2. Put it in a public github repo</p>
                  <img src="images/Octocat.png" style={{maxWidth: '60%', height:'auto'}} alt="Github logo"/>
                </div>
                <div className="intro col-md-4 col-xs-12">
                  <h2>Procfile<Glyphicon glyph="ok" className="glyph" /></h2>
                  <p>3. Add a standard Procfile</p>
                  <img src="images/gear.png" style={{maxWidth: '48%', height:'auto'}} alt="Procfile logo" />
                </div>
                <div className="clearfix"></div>
                <p className="login-intro">Everything sounds good? Get started by signing into Github</p>
                <a href="http://localhost:9001/login/github" className="signIn">sign in</a>
                <h4>Feeling confused? See below</h4>
                <button className="tooltips" onClick={this.showDetails}><span>find out more</span></button>
              </div>
          </div>  

          <div id="homeDetails" className={ "home-details " + slideUp + slideDown }>
            <div className="col-md-4"><h3>One virtual instance & one app at a time</h3>
              <div className="image"><span className="instance"></span></div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis augue cursus odio egestas elementum. Suspendisse pretium metus vel velit finibus luctus.</p>
            </div>
            <div className="col-md-4"><h3>Why Node & how about my database?</h3>
              <div className="image"><span className="node"></span></div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis augue cursus odio egestas elementum. Suspendisse pretium metus vel velit finibus luctus.</p>
            </div>
            <div className="col-md-4"><h3>and what's a procfile?</h3>
              <div className="image"><span className="procfile"></span></div>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis augue cursus odio egestas elementum. Suspendisse pretium metus vel velit finibus luctus.</p>
            </div>
              <div className="clearfix"></div>
              <div className="controls">
              <a href="http://localhost:9001/login/github" className="controlButton">Get Started</a>
              <a href="#" className="controlButton" onClick={this.hideDetails}>back to the top</a>
              </div>
          </div>
      </div>
    )
  }
}


