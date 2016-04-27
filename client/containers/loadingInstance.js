import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { instanceReady, getLog, isDeployed, sshPostInstall } from '../actions/index';

class Loading extends Component {
  constructor(props){
    super(props); 

  var component = this ;  
  component.props.instanceReady()
  
  let cksInsID1 ='';
  function startChckInstInterval() {     
      cksInsID1 = setInterval(function () {
        console.log(' set timeout props', component.props.InstStatus)    
          if(component.props.InstStatus=== undefined){
            console.log('inst status undefiend ')
          }
          if(component.props.InstStatus === true){          
           //postinstall endpoint
           
            console.log('if statement of true')
            console.log('about to stop Interval')
          // component.props.sshPostInstall();
           //start set interval2/check deployed 
           //startChckDeployedInterval();
           //stop set interval1 if it already started 
           stopChckInstInterval(); 
          }
          else if (component.props.InstStatus === false) {
            console.log('check instance ready is still false')
           //component.props.instanceReady();
          }
      }, 1000);
  }

startChckInstInterval();
  function stopChckInstInterval() {
  clearInterval(cksInsID1);
  console.log('really stopped now')
} 

 }
 
  render() {
    //console.log('props in render:', this.props)//log state.status later
    return (
      <div>
       <h1>Loading.....</h1>
       <div>Testing Log</div>
       {
        //console.log('in render logging this.props', this.props.InstStatus)
       }
       <div>Instance info (repo url for testing):</div><div> {this.props.InstData[0] ? this.props.InstData[0].id : null} )</div>      
      </div>

    );
  }
}


// // // const setIntervalLog = function (getLogfct,params) {
// // //    setInterval(() => {
// // //       getLogfct(params);
// // //     }, 1000);
// // // }

// // //set interval for load data
// //           // let logOuput0 ='';
// //           // function  startLogOutputInterval() {
// //           //     logOuput0 = setInterval(() => {
// //           //         console.log('working ckInstnace');
// //           //     }, 1000);
// //           //   }

// //           // function stopLogOutputInterval() {
// //           //   clearInterval(logOuput0);
// //           // }

// //set interval for check instance
// let cksInsID1 ='';
// function  startChckInstInterval() {
//       console.log('startinterval being called')
//     cksInsID1 = setTimeout(() => {
//         if(this.props.InstStatus === true){
//          //stop set interval1 if it already started 
//          //stopChckInstInterval();  
//          //postinstall endpoint
//           console.log('if statement of strartint')
//         // this.props.sshPostInstall();
//          //start set interval2/check deployed 
//          //startChckDeployedInterval();
//         }
//         else if (this.props.InstStatus === false) {
//           console.log('else in interval')
//          //this.props.instanceReady();
//         }
//     }, 1000);
// }

// function stopChckInstInterval() {
//   clearInterval(cksInsID1);
// }

// // //set interval for checkdeployed
//             let ckDep2 ='';
//             function  startChckDeployedInterval() {
//                 ckDep2 = setInterval(() => {
//                   if(this.props.isDeployed === true) {
//                     //stop interval2 log output
//                     //stopLogOutputInterval();
//                     //transition to DB
//                     //code for transiotn to DB
//                   }else if(this.props.isDeployed===false){
//                     this.props.isDeployed();
//                   }    
//                 }, 1000);
//             }
            
//             function stopChckDeployedInterval() {
//               clearInterval(ckDep2);
//             }


function mapStateToProps(state) {
  console.log('load state: ', state.reducers.load)
  console.log('install data in loading state', state.reducers.install)
  console.log('state of instReady', state.reducers.instReady.isReady)
  return {
    Load: state.reducers.load,
    InstData: state.reducers.install,
    InstStatus: state.reducers.instReady.isReady,
    isDeployed: state.reducers.isDeployed
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ instanceReady, getLog, isDeployed, sshPostInstall }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Loading);