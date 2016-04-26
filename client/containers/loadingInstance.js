import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { instanceReady, getLog, sshPostInstall } from '../actions/index'

class Loading extends Component {
  constructor(props){
    super(props); 

    console.log('props in loading constructor:' ,this.props);
    console.log('loading constructor install data', this.props)

   
  //   componentWillReceiveProps(nextProps) {
  //   const { state: { status: currStatus } } = this.props;
  //   const { state: { status: nextStatus } } = nextProps;

  //   if (currState === 'Stopped' && nextState === 'Running') {
  //     this._startTimer();
  //   } else if (currState === 'Running' && nextState === 'Stopped') {
  //     this._stopTimer();
  //   }


// startInterval();
// stopInterval();
}


  render() {
    //console.log('props in render:', this.props)
    return (
      <div>
       <h1>Loading.....</h1>
       <div>Testing Log</div>
       <div>Instance info (repo url for testing):</div><div> {this.props.InstData[0] ? this.props.InstData[0].id : null} )</div>

      </div>

    );
  }
}
//1.grab Install data ---> display flavor, cpu, ram
//feben the openstack routes, during testing you must run the gettoken route each time you restart the server to reauth
//getconsoleoutput--->set timeout
//ssh postinstall cannot be run until checkready says isReady
//the sshpostinstall thing now requires req.query.repoid 1 time only


// const setIntervalLog = function (getLogfct,params) {
//    setInterval(() => {
//       getLogfct(params);
//     }, 1000);
// }

let id='';
function  startInterval() {
    id = setInterval(() => {
        console.log('working');
    }, 1000);
  }

// function stopInterval() {
//   clearInterval(id);
// }

function mapStateToProps(state) {
  console.log('load state: ', state.reducers.load)
  console.log('install data in loading state', state.reducers.install)
  return {
    Load: state.reducers.load,
    InstData: state.reducers.install
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ instanceReady, getLog, sshPostInstall }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Loading);