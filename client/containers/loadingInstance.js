import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { instanceReady, getLog, isDeployed, sshPostInstall } from '../actions/index'

class Loading extends Component {
  constructor(props){
    super(props); 

    console.log('props in loading constructor:' ,this.props);
    console.log('loading constructor install data', this.props)


   startChckInstInterval();
}


  render() {
    //console.log('props in render:', this.props)//log state.status later
    return (
      <div>
       <h1>Loading.....</h1>
       <div>Testing Log</div>
       <div>Instance info (repo url for testing):</div><div> {this.props.InstData[0] ? this.props.InstData[0].id : null} )</div>

      </div>

    );
  }
}

// // const setIntervalLog = function (getLogfct,params) {
// //    setInterval(() => {
// //       getLogfct(params);
// //     }, 1000);
// // }

// //set interval for load data
//           // let logOuput0 ='';
//           // function  startLogOutputInterval() {
//           //     logOuput0 = setInterval(() => {
//           //         console.log('working ckInstnace');
//           //     }, 1000);
//           //   }

//           // function stopLogOutputInterval() {
//           //   clearInterval(logOuput0);
//           // }

//set interval for check instance
let cksInsID1 ='';
function  startChckInstInterval() {
    cksInsID1 = setInterval(() => {
        if(this.props.isReady === true){
         //stop set interval1 if it already started 
         stopChckInstInterval();  
         //postinstall endpoint
         this.props.sshPostInstall();
         //start set interval2/check deployed 
         startChckDeployedInterval();
        }
        else if (this.props.isReady === false) {
          checkinstance endpoint
        }
    }, 1000);
}

function stopChckInstInterval() {
  clearInterval(cksInsID1);
}

// //set interval for checkdeployed
            let ckDep2 ='';
            function  startChckDeployedInterval() {
                ckDep2 = setInterval(() => {
                  if(this.props.isDeployed === true) {
                    //stop interval2 log output
                    //stopLogOutputInterval();
                    //transition to DB
                    //code for transiotn to DB
                  }else if(this.props.isDeployed===false){
                    this.props.isDeployed();
                  }    
                }, 1000);
            }
            
            function stopChckDeployedInterval() {
              clearInterval(ckDep2);
            }


function mapStateToProps(state) {
  console.log('load state: ', state.reducers.load)
  console.log('install data in loading state', state.reducers.install)
  return {
    Load: state.reducers.load,
    InstData: state.reducers.install,
    InstStatus: state.reducers.instReady,
    isDeployed: state.reducers.isDeployed
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ instanceReady, getLog, isDeployed, sshPostInstall }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Loading);