import React, { Component } from 'react';   
import {ListGroup, ListGroupItem, Button} from 'react-bootstrap';
//import {Motion, spring} from 'react-motion'; 
import ClassNames from 'classnames';  

function toggleDetails() {
  let sshLive = this.state.sshLive;
  this.setState( {sshLive: !sshLive} );
}

export default class InstanceInfo extends Component {
  constructor(props){
    super(props);
    this.state = {
      sshLive: true,
    }

    toggleDetails = toggleDetails.bind(this);
  }

  toggleDetails() {
    this.setState( {sshLive: !sshLive} );
  }

  render() {
    let sshLive = ClassNames( {sshLive: this.state.sshLive} );
    const instance = this.props.instance;
    const createdDate = "" + new Date( ""+instance.created );

    return (
      <div className="col-xs-12 col-sm-4 col-md-4 col-lg-4"> 
        <div className="site-ip">
          <div className="ip">{instance.ip.ip}</div>
          <button className="btn site-link" href={'http://' + instance.ip.ip} target="_blank">Visit Website</button>
          <div className="clearfix"></div>
        </div>  
        <div className="dashboard-bubbles">
          <div className="status-bubble"><p datatype="status"><span>{ (instance.status === 'ACTIVE') ? "LIVE" : "OFF" }</span></p></div>
          <div className="build-bubble"><p datatype="build"><span>{instance.status}</span></p></div>
        </div>   
        <div className="info-panel">
          <div className="instance-info col-md-6 col-sm-6 col-xs-12">
            <ul>
              <li>Created On</li>
              <li>{createdDate}</li>
            </ul>
            <ul>
              <li>OS</li>
              <li>{instance.imagename}</li>
            </ul>
          </div>
          <div className="instance-info col-md-6 col-sm-6 col-xs-12">
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
          <button className="ssh-button btn btn-primary" onClick={toggleDetails}>SSH Login Info</button>
            <div className={"sshList " + sshLive}>
              <ListGroup>
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

