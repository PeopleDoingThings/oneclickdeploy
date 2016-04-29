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
  console.log('look for slected repoID in construtore loading', this.props)
  
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
         console.log('log the id heree',component.props.SelectedRepoID)
          component.props.sshPostInstall(component.props.SelectedRepoID);
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
    }, 3000);
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
    }, 15000);
  }

function stopChckDeployedInterval() {
  clearInterval(ckDep2);
  console.log('really stopped chkdeployed interval now')
}

}
 
  render() {
    if(this.props.LogOutput.output){
    var logItem = this.props.LogOutput.output;
    var splitStr = logItem.split("\n");
    //console.log('test log output', splitStr)
    var lines = splitStr.map(function(line){return line})
    }
    
    console.log('props in render:', this.props.LogOutput.output)//log state.status later
    console.log('inst dat', JSON.stringify(this.props.InstData))
    return (
      <div>
        <h1>Loading.....</h1>{
          //<h1>Instance info:</h1>
        }
        
        <div> {this.props.InstData[0] ? this.props.InstData[0].id : null} </div> 
        <div></div>  
        <div className="log">
        <h6>Log Output</h6>
        {
          //{this.props.LogOutput.output ? this.props.LogOutput.output : null}
        }
        {splitStr ?  splitStr.map(line => <div>{line}</div>) : null  } 
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  // console.log('load state: ', state.reducers.load)
  // console.log('install data in loading state', state.reducers.install)
  console.log('state of all reducers in load now', state.reducers)
  return {
    Load: state.reducers.load,
    InstData: state.reducers.install,
    Data: state.reducers.instReady,
    InstStatus: state.reducers.instReady.isReady,
    DeployedStatus: state.reducers.isDeployed[0] ? state.reducers.isDeployed[0].deployed : null,
    LogOutput: state.reducers.logOutput,
    SelectedRepoID: state.reducers.selRepoId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ instanceReady, getLog, isDeployed, sshPostInstall }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Loading);