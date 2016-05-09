import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ActionCreators from '../actions/index';

class AppControl extends Component {
  constructor(props){
    super(props);

    this.githubUpdate = this.githubUpdate.bind(this);
  }

  githubUpdate() {
    console.log('githubUpdate working')
    this.props.githubUpdate();
  }

  render() {
    return (
      <div>
        <ul>
          <li><button className="btn btn-primary" onClick={this.githubUpdate}>Github Update</button></li>
        </ul>
      </div>

    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ActionCreators), dispatch);
}


function mapStateToProps(state) {
  return {
   
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(AppControl);
