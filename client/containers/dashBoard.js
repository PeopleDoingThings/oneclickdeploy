import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import * as ActionCreators from '../actions/index'
import MemUsage from '../components/widget_usageGraphs';



export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.props.instanceReady();
    this.props.usageMemory();
    this.props.usageCPU();
    this.props.usageTX();
    this.props.usageRX();
    this.state = {};
    
  }
  // componentDidMount() {
  //       this._updater = setInterval(this.updateData.bind(this), 5000);
  //   }
  //console.log('outside render', this.props.memUsage)
  render() {
    if(this.props.memUsage.length !== 0 && 
        this.props.cpuUsage.length !== 0 && 
        this.props.txUsage.length !== 0 && 
        this.props.rxUsage.length !== 0
      ) {
      return (

        <div>
        {console.log('working')}
          <h3>test: Dashboard</h3>
            {
            // <ul>
            //   <li>created on {this.props.instance.created}</li>
            // </ul>
            }
            <MemUsage 
              memUsage={this.props.memUsage} 
              cpuUsage={this.props.cpuUsage} 
              txUsage={this.props.txUsage}
              rxUsage={this.props.rxUsage}
              />
        </div>
      )
    } else {
    return <h1>loading</h1>
    }
  }
}


function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ActionCreators), dispatch);
}

function mapStateToProps(state) {
  console.log('state txUsage: ', state.reducers.txUsage)
  console.log('state memUsage: ', state.reducers.rxUsage)

 return {
    instance: state.reducers.deployed,
    memUsage: state.reducers.memUsage,
    cpuUsage: state.reducers.cpuUsage,
    txUsage:  state.reducers.txUsage,
    rxUsage:  state.reducers.rxUsage,
  };
}

//take this component/mapStateToProps and return a container
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);



             //<Charts memUsage={this.props.memUsage} cpuUsage={this.props.cpuUsage}/>
      
