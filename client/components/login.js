import React, { Component } from 'react';
//import {Motion, spring} from 'react-motion';
import ClassNames from 'classnames';
import { Glyphicon, glyph, Badge, Panel, Button, Tooltip } from 'react-bootstrap'

export default class Login extends Component {
  constructor(props){
    super(props);
    this.handleScroll = this.handleScroll.bind(this); 
  }

  componentDidMount() {
    console.log('mounting')
    window.addEventListener('scroll', this.handleScroll);
    this.scrollOne.className="col-md-4 col-sm-4 col-xs-12 scroll-hide";
    this.scrollTwo.className="col-md-4 col-sm-4 col-xs-12 scroll-hide";
    this.scrollThree.className="col-md-4 col-sm-4 col-xs-12 scroll-hide";
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll(event) {
    if (this.scrollOne !== null && this.scrollTwo !== null && this.scrollThree !== null) {
      let scrollTop = event.srcElement.body.scrollTop;
      if(scrollTop > 221){
        this.scrollOne.className="col-md-4 col-sm-4 col-xs-12 scroll-show";
      }

      if(scrollTop > 350) {
        this.scrollTwo.className="col-md-4 col-sm-4 col-xs-12 scroll-show";
      }

      if(scrollTop > 450) {
        this.scrollThree.className="col-md-4 col-sm-4 col-xs-12 scroll-show";
      }
    }
  }

  render() {
    const year = new Date().getFullYear();
    return (
     <div>
          <div className={"home-login "}>
              <div className="home-title">
                 <div className="main-logo"></div>
                  <h3 style={{textAlign:'center'}} className="tagline">A fast way to put your node.js apps online</h3>
              </div>    
              <div className="login col-centered">  
                <div datatype="1" className="intro col-md-4 col-sm-4 col-xs-12">
                  <h2>node</h2>
                  <p>Write a node.js app</p>
                  <img src="images/nodejs-logo.png" alt="node.js logo" />
                </div>
                <div datatype="2" className="intro col-md-4 col-sm-4 col-xs-12">
                  <h2>github</h2>
                  <p>Put it in a public github repo</p>
                  <img src="images/Octocat.png" alt="Github logo"/>
                </div>
                <div datatype="3" className="intro col-md-4 col-sm-4 col-xs-12">
                  <h2>Procfile</h2>
                  <p>Add a standard Procfile</p>
                  <img src="images/gear.png" alt="Procfile logo" />
                </div>
              </div>
              <div className="clearfix"></div>
              <p className="login-intro">Everything sounds good? Get started by signing into Github</p>
              <a href="/login/github" className="signIn">Sign in</a>
              <button className="tooltips"><span>Feeling confused? See below</span></button>
          </div>  

          <div className="home-details">
            <div datatype="instance" ref={(ref) => this.scrollOne =ref}><Glyphicon glyph="cloud-upload" /><h3>One app deployed at a time</h3>
              <p>At this time, you can only deploy one app at a time, but we may expand that in the future.</p>
            </div>
            <div datatype="node" ref={(ref) => this.scrollTwo =ref}><Glyphicon glyph="tasks" /><h3>Why Node & how about my database?</h3>
              <p>All software has to start somewhere. Chrome wasn't built in a day. We like node.js.</p>
              <p>As far as storage goes, there are a lot of great databases out there. We're supporting
              MongoDB and PostgreSQL, because that's what the person at Starbucks with all the programming
              stickers on their MacBook said we should do.</p>
            </div>
            <div datatype="procfile" ref={(ref) => this.scrollThree =ref}><Glyphicon glyph="folder-open" /><h3>What's a Procfile?</h3>
              <p>It's a file in the root directory of your app that tells us how to launch everything.
                 We look through your github repos for a Procfile that uses node. If you want to
                 read more about them, Heroku has <a href="https://devcenter.heroku.com/articles/procfile">the cannonical guide.</a></p>
            </div>
          </div>
          <div className="detail-panel repo-filtering">
            <div className="text">
              <h2>Auto Repo filtering</h2>
              <p>When you log in to your github account, all the repos that are available to deploy on our site are automatically filtered to make your deployment workflow as easy as possible. Just select the repo you want to deploy from the list, enter all your environmental variables and you are good to go</p>
            </div>
            <img src="../images/repo.jpg" />
          </div>
          <div className="detail-panel instance-control">
            <div className="text">
              <h2>Instance Management</h2>
              <p>We provide many useful tools for you to manage your instance directly from this app. You can reboot, reinstall, enter/exit rescue mode and manage backups as well as monitoring all the relevant information about your instance</p>
            </div>
            <img src="../images/dashboard.jpg" alt="Image example of the instance control dashboard"/>
          </div>
          <div className="detail-panel app-control">
            <div className="text">
              <h2>App Management</h2>
              <p>We also have great tools for your app management needs. You can change your subdomain name, update the deployed repo from github, reinstall, restart, delete app and perform all the status updates you need</p>
            </div>
            <img src="../images/app.jpg" alt="Image example of the app management dashboard"/>
          </div>
          <footer>copyright &copy; {year} hyperjs.io</footer>
      </div>
    )
  }
}


