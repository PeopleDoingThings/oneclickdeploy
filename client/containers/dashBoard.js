import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as ActionCreators from '../actions/index';
import MemUsage from '../components/widget_usageGraphs';
import InstanceInfo from '../components/instanceInfo';
import InstanceCtrls from '../components/instanceCtrls';

function renderChart() {
     if (this.state.memUsage.length <= 12){
        return <h4>No data is available yet. Please check back in a bit.</h4>
      } else {
        return (
          <div>
            <MemUsage 
              memUsage={this.state.memUsage} 
              cpuUsage={this.state.cpuUsage} 
              txUsage={this.state.txUsage}
              rxUsage={this.state.rxUsage}
              />
          </div>    
        )
      }
    }

class DashBoard extends Component {
  constructor(props) {
    super(props);
    this.props.instanceReady();
    this.props.usageMemory();
    this.props.usageCPU();
    this.props.usageTX();
    this.props.usageRX();
    this.props.sshLogin();

    this.state = {
      memUsage: [],
      cpuUsage: [],
      txUsage: [],
      rxUsage: [],
      instance: {},
      graphLoading: true,
      instanceLoading: true,
      error: false,
    }

    renderChart = renderChart.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    //instance data
    let inst = nextProps.instance; 

    //Setting up graph data after promises are resolved
    let mem = nextProps.memUsage.values ? nextProps.memUsage.values : null;
    let cpu = nextProps.cpuUsage.values ? nextProps.cpuUsage.values : null;
    let tx = nextProps.txUsage.values ? nextProps.txUsage.values : null;
    let rx = nextProps.rxUsage.values ? nextProps.rxUsage.values : null;
    //this.setState({rxUsage: rx});

    //error handling
    if (nextProps.error) {
      this.setState({error: nextProps.error, instanceLoading: false, graphLoading: false});
    }
    
    // set instance info state once instance info is resolved
    if (inst && inst.created) {
      this.setState({instance: inst, instanceLoading: false});
    }

    //set Graphs states once all the graphs are resolved.
    if (mem && mem.length > 0) { this.setState({memUsage: mem}); }
    if (cpu && cpu.length > 0) { this.setState({cpuUsage: cpu}); }
    if (tx && tx.length > 0) { this.setState({txUsage: tx}); } 
    if (rx && rx.length > 0) { this.setState({rxUsage: rx}); }

    //turn off graph loading once graphs are ready to load
    if (mem && mem.length > 0 
      && cpu && cpu.length > 0 
      && tx && tx.length > 0 
      && rx && rx.length > 0) {
      this.setState({graphLoading: false});
    }
  }
  
  render() {
    if (this.state.error !== false) {
      console.log('error:', this.state.error);
      return <div>Sorry, we encounter some server issues just now. Please try again in a couple minutes</div>
    } else if (this.state.instanceLoading === true){
      return <div className="loader">Loading...</div>
    } else {
       return (
        <div>
          <InstanceInfo 
            instance={this.state.instance}
            SSHLogin={this.props.SSHLogin}
          />

          <div className="col-xs-12 col-sm-8 col-md-8 col-lg-8">   
            <InstanceCtrls response={this.props.instanceCtrls}/>     
            { this.state.graphLoading ? 
              <div className="loader">Loading...</div>
                : renderChart() }
          </div>
        </div>        
      )
    }
  }
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, ActionCreators), dispatch);
}

function mapStateToProps(state) {
 return {
    instance: state.reducers.instReady,
    memUsage: state.reducers.memUsage,
    cpuUsage: state.reducers.cpuUsage,
    txUsage:  state.reducers.txUsage,
    rxUsage:  state.reducers.rxUsage,
    SSHLogin: state.reducers.SSHLogin,
    instanceCtrls: state.reducers.instanceCtrls,
    error: state.reducers.errorHandler,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);

