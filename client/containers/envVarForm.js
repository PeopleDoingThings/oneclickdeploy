import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createInst, setRepoID } from '../actions/index';
import { Link, browserHistory } from 'react-router';
import { Modal, Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Deploy from './deploy';
import {setEnvVar, updateEnvVar } from '../actions/index';

class envVarForm extends Component {
constructor(props){
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      envVar: props.envVars,
      showModal: false,
      envVarArray: [{variables: {key:'' , value:''}}]
    };
  }

  closeModal(){
    console.log('close modal has been activated')
    this.setState({showModal:false});
   }

   openModal(){
    console.log('opening modal')
    this.setState({showModal:true});
   }

  formatEnv (stateObj, envVars){
    var updatedEnvVars = envVars[0].variables.slice();
    var resultArray =[];
    var ind, field;

    for(var key in stateObj){
      if(key !== 'envVar' && key !== 'envVarArray' && key !== 'showModal'){
        ind = Number(key.charAt(key.length-1))
        field = key.charAt(0)==='k' ? 'key' : 'value';
        updatedEnvVars[ind][field]= stateObj[key];
      }
    }

    updatedEnvVars.forEach(function(obj){
      if(obj.key !== ''){
        resultArray.push(obj);
      }
    })
    console.log('resultArray:', resultArray)
    return resultArray;

   }

  addInputGroup () {
    var newEmptyObj = {key:'', value: ''};
    var envVarArray =this.state.envVarArray;
    envVarArray.push(newEmptyObj);
    console.log('new state with envVarArray', envVarArray)
    this.setState({envVarArray:envVarArray});
    console.log('this.state.envVarArray', this.state.envVarArray)
  }

handleClick (event) {
  event.preventDefault();
  console.log('click working')
  this.addInputGroup();
  this.props.updateEnvVar();
};

onInputChange(event) {
  this.setState({[event.target.id] :event.target.value});
}

onFormSubmit(event) {
  event.preventDefault();
  console.log('form submit working')
  this.props.setEnvVar(this.formatEnv(this.state,this.props.envVars),this.props.id)
}


render() {
var repoID = this.props.id;
if (this.props.envVars[0] !== undefined ){         
return ( 
      <div>
       <Form onSubmit={this.onFormSubmit} id="envForm">
          {this.props.envVars[0].variables.map((obj, indx) => {
         return (
           <div key={indx}>
           <FormGroup controlId={"key" + indx}>
              <ControlLabel>Key</ControlLabel>
              {' '}
              <FormControl
                type="text"
                defaultValue = {obj.key}
                onChange = {this.onInputChange}
              />
           </FormGroup>
           {' '}
           <FormGroup controlId={"value" + indx}>
              <ControlLabel>Value</ControlLabel>
              {' '}
              <FormControl
                type="text"
                defaultValue = {obj.value}
                onChange = {this.onInputChange}
              />
           </FormGroup>
           </div>
           )
       })
        }
         {'\n'}
          <Button onClick={this.handleClick}>
        Add more
      </Button>
         {'\n'}
       <Button onClick={this.openModal} type="submit">
       Submit 
       </Button>
         {' '}
         </Form>
      
      {
      }
       <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Please confirm</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <b>Are you sure you would like to deploy your 
            repo?</b>
          </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.closeModal}>Cancel</Button>
              <Deploy id={repoID} /> 
             </Modal.Footer>
      </Modal>
      </div>     
     );
 }else{
  return (<div></div>);
}
}
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setEnvVar, updateEnvVar }, dispatch);
}

function mapStateToProps(state) {
  console.log('state reducers envar', state.reducers.envVar)
  return {
    envVars: state.reducers.envVar
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(envVarForm);