import React, { Component } from 'react';      

export default class InstanceInfo extends Component {
  constructor(props){
    super(props);
  }

  render() {
    const instance = this.props.instance;
    const createdDate = "" + new Date( ""+instance.created );
    console.log('component props:', this.props)
    return (
      <div className="info-panel col-md-4">  
          <div className="ip">{instance.ip.ip}</div>
          <button type="button" className="btn btn-warning">go to site</button>
          <div className="status-bubble">STATUS <span>{ (instance.status === 'ACTIVE') ? "LIVE" : "OFF" }</span></div>
          <div className="build-bubble">BUILD <span>{instance.status}</span></div>
          <div className="col-md-6">
            <ul>
              <li>Created On</li>
              <li>{createdDate}</li>
            </ul>
            <ul>
              <li>OS</li>
              <li>{instance.imagename}</li>
            </ul>
          </div>
          <div className="col-md-6">
            <ul>
              <li>Location</li>
              <li>BHS 1</li>
            </ul>
            <ul>
              <li>CPU</li>
              <li>Cores: 1</li>
            </ul>
          </div>
          
      </div>    
    )

  }
}   

