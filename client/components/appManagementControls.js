import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Nav, NavItem, NavDropdown, MenuItem, Modal, Button, OverlayTrigger} from 'react-bootstrap'

import * as ActionCreators from '../actions/index';

class AppControl extends Component {
  constructor(props){
    super(props);
    this.props.deployedRepo();

    this.handleSelect = this.handleSelect.bind(this);
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
    this.githubUpdate = this.githubUpdate.bind(this);
    this.restartRepo = this.restartRepo.bind(this);
    this.deleteRepo = this.deleteRepo.bind(this);
    this.reinstallRepo = this.reinstallRepo.bind(this);
    this.outputTop = this.outputTop.bind(this);
    this.outputForever = this.outputForever.bind(this);
    this.outputPrintEnv = this.outputPrintEnv.bind(this);
    this.outputUptime = this.outputUptime.bind(this);

    this.state = {
      showModal: false,
      modalTitle: "",
      modalBody: "",
      action: "",
    }

  }

  handleSelect(eventKey) {
      event.preventDefault();
      switch (eventKey) {
        case 1:
          this.open();
          this.setState({
            modalTitle: "Github Update", 
            modalBody: "Are you sure you want to update your Github Repo?",
            action: this.githubUpdate,
          })
          return;
        case 2:  
          this.open();
          this.setState({
            modalTitle: "Restart App", 
            modalBody: "Are you sure you want to restart your app? Be aware that this will cause your site to go down for a few seconds and your users will lose any open session.",
            action: this.restartRepo,
          })
          return;
        case 3:
          this.open();
          this.setState({
            modalTitle: "Reinstall App", 
            modalBody: "Are you sure you want to reinstall your app? Be aware that this will cause your site to go down for a few seconds and your users will lose any open session.",
            action: this.reinstallRepo,
          })
          return;
        case 4:  
          this.open();
          this.setState({
            modalTitle: "Delete App", 
            modalBody: "Are you sure you want to delete your app? Be aware that this will whip out your app and your site will no longer be available until you deploy again",
            action: this.deleteRepo,
          })
          return;
        case '5.1':  
          this.open();
          this.setState({
            modalTitle: "Output Top", 
            modalBody: "CPU Utilization",
            action: this.outputTop,
          })
          return;  
        case '5.2':  
          this.open();
          this.setState({
            modalTitle: "Output Forever", 
            modalBody: "Dont really know what this is and what the heck to say about it...lalala",
            action: this.outputForever,
          })
          return;  
        case '5.3':  
          this.open();
          this.setState({
            modalTitle: "Output PrintEnv", 
            modalBody: "Dont really know what this is and what the heck to say about it...lalala",
            action: this.outputPrintEnv,
          })
          return;   

        case '5.4':  
          this.open();
          this.setState({
            modalTitle: "Output Uptime", 
            modalBody: "Dont really know what this is and what the heck to say about it...lalala",
            action: this.outputUptime,
          })
          return;   
            
        default: return;
      }
  }

//modal window controll
  close() {
    this.setState( {showModal: false} );
  }

  open() {
    this.setState( {showModal: true} );
  }

  githubUpdate() {
    console.log('githubUpdate working')
    this.props.githubUpdate();
    this.close();
  }

//function to call actions based on onclick event and close modal window
  restartRepo() {
    console.log('restartRepo action calling')
    this.props.restartRepo();
    this.close();
  }

  reinstallRepo() {
    console.log('reinstall repo action starting', this.props.deployed.repoid);
    const repoId = this.props.deployed.repoid; 
    this.props.reinstallRepo(repoId);
    this.close();
  }


  deleteRepo() {
    console.log('delete repo action starting')
    this.props.deleteRepo();
    this.close();
  }

  outputTop() {
    console.log('outputTop action starting');
    this.props.outputTop();
    this.close();
  }

  outputForever() {
    console.log('outputForever action starting');
    this.props.outputForever();
    this.close();
  }

  outputPrintEnv() {
    console.log('outputPrintEnv action starting');
    this.props.outputprintEnv();
    this.close();
  }

  outputUptime() {
    console.log('outputUptime action starting');
    this.props.outputUptime();
    this.close();
  }

  render() {
    return (
      <div>
        <Nav bsStyle="tabs" onSelect={this.handleSelect}>
            <NavItem eventKey={1}>Github Update</NavItem>
            <NavItem eventKey={2}>Restart App</NavItem>
            <NavItem eventKey={3}>Reinstall App</NavItem>
            <NavItem eventKey={4}>Delete App</NavItem>
            <NavDropdown eventKey={5} title="Status Update" id="nav-dropdown">
              <MenuItem eventKey="5.1">Top</MenuItem>
              <MenuItem eventKey="5.2">Forever</MenuItem>
              <MenuItem eventKey="5.3">Print Environment Variables</MenuItem>
              <MenuItem eventKey="5.4">Up Time</MenuItem>
            </NavDropdown>
        </Nav>

        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.modalBody}
            <Button onClick={this.state.action}>Do it</Button>
            <Button onClick={this.close}>Cancel</Button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>

      </div>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ActionCreators), dispatch);
}


function mapStateToProps(state) {
  return {
   
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppControl);
