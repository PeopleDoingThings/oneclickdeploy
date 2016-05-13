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
                  <h1 className="logo">HyperJs</h1>
                  <h2 style={{textAlign:'center'}} className="tagline">A fast way to put your node.js apps online</h2>
                </div>  
                <div className="node-intro col-md-4 max-size">
                  <h3>node<Glyphicon glyph="ok" className="glyph" /></h3>
                  <p>1. Write a node.js app</p>
                  <img src="images/nodejs-logo.png" style={{maxWidth:'50%', height:'auto'}} alt="node.js logo" />
                </div>
                <div className="node-intro col-md-4">
                  <h3>github<Glyphicon glyph="ok" className="glyph" /></h3>
                  <p>2. Put it in a public github repo</p>
                  <img src="images/Octocat.png" style={{maxWidth: '60%', height:'auto'}} alt="Github logo"/>
                </div>
                <div className="node-intro col-md-4">
                  <h3>Procfile<Glyphicon glyph="ok" className="glyph" /></h3>
                  <p>3. Add a standard Procfile</p>
                  <img src="images/gear.png" style={{maxWidth: '55%', height:'auto'}} alt="Procfile logo" />
                </div>
                <p>Everything sounds good? Get started by signing into Github</p>
                <a href="http://localhost:9001/login/github" className="signIn btn btn-primary">sign in</a>
                <h4>Feeling confused? See below</h4>
                <button className="tooltips" onClick={this.showDetails}><span>find out more</span></button>
              </div>
          </div>  

          <div id="homeDetails" className={ "home-details " + slideUp + slideDown } onClick={this.hideDetails}>
            <div className="col-md-4"><h2>Step one</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis augue cursus odio egestas elementum. Suspendisse pretium metus vel velit finibus luctus.</p>
            </div>
            <div className="col-md-4"><h2>Step two</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis augue cursus odio egestas elementum. Suspendisse pretium metus vel velit finibus luctus.</p>
            </div>
            <div className="col-md-4"><h2>Step two</h2>
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis quis augue cursus odio egestas elementum. Suspendisse pretium metus vel velit finibus luctus.</p>
            </div>
          </div>
      </div>
    )
  }
}


