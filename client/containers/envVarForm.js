import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { createInst, setRepoID } from '../actions/index';
import { Link, browserHistory } from 'react-router';
import {Form, FormGroup, FormControl, ControlLabel, Button } from 'react-bootstrap';
import Deploy from './deploy';
import getEnvVar from '../actions/index';

class envVarForm extends Component {
constructor(props){
    super(props);
    this.onInputChange = this.onInputChange.bind(this);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.state = {envVar: ''}
    //this.props.getEnvVar();
    console.log('here is envVar reducer', this.props)
  }

   onInputChange(event) {
    this.setState({ envVar: event.target.value });
  }

   onFormSubmit(event) {
    event.preventDefault();
    this.setState({envVar: ''}); 
    //console.log('this is the input:', this.state.envVar )  
  }

  // renderEnvVar(var){

  //   // if (this.props.repos.length === 0 || this.props.repos === undefined || this.props.repos[0].length === 0){
  //   //   return "Loading....."
  //   // } else {
  //   //   var counter = 0;
  //   //   return (this.props.repos.map((repo) => {
  //   //     return (
  //   //         <Panel key={repo.repoid} header={repo.name} eventKey={counter++}>
  //   //           <RepoItem repoItem={repo} />
  //   //           <Form id={repo.repoid}/>
  //   //         </Panel>
  //   //       )
  //   //     })
  //   //   );
  //   // }

  // }


  render() {
    var repoID = this.props.id;

    return (   
    <div> 
     <Deploy id={repoID} />
     {
// <form id={repoID} onSubmit={this.onFormSubmit} className="input-group">
//         <input 
//           className="deployFrm" 
//           type="text" 
//           value = {this.state.envVar}
//           onChange = {this.onInputChange}
//          />
//         <button form={repoID} type='submit' className="btn btn-secondary">Submit</button>      
//     </form>
     }
      {
    // <Form inline  onSubmit={this.onFormSubmit} className="input-group">
    //     <FormGroup controlId={repoID}>
    //         <ControlLabel>Key</ControlLabel>
    //           {''}
    //         <FormControl 
    //         type="text" 
    //         placeholder="Environment Variable Key" 
    //         value = {this.state.envVar}
    //         onChange = {this.onInputChange}
    //         />
    //     </FormGroup>
    //     {' '}
    //     <FormGroup controlId={repoID}>
    //         <ControlLabel>Value</ControlLabel>
    //            {' '}
    //         <FormControl type="text" placeholder="Environment Variable Value" />
    //      </FormGroup>
    //       {' '}
    //     <Button type="submit">
    //       Send invitation
    //     </Button>
    // </Form>
      }

    </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getEnvVar }, dispatch);
}

function mapStateToProps(state) {
  return {
    envVars: state.reducers.envVar
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(envVarForm);


//    <Form inline id={repoID} onSubmit={this.onFormSubmit} className="input-group">
  //   <FormGroup controlId={repoID}>
  //     <ControlLabel>Name</ControlLabel>
  //     {this.state.envVar}
  //     <FormControl type="text" placeholder="Jane Doe" />
  //   </FormGroup>
  //   {' '}
  //   <FormGroup controlId={repoID}>
  //     <ControlLabel>Email</ControlLabel>
  //     {' '}
  //     <FormControl type="email" placeholder="jane.doe@example.com" />
  //   </FormGroup>
  //   {' '}
  //   <Button form={repoID} type="submit">
  //     Send invitation
  //   </Button>
  // </Form>