import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import { instanceReady } from '../actions/index';

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.props.instanceReady();
    
  }

  
  render() {
    return (
      <div>
      <h3>test: Dashboard</h3>
      <ul>
        
        </ul>
        </div>
    )
  };

}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ instanceReady }, dispatch);
}

function mapStateToProps(state) {
  
  console.log('state: ', state.reducers)
  return {
    instance: state.reducers.deployed
  };
}

//take this component/mapStateToProps and return a container
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);



