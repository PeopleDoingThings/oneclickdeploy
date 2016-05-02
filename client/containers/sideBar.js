import React, { Component } from 'react';
import { connect } from 'react-redux';
import User from '../components/user';
import SidebarNav from '../components/sidebarNav.js'

class Aside extends Component {
 constructor(props){
    super(props);
  }

  render() {

    return (
      <div className="side-bar aside col-md-2 col-sm-12 AutoAffix">
        <User user={this.props.user}/>
        <SidebarNav url={this.props.url}/>  
      </div>

    );
  }
}

function mapStateToProps(state) {
  console.log('state: ', state)
  // test to get current path

  return {
    url: state.routing.locationBeforeTransitions.pathname
  };
}

//take this component/mapStateToProps and return a container
export default connect(mapStateToProps)(Aside);
