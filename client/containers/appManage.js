import React, { Component } from 'react';
import { connect } from 'react-redux';
//import * as ActionCreators from '../actions/index';
import AppControl from '../components/appManagementControls';
import AppConsole from '../components/appManagementConsole';
import DeployedRepo from '../components/appManagementInfo';
import io from 'socket.io-client';
    
export default class AppManagement extends Component {
  constructor(props) {
    super(props);
    this.state = {
      log: [],
    }
  }
 
  componentDidMount() {
    const socket = io.connect('/');
    const that = this;
    let result = [];
     socket.on('sshconn', function(ssh) {
          //console.log('ssh connected!!!!!!!', ssh);
      socket.emit('sshstart');
      console.log('emitted sshstart')
    })

    socket.on('sshcmd', function(cmd) {
      //console.log('SSH CMD: ', cmd)
      //console.log('newArray cmd:', newArray)
      result.push(cmd);
    })

    socket.on('sshresp', function(resp) {
      console.log('SSH Resp: ', resp)
      result.push(resp.split('\n'));
      that.setState({log: result});
      // console.log('result resp:', that.state.log )
    })

  }
  render() {
    let appManage = this.props.AppManage;

    if (this.props.AppManage === "socketIO") {
      appManage = this.state.log;
      console.log('appManage:', appManage)
    } else if (this.props.AppManage === true) {
      appManage = "Starting...";
    }

      return (
        <div>
          <div className="col-xs-12 col-md-4 col-lg-5">
              <DeployedRepo deployed={this.props.deployed[0]} subdomain={this.props.subdomain}/>
          </div>
          <div className="col-xs-12 col-md-6 col-lg-7">   
             <AppControl deployed={this.props.deployed[0]} />
             <AppConsole appManage={appManage} />
          </div>
        </div>        
      )
      
  }
}


function mapStateToProps(state) {
  let appManage;
  let subdomain;
  if (state.reducers.subdomain !== 'none') {
    subdomain = true;
  }

  if(state.reducers.appManage.body !== undefined) {
    appManage = JSON.parse(state.reducers.appManage.body);
  } else {
    appManage = state.reducers.appManage;
  }

 return {
    AppManage: appManage,
    deployed: state.reducers.deployedRepo,
    subdomain: subdomain,
  };
}

//take this component/mapStateToProps and return a container
export default connect(mapStateToProps)(AppManagement);
