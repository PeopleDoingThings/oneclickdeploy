import React, { Component } from 'react';
import  ReactCountdownClock from 'react-countdown-clock';
    
export default class CountdownClock extends Component {
  constructor(props) {
    super(props);
  }
 
 shouldComponentUpdate ( newProps, newState ) {
  return false
}

  render() {
    var component = this;
       console.log('this clock props', component.props)
      return (
        <div>
          <ReactCountdownClock 
                     seconds={component.props.time}
                     color="#EE9A00"
                     alpha={0.9}
                     size={component.props.size} 
                     onComplete={component.props.callback} /> 
        </div>      
      );
  }
}


