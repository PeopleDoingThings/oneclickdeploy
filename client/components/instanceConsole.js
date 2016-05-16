import React, { Component } from 'react';
import ClassNames from 'classnames';  

export default class InstanceConsole extends Component {
  constructor(props){
    super(props);
    //consoleLog = consoleLog.bind(this);
  
  }

  // componentWillReceiveProps(nextProps) {
   
  // }
  render() {
    const response = this.props.response;
    if ( typeof response === 'object' && !Array.isArray(response) ) {
      console.log('response is an object!!!')
      return (
        <div className="console dashboard-console">
          <ul>
            { Object.keys(response).map((key) => {
              return <li key={key}>{key}: {response[key]}</li>
            }) }
          </ul>  
        </div>
      )

    } else {
      return (
        <div>
          {console.log('inside console:', this.props.response)}
          { response === true ?
              <div className="console dashboard-console">
                <h4>Starting...</h4>
              </div>
                  :response.length > 0 ?     
                    <div className="console dashboard-console">
                      <h4>{response}</h4>
                    </div>
                        : <div></div>
          }
        </div>
      )  
    }
  }

}