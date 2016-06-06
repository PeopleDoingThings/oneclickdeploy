import React, { Component } from 'react';

//helper function to feed the console animation line by line
function consoleLog(i, array, newArray) {
    let that = this;
    let arr = array.slice();
    function consoleAnimation(i) {
      if(arr[i]) {
        newArray.push(arr[i]);
        that.setState({log: newArray});
        setTimeout(() => {
          consoleAnimation(i+1);
          //console.log('final state', that.state.loading)
        }, 1000);
      }
    }
    consoleAnimation(i)
  }

export default class AppConsole extends Component {
  constructor(props){
    super(props);
    
    this.state = {
      log: [],
    } 
    consoleLog = consoleLog.bind(this);
  
  }

  componentWillReceiveProps(nextProps) {
      const newArray = [];
      const appManage = nextProps.appManage;
  
      console.log('this.state.loading', this.state);

      if (Array.isArray(appManage) && appManage.length > 0) {
          consoleLog(0, appManage, newArray);

      } else if (typeof appManage === 'string'){
          newArray.push(appManage);
          this.setState({log: newArray});
      }
      
  }

  render() {

    return (   
      <div id="app-console" className="console app-management-console">  
        <ul>
          {this.state.log.map((line, index) => {
            return <li key={index}>{line}</li>
          }) }
        </ul>   
      </div>
    );
  }

}