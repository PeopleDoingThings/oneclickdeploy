import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ActionCreators from '../actions/index';

function handleReboot(e) {
  e.preventDefault();
  console.log('handling reboot')
  //rebootInstance();
}

function handleRescue(e) {
  e.preventDefault();
  console.log('handling rescue')
  //rescueInstance();
}

function handleReinstall(e) {
  e.preventDefault();
  console.log('handling reinstall')
  //reInstallInstance();
}

class InstanceButtons extends Component {
  constructor(props){
    super(props);

    handleReboot = handleReboot.bind(this);
    handleRescue = handleRescue.bind(this);
    handleReinstall = handleReinstall.bind(this);
  }

  render() {
    return (
      <div className="button-group">
        <button className="btn btn-primary" onClick={handleReboot}>Reboot</button>
        <button className="btn btn-primary" onClick={handleRescue}>Enable Rescue</button>
        <button className="btn btn-primary" onClick={handleReinstall}>Reinstall</button>
      </div>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ActionCreators), dispatch);
}

export default connect(mapDispatchToProps)(InstanceButtons);
