import React, { Component } from 'react';
import { connect } from 'react-redux';
import ClassNames from 'ClassNames';
import User from '../components/user';
import SidebarNav from '../components/sidebarNav.js'

class Aside extends Component {
 constructor(props){
    super(props);
  }

  render() {
    let hide;
    if (this.props.sidebarToggle) {
      hide = ClassNames({showSideNav: true});
    } else {
      hide = ClassNames({showSideNav: false});
    }

    {console.log(this.props.sidebarToggle)}
    return (
      <div className={"side-bar aside col-md-2 col-sm-12 " + hide}>
        <User user={this.props.user}/>
        <SidebarNav url={this.props.url}/>  
      </div>

    );
  }
}

function mapStateToProps(state) {
  return {
    url: state.routing.locationBeforeTransitions.pathname,
    sidebarToggle: state.reducers.sidebarToggle,
  };
}

//take this component/mapStateToProps and return a container
export default connect(mapStateToProps)(Aside);

//AutoAffix
