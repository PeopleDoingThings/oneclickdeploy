import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { instanceReady, getLog, isDeployed, sshPostInstall, updateLogFile, setSubdomain } from '../actions/index';
import  ReactCountdownClock from 'react-countdown-clock';
import { Modal, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import io from 'socket.io-client';


//const socket = io.connect('/');

class Loading extends Component {
  constructor(props){
  super(props); 
  this.state = {
    selectedSubdomain: 'test',
    Step_One: true,
    Step_Two: false,
    Step_Three: false,
    Step_Four: false,
    Step_Five: false,
    socketCmd: [],
    socketResp: []
  }

 
var component= this;

this.onInputChange = this.onInputChange.bind(this);
this.onFormSubmit = this.onFormSubmit.bind(this);
this.closeModal = this.closeModal.bind(this);

this.cksInsID1 ='';
this.logOutput0 ='';
this.logOutput1 ='';
this.ckDep2 =''; 
this.delay ='';  
component.startChckInstInterval();
}

componentDidMount(){
    var component = this;
    var socket = io.connect('/');
    socket.on('sshconn', function(ssh) {
      console.log('ssh connected!!!!!!!', ssh);
      socket.emit('sshstart');
      console.log('emitted sshstart')
    })

    socket.on('sshcmd', function(cmd) {
      console.log('SSH CMD: ', cmd)
      component.setState({socketCmd: '$ '+ cmd}) 
    })

    socket.on('sshresp', function(resp) {
    console.log('SSH Resp: ', resp)
    component.setState({socketResp: '>> ' + resp.split('\n')}) 
})
}


onInputChange(event) {
  this.setState({selectedSubdomain:event.target.value});
}

onFormSubmit(event) {
  event.preventDefault();
  this.props.setSubdomain(this.state.selectedSubdomain)
  this.props.sshPostInstall(window.localStorage.getItem('repoID'));
  this.setState({Step_Three: false})
  this.setState({Step_Four: true})
  this.delayCheckDeployed() 
}


closeModal(){
  alert('closing modal')
  this.setState({Step_Three: false})
  this.setState({Step_Four: true})
  this.props.sshPostInstall(window.localStorage.getItem('repoID'));
  this.delayCheckDeployed()
  
}

delayCheckDeployed(){
  var component= this;
  this.delay = setTimeout(function(){
   component.startChckDeployedInterval(); 
  }, 20000)
}

//set interval for logoutput
startLogOutputInterval() { 
  var component= this;
    this.logOutput0 = setInterval(function () {
        component.props.getLog();
        if(component.state.Step_One && component.props.LogOutput.length > 0){
          component.setState({Step_One:false})
          component.setState({Step_Two:true})
        }
      }, 12000);
    this.logOutput1 = setInterval(function(){
        component.props.updateLogFile();
        console.log('state.step_two: ', component.state.Step_Two )
        console.log('logoutput length: ',component.props.LogOutput.length)
        if (component.state.Step_Two && component.props.LogOutput.length === 23){
          console.log('inside if statement')
          component.setState({Step_Two:false})
          component.setState({Step_Three:true})
          component.stopLogOutputInterval();
        }
    }, (Math.random()*50+150));
}


 stopLogOutputInterval() {
  clearInterval(this.logOutput0);
  clearInterval(this.logOutput1);
  console.log('really stopped logoutput now')
}

//set interval for check instance
startChckInstInterval() {     
  //var cksInsID1 ='';
  var component= this;
    this.cksInsID1 = setInterval(function () {
      console.log(' set timeout props checkInst', component.props.InstStatus)    
        if(component.props.InstStatus=== undefined){
          console.log('inst status undefiend ')
        }
        if(component.props.InstStatus === true){        
          console.log('if statement InstStatus is true')
          console.log('about to stop Interval')
         
         //call postinstall endpoint
         console.log('log the id here localStorage',window.localStorage.getItem('repoID'))   
          
        // component.props.sshPostInstall(window.localStorage.getItem('repoID'));
         console.log('called postinstall')
         //start set interval2/check deployed 
          component.startLogOutputInterval();
         //stop set interval1 if it already started 
          component.stopChckInstInterval(); 
        }
        else {
          //if still false call api again
          console.log('check instance ready is still false')
          component.props.instanceReady();
        }
    }, 5000);
}

stopChckInstInterval() {
  clearInterval(this.cksInsID1);
  console.log('really stopped  checkinst ready interval now')
} 



//set interval for checkdeployed
startChckDeployedInterval() {   
var component= this;
var sshRan = 0 ;
    this.ckDep2 = setInterval(function () {
      console.log(' set timeout props deployed', component.props.DeployedStatus)    
        if(component.props.DeployedStatus === undefined){
          console.log('depl status undefiend ')
        }
        if(component.props.DeployedStatus !== null && component.props.DeployedStatus.length > 0 && component.props.DeployedStatus[0].deployerror !== 'none' && sshRan===0){
           console.log('deployerror: rerunning sshPostInstall')
           sshRan++;
           this.props.sshPostInstall(window.localStorage.getItem('repoID'));
        }
        if(component.props.DeployedStatus === true){           
          console.log('isDeployed statement is true')
          console.log('about to stop Interval 2 checkdeployed')
         //stop interval2 log output
        component.stopLogOutputInterval();
        component.stopChckDeployedInterval(); 
        clearTimeout(this.delay)
        //transition to DB
        component.setState({Step_Four:false})
        component.setState({Step_Five:true})
        // window.location = 'http://localhost:9001/#/dashboard';
        }
        else if (component.props.DeployedStatus === null||component.props.DeployedStatus === false) {
          //if still false call api again
          console.log('check isDeployed ready is still false')
          component.props.isDeployed(window.localStorage.getItem('repoID'));
        }
    }, 6000);
  }

stopChckDeployedInterval() {
  clearInterval(this.ckDep2);
  console.log('really stopped chkdeployed interval now')
}



//////////////////


  render() {
    return (
      <div>
      <div className="overlay"></div>
       
        <div className="Steps Step_One"> Step One: Explain What (Will) Happen </div> 
           { this.state.Step_One ?
           <div className="popUp">
              <img width="560" height="315" src="images/githubScotch.gif"  frameborder="0" allowfullscreen></img> 
           </div>
           : null}

        <div className="Steps Step_Two"> Step Two: LogOutput 
           { this.state.Step_Two ?
           <div className="log">
              <div> {this.props.LogOutput.map(line=><div>{line}</div>)} </div> 
           </div>
           : null}
        </div>   
        
        <div className="Steps Step_Three"> Step Three: register domain (module)</div>
           <div className="popUp">
            <Modal show={this.state.Step_Three} onHide={this.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Pick Your Subdomain</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <b>Select a personailized subdomain or hit cancel if you want to skip this part</b>
              </Modal.Body>
                <Modal.Footer>
                  <Button onClick={this.closeModal}>Cancel</Button>
                   <Form inline>
                    <FormGroup controlId="formInlineName">             
                      {' '}
                      <FormControl 
                      type="text" 
                      value={this.state.selectedSubdomain}
                      onChange={this.onInputChange} 
                      />
                      <ControlLabel>.hyperjs.io</ControlLabel>
                    </FormGroup>
                      {' '}
                     <Button onClick={this.onFormSubmit}>
                       Pick
                     </Button>
                   </Form>
                 </Modal.Footer>
              </Modal>               
           </div>
        

        <div className="Steps Step_Four"> Step Four: sshPostInstall console output 
        { this.state.Step_Four && this.state.socketCmd !==[] ?
          <div className="log">
            <div>{this.state.socketCmd}{' '}{this.state.socketResp}</div>
          {
            //  <div> {this.state.socketLog.map(line=><div>{line}</div>)} </div> 
           }
           </div>
          :null 
        }
        </div>

        <div className="Steps Step_Five"> Step Five: Countdown 3-2-1 success animation </div>  
         { this.state.Step_Five ?
       
          
          <ReactCountdownClock seconds={10}
                     color="#EE9A00"
                     alpha={0.9}
                     size={200}
                     onComplete={function(){window.location = 'http://localhost:9001/#/dashboard'}} />  
              
                : null}                          
      </div>
    );
  }
}



function mapStateToProps(state) {
  // console.log('state of all reducers in load now', state.reducers)
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
  return bindActionCreators({ instanceReady, getLog, isDeployed, sshPostInstall, updateLogFile, setSubdomain }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Loading);