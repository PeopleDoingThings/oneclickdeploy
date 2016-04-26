import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { instanceReady, getLog, sshPostInstall } from '../actions/index'

class Loading extends Component {
  constructor(props){
    super(props); 
    console.log('props in loading constructor:' ,this.props);
    //console.log('getState', getState())
  }

  render() {
    return (
      <div>
       <h1>Loading.....</h1>
      </div>

    );
  }
}

//feben the openstack routes, during testing you must run the gettoken route each time you restart the server to reauth
//getconsoleoutput--->set timeout
//ssh postinstall cannot be run until checkready says isReady
//the sshpostinstall thing now requires req.query.repoid 1 time only
function mapStateToProps(state) {
  console.log('deploy state: ', state.reducers.load)
  return {
    Load: state.reducers.load
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ createInst, reInstall }, dispatch);
// }

export default connect(mapStateToProps)(Loading);