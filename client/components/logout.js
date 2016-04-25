import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';
import { logout } from '../actions/index';
import { Link, browserHistory } from 'react-router';

class Logout extends Component {
  
render() {
  console.log('this.props in Logout', this);
    return (
      <div className="row row-centered">   
        <li>
          <Link to="/#/" onClick={() => this.props.logout()} className="btn btn-primary btn-sm logout">Logout</Link>
        </li>
      </div>  
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch);
}

export default connect(null, mapDispatchToProps)(Logout);
