import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Aside from '../containers/sideBar';
import { isAuth } from '../actions/index';
import {Motion, spring} from 'react-motion';

class MainBoard extends Component {
  constructor(props){
    super(props);
    this.props.isAuth();
    console.log('props in mainboard constructor:' ,this.props);
  }

  render() {
    const auth = this.props.Auth;
    authCheck(auth);
    return (
      <div>
        <Motion defaultStyle={{ x: -200 }} style={{ x: spring(0) }}>
          {interpolatingStyle =>     
            <div className="sideBarPanel" style={{left: interpolatingStyle.x}}>   
              <Aside user={auth}/>
            </div>  
          }
        </Motion> 
          <div className="main col-lg-9 col-md-7 col-sm-5 col-xs-12">
            <div className="welcome-banner">
              <h2>Welcome Back,{auth.login}</h2>
              <h4>Here's what's going on with your apps</h4>
            </div>
            {this.props.children}
          </div>
          <div className="clearfix visible-xs-block"></div>
      </div>
    );
  }
}

function authCheck (status) {
  console.log('status', status)
  if(status === 'Unauthorized') {
    window.location.href = ('/');
  } else {
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ isAuth }, dispatch);
}

function mapStateToProps(state) {
  console.log('isAuth state: ', state.reducers.auth)

  return {
    Auth: state.reducers.auth
  };
}

//take this component/mapStateToProps and return a container
export default connect(mapStateToProps, mapDispatchToProps)(MainBoard);
