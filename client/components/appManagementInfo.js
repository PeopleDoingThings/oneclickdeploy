import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {Form, FormGroup, ControlLabel, FormControl, Button} from 'react-bootstrap'
import * as ActionCreators from '../actions/index';

class DeployedRepo extends Component {
  constructor(props){
    super(props);
   
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      value: ''
    }
    
  }

  getValidationState() {
    const length = this.state.value.length;
    if (length < 10) return 'success';
    else if (length > 5) return 'warning';
    else if (length > 10) return 'error';
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e){
    console.log('is the form working?')
    e.preventDefault();
    console.log('submit:', this.state.value)
    const name = this.state.value;
    this.props.createSubdomain(name);
  }


  render() {
    const repo = this.props.deployed;
    if (typeof repo === 'object') {
      return (
        <div className="info-panel">
          <h3>About your deployed app</h3>
          <div className="col-md-6 col-xs-12">
            <ul>
              <li>Created On</li>
              <li>{repo.age}</li>
            </ul>
            <ul>
              <li>Name</li>
              <li>{repo.name}</li>
            </ul>
          </div>
          <div className="col-md-6 col-xs-12">
            <ul>
              <li>Owner Name</li>
              <li>{repo.ownername}</li>
            </ul>
            <ul>
              <li>Clone URL</li>
              <li>{repo.clone_url}</li>
            </ul>
          </div>
          <Form>
            <FormGroup 
              controlId="domainName"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Subdomain Name</ControlLabel>
              {' '}
              <FormControl 
                type="text" 
                placeholder="Enter subdomain" 
                value={this.state.value}
                placeholder="Enter text"
                onChange={this.handleChange}
                />
            </FormGroup>
            {' '}
            <button onClick={this.handleSubmit}>
              Use subdomain
            </button>
          </Form>
        </div>
      );
    } else {
      return (
        <h2>loading</h2>
      )
    }  
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ActionCreators), dispatch);
}


function mapStateToProps(state) {
  return {
   
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DeployedRepo);