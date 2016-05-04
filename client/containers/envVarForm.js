import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { createInst, setRepoID } from '../actions/index';
import { Link, browserHistory } from 'react-router';
import {Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
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
      envVarArray: [{key:'' , value:''}]
    };
  }


  formatEnv (stateObj, envVars){
    console.log('this is what no vars look like', envVars)
    console.log('this is what state looks like', stateObj)
    
    var updatedEnvVars = envVars.slice();
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

    return resultArray;

   }

  addInputGroup () {
    var newEmptyObj = {key:'', value: ''};
    var envVarArray =this.state.envVarArray;
    envVarArray.push(newEmptyObj);
    this.setState({envVarArray:envVarArray});
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
    console.log('state on submit:' , this.state)
    console.log('see copy', this.formatEnv(this.state,this.props.envVars))
    //alert(JSON.stringify(this.props.envVars[0].variables))
   // debugger
    var varArray=[];
    varArray = this.props.envVars[0].variables||this.props.envVars  
    //alert(JSON.stringify(varArray))  
    this.props.setEnvVar(this.formatEnv(this.state,varArray),this.props.id)
  }

  renderEnvVar(){
    // if(this.props.envVars.length === 0 || this.props.envVars === undefined || this.props.envVars[0].length === 0){
    //   return 'Loading...'
    // }else 
    if (this.props.envVars==='No Environment Variables Found!'|| this.props.envVars.length===0){
       console.log('array', this.state.envVarArray)
      var inputFields = this.state.envVarArray;
      return (inputFields.map((obj, indx) => {
        console.log('outputting inputFields')
            return (
              <div key={indx}>
                <FormGroup controlId={"key" + indx}>
                  <ControlLabel>Key</ControlLabel>
                   <FormControl 
                    type="text" 
                    placeholder="Environment Variable Key" 
                    defaultValue = {obj.key}
                    onChange = {this.onInputChange}
                    />
                </FormGroup>
                <FormGroup controlId={"value" + indx}>
                  <ControlLabel>Value</ControlLabel>
                  <FormControl 
                   type="text" 
                   defaultValue = {obj.value}
                   placeholder="Environment Variable Value" 
                   onChange = {this.onInputChange}
                  />
                </FormGroup> 
              </div>  
            )           
        })
      );
            
    } else if (this.props.envVars[0].variables) {
      return (this.props.envVars[0].variables.map((obj, indx) => {
        console.log('here is the first obj', obj)
        console.log('does envVar props exist?', this.props.envVars[0].variables)
        console.log('outputting envVars')
            return (
              <div key={indx}>
                <FormGroup controlId={"key" + indx}>
                  <ControlLabel>Key</ControlLabel>
                   <FormControl 
                    type="text" 
                    placeholder="Environment Variable Key" 
                    defaultValue = {obj.key}
                    onChange = {this.onInputChange}
                    />
                </FormGroup>
                <FormGroup controlId={"value" + indx}>
                  <ControlLabel>Value</ControlLabel>
                  <FormControl 
                   type="text" 
                   defaultValue = {obj.value}
                   placeholder="Environment Variable Value" 
                   onChange = {this.onInputChange}
                  />
                </FormGroup> 
              </div>  
            )
            
        })
      );
    }
  }


  render() {
    var repoID = this.props.id;

    return (   
    <div> 
     {
      //console.log('does envVar props exist?', this.props.envVars)
    }
    
     <Form id='envVarForm' inline  onSubmit={this.onFormSubmit} className="input-group">
        {this.renderEnvVar()}
        <Button onClick={this.handleClick}>
        Add more
        </Button>
        <Button form='envVarForm' type="submit">
        Submit
        </Button>
     </Form>
      <Deploy id={repoID} />
     
    </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setEnvVar, updateEnvVar }, dispatch);
}

function mapStateToProps(state) {
  return {
    envVars: state.reducers.envVar
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(envVarForm);
