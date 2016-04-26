import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { createInst, reInstall } from '../actions/index';

class Deploy extends Component {
constructor(props){
    super(props);
    console.log('props in deploy constructor:' ,this.props);
    //this.state = {instName: 'Please name your instance'}
    //console.log('user input state',this.state.instName)
  }
//on click bring up form () 
//7need form input for name on click
//on form submit

  render() {
    console.log('props in deploy',this)
    return (
      // <form id='deployForm' onSubmit={() => deploy(this.props.createInst, this.props.reInstall)}>
      //   <input required className="deployFrm" 
      //     type="text" 
      //     value = {this.state.instName}
      //     onChange = {
      //        event => this.setState({
      //        instName: event.target.value
      //      })
      //    }
      //    />
       <div onClick={() => deploy(this.props.createInst, this.props.reInstall)}><button className="btn btn-primary deployBtn">Deploy</button></div> 
    //  <button form='deployForm' value="Submit" className="btn btn-primary deployBtn">Deploy</button>
    // </form>
    );
  }
}


function deploy (createInstFct, reInstallFct){
    createInstFct();
    reInstallFct();
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators({createInst,reInstall}, dispatch);
}

function mapStateToProps(state) {
  //console.log('instance state: ', state.reducers.instance)
  return {
    Instance: state.reducers.instance
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(Deploy);