import React, { Component } from 'react';
import Aside from '../containers/sideBar';

export default class MainBoard extends Component {
  render() {
    return (
      <div>
        <div className="row fluid">
          <div className='col-md-4'>
            <Aside />
          </div>
          <div className='col-md-8'>{this.props.children}</div>

        </div>
      </div>

    );
  }
}
