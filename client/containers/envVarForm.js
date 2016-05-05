import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createInst, setRepoID } from '../actions/index';
import { Link, browserHistory } from 'react-router';
import { Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Deploy from './deploy';
import {setEnvVar, updateEnvVar } from '../actions/index';

class envVarForm extends Component {
constructor(props){
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.state = {
      envVar: props.envVars,
      envVarArray: [{variables: {key:'' , value:''}}]
    };
  }


  formatEnv (stateObj, envVars){
    var updatedEnvVars = envVars[0].variables.slice();
    var resultArray =[];
    var ind, field;

    for(var key in stateObj){
      if(key !== 'envVar' && key !== 'envVarArray'){
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

  // addInputGroup () {
  //   var newEmptyObj = {key:'', value: ''};
  //   var envVarArray =this.state.envVarArray;
  //   envVarArray.push(newEmptyObj);
  //   console.log('new state with envVarArray', envVarArray)
  //   this.setState({envVarArray:envVarArray});
  //   console.log('this.state.envVarArray', this.state.envVarArray)
  // }

handleClick (event) {
  event.preventDefault();
  console.log('click working')
  //this.addInputGroup();
  this.props.updateEnvVar();
};

onInputChange(event) {
  this.setState({[event.target.id] :event.target.value});
}

onFormSubmit(event) {
  var varArray=[];
  this.props.setEnvVar(this.formatEnv(this.state,this.props.envVars),this.props.id)
}


renderEnvVar(){
if (this.props.envVars[0] !== undefined ){         
return ( 
       <form onSubmit={this.onFormSubmit}>
          {this.props.envVars[0].variables.map((obj, indx) => {
         return (
           <div>
           <FormGroup controlId={"key" + indx}>
             <ControlLabel>Key</ControlLabel>
             <FormControl
              type="text"
              defaultValue = {obj.key}
              onChange = {this.onInputChange}
             />
           </FormGroup>
           <FormGroup controlId={"value" + indx}>
             <ControlLabel>Value</ControlLabel>
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
         <Button onClick={this.handleClick}>
           Add more
         </Button>
           <Button type="submit">
           Submit
           </Button>
      </form>      
     )
} 
}


render() {
   var repoID = this.props.id;
   return (
        <div>
          {this.renderEnvVar()}
          <Deploy id={repoID} />
        </div>
   );
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