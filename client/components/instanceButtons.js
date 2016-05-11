import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Nav, NavItem, NavDropdown, MenuItem, Modal, Button, Tooltip, OverlayTrigger} from 'react-bootstrap'

import * as ActionCreators from '../actions/index';

class InstanceButtons extends Component {
  constructor(props){
    super(props);

   this.handleSelect = this.handleSelect.bind(this);
   this.close = this.close.bind(this);
   this.open = this.open.bind(this);

   this.state = {
      showModal: false,
      modalTitle: "",
      modalBody: "",
    }
  }

  timeoutSetState(title, body, delay) {
    this.setState({modalTitle: title, modalBody: body});
      setTimeout(() => {
        this.setState(function(previousState, currentProps) {
          const instance = currentProps.instanceButtons;
          console.log('modalBody:', instance)  
            return {modalBody: instance};
        })         
      }, delay);
  }

  handleSelect(eventKey) {
      event.preventDefault();
      switch (eventKey) {
        case '1.1':
          this.open();
          this.props.rebootInstance('soft');
          return this.timeoutSetState('Soft Reboot Status', 'Rebooting started', 3000);
 
        case '1.2':
          this.open();
          this.props.rebootInstance('hard');
          return this.timeoutSetState('Hard Reboot Status', 'Rebooting started', 3000);
        case '2.1':
          this.open();
          this.props.rescueInstance(true);
          return this.timeoutSetState('Rescue Mode Password', 'Enabling Rescue Mode', 4000);
          
        case '2.2':
          this.open();
          this.props.rescueInstance(false);
          return this.timeoutSetState('Rescue Mode Status', 'disabling Rescue Mode', 4000);
        case 3:
          this.open();
          this.props.reInstallInstance();
          return this.timeoutSetState('Reinstall Instance Status', 'Reinstalling Instance, please wait', 7000);

        default: return;
      }
  }

  close() {
    this.setState( {showModal: false} );
  }

  open() {
    this.setState( {showModal: true} );
  }

  render() {
    const modalBody = this.state.modalBody;
    const tooltip = (
      <Tooltip id='reinstall-instance-tooltip'><div><h2>Be Careful!</h2> <p>This will reinstall your instance and WHIP OUT your app. You will need to REDEPLOY your app after reinstall is complete.</p></div></Tooltip>
    );

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

          <OverlayTrigger placement="top" overlay={tooltip}>
            <NavItem eventKey={3}>Reinstall</NavItem>
          </OverlayTrigger>
          <NavDropdown eventKey={4} title="Back up" id="nav-dropdown">
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
          <Modal.Body>
            
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
  // console.log('load state: ', state.reducers.load)
  // console.log('install data in loading state', state.reducers.install)
  console.log('state of all reducers in load now', state.reducers.instanceButtons)
  return {
    instanceCtrls: state.reducers.instanceCtrls
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(InstanceButtons);
