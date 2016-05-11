import React, { Component } from 'react';

function consoleLog(i, array, newArray) {
    let that = this;
    let arr = array.slice();
    function consoleAnimation(i) {
      if(arr[i]) {
        newArray.push(arr[i]);
        that.setState({log: newArray});
        console.log('reducer log:', newArray)
        setTimeout(() => {
          consoleAnimation(i+1);
        }, 1000);
      }
    }
    consoleAnimation(i)
  }

export default class AppConsole extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      log: []
    } 
    consoleLog = consoleLog.bind(this);
  
  }

  componentWillReceiveProps(nextProps) {
    console.log('i mounted:', nextProps)
      let newArray = [];
      if (Array.isArray(nextProps.appManage) === true) {
        consoleLog(0, nextProps.appManage, newArray);
    } else if (typeof nextProps.appManage === 'string'){
        newArray.push(nextProps.appManage);
        this.setState({log: newArray});
    } 
    // else if (nextProps.appManage.body !== undefined) {
    //   consoleLog(0, nextProps.appManage.body, newArray);
    // }
  }


  render() {
    return (   
      <div className="console app-management-console">   
        <ul>
         { this.state.log.map((line, index) => {
            return <li key={index}>{line}</li>
          }) }
        </ul>
      </div>
    );
  }

}