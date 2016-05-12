import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ActionCreators from '../actions/index';
import MemUsage from '../components/widget_usageGraphs';
import InstanceInfo from '../components/InstanceInfo';
import InstanceButtons from '../components/instanceButtons';
import InstanceConsole from '../components/instanceConsole';

function renderChart() {
      if (this.props.memUsage.length === 0) {
        return <h1>loading</h1>
      } else if (typeof this.props.memUsage === 'object' && this.props.memUsage !== null && this.props.memUsage.values.length <= 12){
        return <h4>sorry, no data is available yet, please come back later</h4>
      } else if(
        this.props.memUsage.values.length > 12 &&
        this.props.cpuUsage.values.length > 12 &&
        this.props.txUsage.values.length > 12 &&
        this.props.rxUsage.values.length > 12) {
        return (
          <div>
            <MemUsage 
              memUsage={this.props.memUsage} 
              cpuUsage={this.props.cpuUsage} 
              txUsage={this.props.txUsage}
              rxUsage={this.props.rxUsage}
              />
          </div>    
        )
      } 
    }

export default class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.props.instanceReady();
    this.props.usageMemory();
    this.props.usageCPU();
    this.props.usageTX();
    this.props.usageRX();
    this.props.sshLogin();

    

    renderChart = renderChart.bind(this);

  }
  
  render() {
    if (this.props.instance.length !==0) {
      return (
        <div>
          <InstanceInfo 
                instance={this.props.instance}
                SSHLogin={this.props.SSHLogin}
          />

          <div className="col-xs-12 col-md-6 col-lg-8">   
            <InstanceButtons />   
            <InstanceConsole response={this.props.instanceCtrls} />    
            { renderChart() }
          </div>
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
  console.log('state controls: ', state.reducers.instanceCtrls)
  console.log('state memUsage: ', state.reducers.rxUsage)

 return {
    instance: state.reducers.instReady,
    memUsage: state.reducers.memUsage,
    cpuUsage: state.reducers.cpuUsage,
    txUsage:  state.reducers.txUsage,
    rxUsage:  state.reducers.rxUsage,
    SSHLogin: state.reducers.SSHLogin,
    instanceCtrls: state.reducers.instanceCtrls,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);

