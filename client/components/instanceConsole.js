import React, { Component } from 'react';
import ClassNames from 'classnames';  

export default class InstanceConsole extends Component {
  constructor(props){
    super(props);
    
    // this.state = {
    //   log: []
    // } 
    //consoleLog = consoleLog.bind(this);
  
  }

  // componentWillReceiveProps(nextProps) {
   
  // }
  render() {
    return (
      <div className="console dashboard-console">
        <h1>{this.props.response}</h1>
      </div>
    )  
  }

}