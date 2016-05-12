import React, { Component } from 'react';
import {Motion, spring} from 'react-motion';
import { Glyphicon, glyph, Badge, Panel, Button } from 'react-bootstrap'

let topY = 60;
// let bottomY = -400;

// function showDetails() {
//   this.setState( {topDiv: -400, bottomDiv: 0} );
// }

// function hideDetails() {
//   this.setState( {topDiv: topY, bottomDiv: bottomY} );
// }

export default class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      topDiv: topY,
      open: true,
      //bottomDiv: bottomY
    }
    this.showDetails = this.showDetails.bind(this);
    // hideDetails = hideDetails.bind(this);
  }

  showDetails() {
    return this.setState({open: true});
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
                  <h2 style={{textAlign:'center'}} className="tagline">A fast way to put your node.js apps online</h2>
                </div>  
                {/*<h4 className="three-steps">How do I use this?</h4>*/}
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
                <a href="http://localhost:9001/login/github" className="btn btn-primary">sign in</a>
                <Button onClick={this.showDetails}> find out more </Button>
              </div>
            </div>
            }
          </Motion>
          </div>  
           }
        </Motion>
          <Panel collapsible expanded={this.state.open}>
          <p>Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid.
          Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident.
          </p>
        </Panel>  
      </div>
    );
  }
}

//<div className="home-details">
            // I wanna slide up</div>

