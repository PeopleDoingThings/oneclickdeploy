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
                <a href="http://localhost:9001/login/github" className="signIn">Sign in</a>
                <h4>Feeling confused? See below</h4>
                <button className="tooltips" onClick={this.showDetails}><span>Find out more</span></button>
              </div>
          </div>  

          <div id="homeDetails" className={ "home-details " + slideUp + slideDown }>
            <div className="col-md-4"><h3>How does this work?</h3>
              <div className="image"><span className="instance"></span></div>
              <p>We're trying to make it easier to put new projects online.</p>
            </div>
            <div className="col-md-4"><h3>Why Node & how about my database?</h3>
              <div className="image"><span className="node"></span></div>
              <p>All software has to start somewhere. Chrome wasn't built in a day. We like node.js.</p>
              <p>As far as storage goes, there are a lot of great databases out there. We're supporting
              MongoDB and PostgreSQL, because that's what the person at Starbucks with all the programming
              stickers on their MacBook said we should do.</p>
            </div>
            <div className="col-md-4"><h3>What's a Procfile?</h3>
              <div className="image"><span className="procfile"></span></div>
              <p>It's a file in the root directory of your app that tells us how to launch everything.
                 We look through your github repos for a Procfile that uses node. If you want to
                 read more about them, Heroku has <a href="https://devcenter.heroku.com/articles/procfile">the cannonical guide.</a></p>
            </div>
              <div className="clearfix"></div>
              <div className="controls">
              <a href="#" className="controlButton" onClick={this.hideDetails}>Back to the top</a>
              </div>
          </div>
      </div>
    )
  }
}


