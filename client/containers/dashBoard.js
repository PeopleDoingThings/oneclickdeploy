import React, { Component } from 'react';
import { bindActionCreators } from 'redux'; 
import { connect } from 'react-redux';

import * as ActionCreators from '../actions/index';
import MemUsage from '../components/widget_usageGraphs';
import InstanceInfo from '../components/InstanceInfo'



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
            <InstanceInfo instance={this.props.instance}/>
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
  console.log('state isDeployed: ', state.reducers.instReady)
  console.log('state memUsage: ', state.reducers.rxUsage)

 return {
    instance: state.reducers.instReady,
    memUsage: state.reducers.memUsage,
    cpuUsage: state.reducers.cpuUsage,
    txUsage:  state.reducers.txUsage,
    rxUsage:  state.reducers.rxUsage,
  };
}

//take this component/mapStateToProps and return a container
export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);



             //<Charts memUsage={this.props.memUsage} cpuUsage={this.props.cpuUsage}/>
      
