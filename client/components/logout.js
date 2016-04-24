import React, { Component } from 'react';
import { Link, browserHistory } from 'react-router';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { logout } from '../actions/index';

class Logout extends Component {
  
render() {
  console.log('this.props in Logout', this);
    return (
      <div className="row row-centered">   
        <li onClick={ () => this.props.logout()} className="btn btn-primary btn-sm">
          <Link className="logout" to="/">Logout</Link>
        </li>
      </div>  
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch);
}

export default connect(null, mapDispatchToProps)(Logout);
