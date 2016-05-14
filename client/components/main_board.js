import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Aside from '../containers/sideBar';
import { isAuth } from '../actions/index';

class MainBoard extends Component {
  constructor(props){
    super(props);
    this.props.isAuth();
    console.log('props in mainboard constructor:', this.props);
  }

  render() {
    const auth = this.props.Auth;
    authCheck(auth);

    return (

      <div className="mainboard-wrapper clearfix">   
            <div className="sideBarPanel">   
              <Aside user={auth}/>
            </div>  
         
          <div className="main col-lg-9 col-xs-12">
            <div className="welcome-banner">
              <h2>Welcome back, {auth.name ? auth.name.split(' ')[0] : auth.login}</h2>
            </div>
            {this.props.children}
          </div>
          
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
  // console.log('isAuth state: ', state.reducers.auth)

  return {
    Auth: state.reducers.auth
  };
}

//take this component/mapStateToProps and return a container
export default connect(mapStateToProps, mapDispatchToProps)(MainBoard);
