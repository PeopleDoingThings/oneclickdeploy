import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { createInst, reInstall } from '../actions/index';

class Deploy extends Component {

  render() {
    console.log('props in deploy',this)
    return (
     <div onClick={() => deploy(this.props.createInst,this.props.reInstall)}><button className="btn btn-primary">Deploy</button></div> 
    );
  }
}

function deploy(createInstFcn,reInstallFct){
	createInstFcn();
	reInstallFct();
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createInst, reInstall }, dispatch);
}

export default connect(null, mapDispatchToProps)(Deploy);
