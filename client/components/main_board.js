import React, { Component } from 'react';
import Aside from '../containers/sideBar';

export default class MainBoard extends Component {
  render() {
    return (
      <div>
        <div className="row">
          <div className='col-md-3'><Aside /></div>
          <div className='col-md-9'>{this.props.children}</div>
        </div>
      </div>

    );
  }
}
