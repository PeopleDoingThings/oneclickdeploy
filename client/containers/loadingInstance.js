import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import { instanceReady, getLog, isDeployed, sshPostInstall, updateLogFile, setSubdomain } from '../actions/index';
import  ReactCountdownClock from 'react-countdown-clock';
import { Modal, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import io from 'socket.io-client';
import Clock from '../components/countClock';
import ErrorHandler from '../components/errorHandler';
import Ansi from 'ansi-to-react';



class Loading extends Component {
  constructor(props){
  super(props); 
  console.log('log all pros',this.props)
  this.state = {
    selectedSubdomain: '',
    Step_One: true,
    Step_Two: false,
    Step_Three: false,
    Step_Four: false,
    Step_Five: false,
    ErrorHandler: false,
    socketCmd: [],
    socketResp: [],
    height: 200
  }

 
var component= this;

this.getValidationState = this.getValidationState.bind(this);
this.onInputChange = this.onInputChange.bind(this);
this.onFormSubmit = this.onFormSubmit.bind(this);
this.closeModal = this.closeModal.bind(this);
this.handleScroll = this.handleScroll.bind(this);

this.cksInsID1 ='';
this.logOutput0 ='';
this.logOutput1 ='';
this.ckDep2 =''; 
this.delay ='';  
component.startChckInstInterval();
this.divStyle = {'height':400}
}


componentDidMount(){
    var component = this;
    var socket = io.connect('/');
    var outputCmd = [];
    var outputResp = [];
    socket.on('sshconn', function(ssh) {
      console.log('ssh connected!!!!!!!', ssh);
      socket.emit('sshstart');
      console.log('emitted sshstart')
    })

    socket.on('sshcmd', function(cmd) {
      console.log('SSH CMD: ', cmd)
      outputCmd.push('$ '+ cmd)
      component.setState({socketCmd: outputCmd}) 
    })

    socket.on('sshresp', function(resp) {
    console.log('SSH Resp: ', resp)
      //outputResp[0]=resp.split('\n').map(line=>{'>> '+line+'\n'}).join('')
    //resp.split('\n').map(line=>outputResp.push('>> '+line))

    outputResp.push('>> ' + resp)
    component.setState({socketResp: outputResp}) 
    })

    window.addEventListener('scroll', this.handleScroll);
}


componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
}

handleScroll(event) {
console.log('handeling scroll')
  this.state.Step_Two ?
        this.setState({
          height: 200
        }) :
        this.setState({
          height: 400
        })
}

 getValidationState() {
    const invalidRegexp =  /[^a-zA-Z0-9\-]/;
    const selectedSubdomain = "" + this.state.selectedSubdomain;
    if (invalidRegexp.test(selectedSubdomain) === false && selectedSubdomain.length < 62) {return 'success'}
    else if (invalidRegexp.test(selectedSubdomain) === true || selectedSubdomain.length > 62) {return 'error'}
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
      //  console.log('state.step_two: ', component.state.Step_Two )
       // console.log('logoutput length: ',component.props.LogOutput.length)
        if (component.state.Step_Two && component.props.LogOutput.length === 23){
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
        // if(component.props.DeployedStatus.deployed === undefined){
        //   console.log('depl status undefiend ')
        // }
        if(component.props.DeployedStatus !== null && component.props.DeployedStatus.deployerror !== 'none' && sshRan <=1){
           console.log('deployerror: rerunning sshPostInstall', component.props.DeployedStatus.deployerror)
           sshRan++;
           component.props.sshPostInstall(window.localStorage.getItem('repoID'));
        }
        else if(component.props.DeployedStatus !== null && component.props.DeployedStatus.deployerror !== 'none' && sshRan===2){
          component.setState({ErrorHandler:true})
        }
        else if(component.props.DeployedStatus !== null && component.props.DeployedStatus.deployed === true){           
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
        else if (component.props.DeployedStatus === null||component.props.DeployedStatus.deployed === false) {
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

createMarkup() { 
  var text = this.state.socketCmd[0] + this.state.socketResp.join('');
  console.log('text defined', text);
  return {__html: text}
};

//////////////////


  render() {
    //console.log('logging height', this.state.height)
     // var display = {
     //            headerHTML:{
     //                __html: (this.state.socketCmd + this.state.socketResp.join(''))
     //            }
     //          }
     //          console.log('here is display', display)
    return (
      <div>
       {this.state.ErrorHandler ? <ErrorHandler errorMsg={this.props.DeployedStatus.deployerror}/> : <div>
        <div className="Steps Step_One"> 
          <h3>Step One: Creating an instance</h3> 
           { this.state.Step_One ?
           <div className="step-body fadein">
            <p className="left">We are creating your instance</p>
            <div className="load-bubbles">
              <div className="status-bubble">Instance<span>BUILD</span></div>
              <div className="build-bubble">App<span>WAIT</span></div>
            </div>  
            <Clock time={90} size={100}/>
            <p className="estimate-time right">Estimated Time Remaining</p>      
           </div>          
           : null}
        </div>   

        <div className="Steps Step_Two"> 
          <h3>Step Two: Installing OS & Setting up network</h3>
           { this.state.Step_Two ?
           <div className="step-body fadein">
             <div className="load-bubbles">
                <div className="status-bubble">Instance<span>INIT</span></div>
                <div className="build-bubble">App<span>WAIT</span></div>
                
                <div className="timer">
                  <Clock time={90} size={100}/>
                  <p className="estimate-time right">Estimated Time Remaining</p> 
                </div>
              </div> 
             <div className="log" style={this.divStyle}>
                <div> {this.props.LogOutput.map(line=><div>{line}</div>)} </div> 
             </div> 
           </div>          
           : null
        }
        </div>   

        <div className="Steps Step_Three"> 
          <h3>Step Three: Would you like a subdomain with that?</h3>
            <Modal className="subdomain-modal" show={this.state.Step_Three} onHide={this.closeModal}>
              <Modal.Header closeButton>
                <Modal.Title>Pick Your Subdomain</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <p>Do you want to select a personailized subdomain, ie your-cool-app.hyperjs.io? (skip this part if you just need an IP address)</p>
                   <Form inline>
                    <FormGroup className="validation" controlId="formInlineName" validationState={this.getValidationState()}>             
                      {' '}
                      <FormControl.Feedback/>
                      <FormControl 
                      type="text" 
                      value={this.state.selectedSubdomain}
                      onChange={this.onInputChange} 
                      />          
                      <ControlLabel>.hyperjs.io</ControlLabel>

                    </FormGroup>
                      {' '}
                    <Button onClick={this.closeModal}>No, thank you</Button>
                     <Button onClick={this.onFormSubmit}>
                       I'll go with that
                     </Button>
                   </Form>

              </Modal.Body>
                <Modal.Footer>
                 </Modal.Footer>
              </Modal>
        </div>

        <div className="Steps Step_Four"> 
          <h3>Step Four: Installing your app</h3>
        { this.state.Step_Four && this.state.socketCmd !==[] ?
           <div className="step-body fadein">
              <div className="load-bubbles">
                <div className="status-bubble">Instance<span>ACTIVE</span></div>
                <div className="build-bubble">App<span>INSTALL</span></div>
                  <div className="timer">
                    <Clock time={60} size={100}/>
                    <p className="estimate-time right">Estimated Time Remaining</p> 
                  </div>
              </div>   
              <pre className="log" style={this.divStyle} dangerouslySetInnerHTML={this.createMarkup()} /> 
            </div>    
          :null 
        }
        </div>

        <div className="Steps Step_Five"> 
          <h3>Preparing for launch</h3> 

         { this.state.Step_Five ? 
          <div className="step-body fadein">
            <p>Grab some popcorn; here comes the good part!</p>
            <div className="load-bubbles">
              <div className="status-bubble">Instance<span>ACTIVE</span></div>
              <div className="build-bubble">App<span>ACTIVE</span></div>
              <div className="timer">
               <Clock time={10} size={100} callback={function(){window.location = window.location.origin + '/#/dashboard'}}/> 
                <p className="estimate-time right">Estimated Time Remaining</p> 
              </div>
            </div> 
           </div>   
                : null} 
        </div>  

         </div>}

       </div>
    );
  }
}





function mapStateToProps(state) {
  return {
    Load: state.reducers.load,
    InstData: state.reducers.install,
    Data: state.reducers.instReady,
    InstStatus: state.reducers.instReady.isReady,
    DeployedStatus: state.reducers.isDeployed[0] ? state.reducers.isDeployed[state.reducers.isDeployed.length-1] : null,
    LogOutput: state.reducers.logOutput,
    SelectedRepoID: state.reducers.selRepoId
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ instanceReady, getLog, isDeployed, sshPostInstall, updateLogFile, setSubdomain }, dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Loading);