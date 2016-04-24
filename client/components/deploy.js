import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { deploy } from '../actions/index';

class Deploy extends Component {

  render() {
    console.log('props in deploy',this)
    return (
     <div onClick={() => this.props.deploy()}><button className="btn btn-primary">Deploy</button></div> 
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deploy }, dispatch);
}

export default connect(null, mapDispatchToProps)(Deploy);