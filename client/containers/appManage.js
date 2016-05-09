import React, { Component } from 'react';
import { connect } from 'react-redux';
//import * as ActionCreators from '../actions/index';
import AppControl from '../components/appManagementControls';
import AppConsole from '../components/appManagementConsole';
import DeployedRepo from '../components/appManagementInfo';


export default class AppManagement extends Component {
  constructor(props) {
    super(props);
  }
 
  render() {
      return (
        <div>
          <div className="col-xs-12 col-md-4 col-lg-4">
            <DeployedRepo deployed={this.props.deployed[0]}/>
          </div>

          <div className="col-xs-12 col-md-6 col-lg-8">   
             <AppControl />
             <AppConsole appManage={this.props.AppManage} />
          </div>
        </div>        
      )
      
  }
}


function mapStateToProps(state) {
  console.log('state app management: ', state.reducers.deployedRepo[0])
  // console.log('state memUsage: ', state.reducers.rxUsage)

 return {
    AppManage: state.reducers.appManage,
    deployed: state.reducers.deployedRepo,
  };
}

//take this component/mapStateToProps and return a container
export default connect(mapStateToProps)(AppManagement);



