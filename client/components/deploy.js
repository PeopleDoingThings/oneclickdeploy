import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { createInst, reInstall } from '../actions/index';

class Deploy extends Component {
 constructor(props){
    super(props); 
    console.log('props in deploy constructor:' ,this.props);
  }

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

function mapStateToProps(state) {
  console.log('deploy state: ', state.reducers.auth)
  return {
    Install: state.reducers.install
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ createInst, reInstall }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Deploy);
