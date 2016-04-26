import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

class Loading extends Component {
  constructor(props){
    super(props); 
    console.log('props in loading constructor:' ,this.props);
    //console.log('getState', getState())
  }

  render() {
    return (
      <div>
       <h1>Loading.....</h1>
      </div>

    );
  }
}


function mapStateToProps(state) {
  console.log('deploy state: ', state.reducers.load)
  return {
    Load: state.reducers.load
  };
}

// function mapDispatchToProps(dispatch) {
//   return bindActionCreators({ createInst, reInstall }, dispatch);
// }

export default connect(mapStateToProps)(Loading);