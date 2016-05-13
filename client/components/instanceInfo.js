import React, { Component } from 'react';   
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';
//import {Motion, spring} from 'react-motion'; 
import ClassNames from 'classnames';  

function showDetails() {
  this.setState( {sshLive: false} );
}

function hideDetails() {
  this.setState( {sshLive: true} );
}

export default class InstanceInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      sshLive: true
    }

    showDetails = showDetails.bind(this);
    hideDetails = hideDetails.bind(this);
  }

  render() {
    let sshLive = ClassNames( {sshLive: this.state.sshLive} );
    const instance = this.props.instance;
    const createdDate = "" + new Date( ""+instance.created );
    console.log('component props:', this.props)

    return (
      <div className="col-xs-12 col-md-4 col-lg-5">  
        <div className="info-panel">
          <div>
            <div className="ip">{instance.ip.ip}</div>
            <Button bsStyle="warning" href={'http://' + instance.ip.ip} target="_blank">go to site</Button>
            <div className="clearfix"></div>
          </div>  

          <div className="status-bubble">STATUS <span>{ (instance.status === 'ACTIVE') ? "LIVE" : "OFF" }</span></div>
          <div className="build-bubble">BUILD <span>{instance.status}</span></div>
          <div className="clearfix visible-xs-block"></div>
          <div className="col-md-6 col-xs-12">
            <ul>
              <li>Created On</li>
              <li>{createdDate}</li>
            </ul>
            <ul>
              <li>OS</li>
              <li>{instance.imagename}</li>
            </ul>
          </div>
          <div className="col-md-6 col-xs-12">
            <ul>
              <li>Location</li>
              <li>BHS 1</li>
            </ul>
            <ul>
              <li>CPU</li>
              <li>Cores: 1</li>
            </ul>
          </div>
          <div className="clearfix"></div>
        </div>  
        <div>
          <button className="ssh-button btn btn-primary" onClick={showDetails}>SSH Login Info</button>
            <div className={"sshList " + sshLive}>
              <ListGroup onClick={hideDetails}>
                <ListGroupItem><span>IP</span>{this.props.SSHLogin.ip}</ListGroupItem>
                <ListGroupItem><span>SSH User</span>{this.props.SSHLogin.sshuser}</ListGroupItem>
                <ListGroupItem><span>Password</span>{this.props.SSHLogin.password}</ListGroupItem>
              </ListGroup>
            </div>
        </div>
      </div>    
    )

  }
}   

