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
      value: '',
    }
    
  }

  getValidationState() {
    const invalidRegexp =  /[^a-zA-Z0-9\-]/;
    const value = "" + this.state.value;
    if (invalidRegexp.test(value) === false && value.length < 62) {return 'success'}
    else if (invalidRegexp.test(value) === true || value.length > 62) {return 'error'}
  }

  handleChange(e) {
    this.setState({ value: e.target.value });
  }

  handleSubmit(e){
    e.preventDefault();
    const name = this.state.value;
    this.props.createSubdomain(name);
  }


  render() {
    const repo = this.props.deployed;
    const url = "http://" + this.state.value + '.hyperjs.io';
    if (typeof repo === 'string') {
      return <h3>hold on, you have no app currently deployed right now</h3>
    }

    else if (typeof repo === 'object') {
      return (
        <div className="info-panel">
          <h3>Deployed Application:</h3>
          <div className="col-md-6 col-xs-12">
            <ul>
              <li>Created On</li>
              
              <li>{"" + new Date(repo.age)}</li>
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
              <li>Github Repo</li>
              <li><a href={repo.clone_url}>View on Github</a></li>
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
               <FormControl.Feedback />  
            </FormGroup>
            {' '}
            <Button onClick={this.handleSubmit}>
              Use subdomain
            </Button>
            <p>Current Subdomain: {repo.subdomain}</p>
            <p>New Subdomain: {this.state.value}</p>
            { this.props.subdomain ?
              <Button><a href={url} taget="_blank">Go to your new Subdomain</a></Button>
             : console.log('not working')

            }

          </Form>
        </div>
      );
    } else {
      return (
        <h4>loading</h4>
      )
    }  
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ActionCreators), dispatch);
}



export default connect(null, mapDispatchToProps)(DeployedRepo);