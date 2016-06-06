import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { logout } from '../actions/index';
import { Link, browserHistory } from 'react-router';

class Logout extends Component {

render() {
  //console.log('this.props in Logout', this);
    return (
          <Link to="/#/" onClick={() => this.props.logout()}>Logout</Link>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ logout }, dispatch);
}

export default connect(null, mapDispatchToProps)(Logout);
