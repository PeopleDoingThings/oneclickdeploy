import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { instanceReady, getLog, isDeployed, sshPostInstall } from '../actions/index';

class Loading extends Component {
  constructor(props){
  super(props); 
  this.props.getLog();
  var component = this ;  
  component.props.instanceReady();
  
//set interval for logoutput
var logOutput0 ='';
function startLogOutputInterval() {     
    logOutput0 = setInterval(function () {
        component.props.getLog();
        console.log('what is logoutput in interval',component.props.LogOutput.output)
      }, 3000);
}

function stopLogOutputInterval() {
  clearInterval(logOutput0);
  console.log('really stopped logoutput now')
}

startLogOutputInterval();

//set interval for check instance
let cksInsID1 ='';
function startChckInstInterval() {     
    cksInsID1 = setInterval(function () {
      console.log(' set timeout props checkInst', component.props.InstStatus)    
        if(component.props.InstStatus=== undefined){
          console.log('inst status undefiend ')
        }
        if(component.props.InstStatus === true){        
          console.log('if statement InstStatus is true')
          console.log('about to stop Interval')
         //call postinstall endpoint
          component.props.sshPostInstall();
          console.log('called postinstall')
         //start set interval2/check deployed 
          startChckDeployedInterval();
         //stop set interval1 if it already started 
          stopChckInstInterval(); 
        }
        else if (component.props.InstStatus === false) {
          //if still false call api again
          console.log('check instance ready is still false')
          component.props.instanceReady();
        }
    }, 5000);
}

function stopChckInstInterval() {
  clearInterval(cksInsID1);
  console.log('really stopped  checkinst ready interval now')
} 

startChckInstInterval();

//set interval for checkdeployed
let ckDep2 ='';
function startChckDeployedInterval() {     
    ckDep2 = setInterval(function () {
      console.log(' set timeout props deployed', component.props.DeployedStatus)    
        if(component.props.DeployedStatus === undefined){
          console.log('depl status undefiend ')
        }
        if(component.props.DeployedStatus === true){           
          console.log('isDeployed statement is true')
          console.log('about to stop Interval 2 checkdeployed')
         //stop interval2 log output
        stopLogOutputInterval();
        stopChckDeployedInterval(); 
        //transition to DB
         //window.location = 'http://localhost:9001/#/dashboard';
        }
        else if (component.props.DeployedStatus === null||component.props.DeployedStatus === false) {
          //if still false call api again
          console.log('check isDeployed ready is still false')
          component.props.isDeployed();
        }
    }, 10000);
  }

function stopChckDeployedInterval() {
  clearInterval(ckDep2);
  console.log('really stopped chkdeployed interval now')
}

}
 
  render() {
    console.log('props in render:', this.props.LogOutput.output)//log state.status later
    return (
      <div>
        <h1>Loading.....</h1>
        <div>Testing Log</div>
        <div>Instance info:</div><div> {this.props.InstData[0] ? this.props.InstData[0].id : null} )</div>   
        <div>Log Output</div>{this.props.LogOutput.output}   
      </div>
    );
  }
}


function mapStateToProps(state) {
  // console.log('load state: ', state.reducers.load)
  // console.log('install data in loading state', state.reducers.install)
  console.log('state of log reducers', state.reducers.logOutput)
  return {
    Load: state.reducers.load,
    InstData: state.reducers.install,
    InstStatus: state.reducers.instReady.isReady,
    DeployedStatus: state.reducers.isDeployed[0] ? state.reducers.isDeployed[0].deployed : null,
    LogOutput: state.reducers.logOutput
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ instanceReady, getLog, isDeployed, sshPostInstall }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Loading);