import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Aside from '../containers/sideBar';
import { isAuth } from '../actions/index';
import { Modal, Button } from 'react-bootstrap'

class MainBoard extends Component {
  constructor(props){
    super(props);
    this.props.isAuth();
    console.log('props in mainboard constructor:' ,this.props);
  }

  render() {
    authCheck(this.props.Auth);
    return (
      <div>
          <Aside user={this.props.Auth}/>
          <div className="main col-lg-9 col-md-7 col-sm-5 col-xs-12">{this.props.children}</div>
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
