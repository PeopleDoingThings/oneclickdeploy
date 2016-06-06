import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Nav, NavItem, NavDropdown, MenuItem, Modal, Button, OverlayTrigger} from 'react-bootstrap'

import * as ActionCreators from '../actions/index';

class InstanceCtrls extends Component {
  constructor(props){
    super(props);

   //binding for all the onclick functions / instance ctrls 
   this.handleSelect = this.handleSelect.bind(this);
   this.close = this.close.bind(this);
   this.open = this.open.bind(this);
   this.softReboot = this.softReboot.bind(this);
   this.hardReboot = this.hardReboot.bind(this);
   this.startsRescue = this.startsRescue.bind(this);
   this.stopsRescue = this.stopsRescue.bind(this);
   this.reinstallInstance = this.reinstallInstance.bind(this);
   this.createBackup = this.createBackup.bind(this);
   this.getSnapshot = this.getSnapshot.bind(this);
   this.deleteBackup = this.deleteBackup.bind(this);
   this.listBackups = this.listBackups.bind(this);

   this.state = {
      showModal: false,
      modalTitle: "",
      modalBody: "",
      action: null,
      response: false,
      loading: false,
    }
  }

componentWillReceiveProps(nextProps) {
  if (nextProps.response) { this.setState({loading: false}); };
  this.setState({response: nextProps.response});
}

//
//Modal content and function to be called for each of the instance controls 
//  
  handleSelect(eventKey) {
      event.preventDefault();
      switch (eventKey) {
        case '1.1':
          this.open();
          this.setState({
            modalTitle: "Soft Reboot Instance", 
            modalBody: "Are you sure you want to soft reboot your instance? Be aware that this will cause your site to go down for a few seconds and your users will lose any open sessions.",
            action: this.softReboot,
          })
          return;
 
        case '1.2':
          this.open();
          this.setState({
            modalTitle: "Hard Reboot Instance", 
            modalBody: "Are you sure you want to hard reboot your instance? Be aware that this will cause your site to go down for a few seconds and your users will lose any open sessions.",
            action: this.hardReboot,
          })
          return;

        case '2.1':
          this.open();
          this.setState({
            modalTitle: "Start Rescue Mode", 
            modalBody: "Are you sure you want to start rescue mode? Be aware that this will cause your site to go down until you disable rescue mode",
            action: this.startsRescue,
          })
          return;
          
        case '2.2':
          this.open();
          this.setState({
            modalTitle: "Stop Rescue Mode", 
            modalBody: "Are you sure you want to disable rescue mode?",
            action: this.stopsRescue,
          })
          return;
          
        case 3:
          this.open();
          this.setState({
            modalTitle: "Reinstall Instance", 
            modalBody: "Are you sure you want to reinstall your instance? Be aware that this will cause your site to go down and you will have redeploy your app when reinstall is complete",
            action: this.reinstallInstance,
          })
          return;

        case '4.1':
          this.open();
          this.setState({
            modalTitle: "Create Backup", 
            modalBody: "Are you sure you want to create a backup?",
            action: this.createBackup,
          })
          return;

        case '4.2':
          this.open();
          this.setState({
            modalTitle: "Get Snapshot", 
            modalBody: "Are you sure you want to get a snapshot?",
            action: this.getSnapshot,
          })
          return; 

        case '4.3':
          this.open();
          this.setState({
            modalTitle: "List Backup", 
            modalBody: "Are you sure you want to get a list of all the backups?",
            action: this.listBackups,
          })
          return; 

        case '4.4':
          this.open();
          this.setState({
            modalTitle: "Delete Backups", 
            modalBody: "Are you sure you want to delete your backup?",
            action: this.deleteBackup,
          })
          return;     
  

        default: return;
      }
  }

//
//helper functions to open/close the modal window
//
  close() {
    this.setState({showModal: false, response: false});
  }

  open() {
    this.setState({showModal: true});
  }
//
//helper functions for all the instance controls
//
  softReboot() {
    this.props.rebootInstance('soft');
    this.setState({loading: true});
  }

  hardReboot() {
    this.props.rebootInstance('hard');
    this.setState({loading: true});
  }

  startsRescue() {
    this.props.rescueInstance(true);
    this.setState({loading: true});
  }

  stopsRescue() {
    this.props.rescueInstance(false);
    this.setState({loading: true});
  }

  reinstallInstance() {
    this.props.reInstallInstance();
    this.setState({loading: true});
  }

  //backup management functions
  createBackup() {
    this.setState({loading: true});
    this.props.createBackup();
  }

  getSnapshot() {
    this.props.getSnapshotStatus();
    this.setState({loading: true});
  }
  deleteBackup() {
    this.setState({loading: true});
    this.props.deleteBackup();   
  }

  listBackups() {
    this.props.listBackups();
    this.setState({loading: true});
  }

  //
  //render function for the responses of the instance controls
  //
  renderResponse() {
    let response = this.state.response;
    return (
      <Modal.Body>
        { ( typeof response === 'object' && !Array.isArray(response) ) 
          ? <ul>
              {
                Object.keys(response).map((key) => {
                return <li key={key}>{key}: {response[key]}</li>
                }) 
              }
            </ul>  
            : <div><h4>{response}</h4></div>
        }
      </Modal.Body>
    );
  }

  render() {
    const modalBody = this.state.modalBody;
    let response = this.state.response;
    return (
      <div>
        <Nav bsStyle="tabs" activeKey={1} onSelect={this.handleSelect}>
          <NavDropdown eventKey={1} title="Reboot" id="nav-dropdown">
            <MenuItem eventKey="1.1">Soft Reboot</MenuItem>
            <MenuItem eventKey="1.2">Hard Reboot</MenuItem>
          </NavDropdown>
          <NavDropdown eventKey={2} title="Rescue Mode" id="nav-dropdown">
            <MenuItem eventKey="2.1">Enable Rescue</MenuItem>
            <MenuItem eventKey="2.2">Disable Rescue</MenuItem>
          </NavDropdown>
            <NavItem eventKey={3}>Reinstall</NavItem>
          <NavDropdown eventKey={4} title="Backup" id="nav-dropdown">
            <MenuItem eventKey="4.1">Create Backup</MenuItem>
            <MenuItem eventKey="4.2">Get Snapshot Status</MenuItem>
            <MenuItem eventKey="4.3">List Backups</MenuItem>
            <MenuItem eventKey="4.4">Delete Backup</MenuItem>
          </NavDropdown>
        </Nav>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.modalTitle}</Modal.Title>
          </Modal.Header>

            {
              //Checking to see if the modal should display message to confirm if user wants to perform the action or the response instead if response is available.
            }

            {!response
              ? this.state.loading 
                ? <div className="loader">Loading...</div> 
                  : <div>
                      <Modal.Body>{this.state.modalBody}</Modal.Body>
                      <Button className= "btn-light" onClick={this.state.action}>Do it</Button>
                      <Button className= "btn-light" onClick={this.close}>Cancel</Button>
                    </div>
                    : this.renderResponse()
            }
          
          <Modal.Footer>
            <Button className= "btn-light" onClick={this.close}>Close</Button>
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
    instanceCtrls: state.reducers.instanceCtrls
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstanceCtrls);
