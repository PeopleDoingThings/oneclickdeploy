import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { createInst, setRepoID } from '../actions/index';
import { Link, browserHistory } from 'react-router';
import Deploy from './deploy'

class envVarForm extends Component {
constructor(props){
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {envVar: 'envVarForm not working yet'}
  }

   onInputChange(event) {
    this.setState({ envVar: event.target.value });
  }

   onFormSubmit(event) {
    event.preventDefault();
    this.setState({envVar: ''}); 
    console.log('this is the input:', this.state.envVar )  
  }


  render() {
    var repoID = this.props.id;

    return (   
    <div> 
     <Deploy id={repoID} />
      <form id={repoID} onSubmit={this.onFormSubmit} className="input-group">
        <input 
          className="deployFrm" 
          type="text" 
          value = {this.state.envVar}
          onChange = {this.onInputChange}
         />
        <button form={repoID} type='submit' className="btn btn-secondary">Submit</button>      
    </form>
    </div>
    );
  }
}

export default connect(null, null)(envVarForm);