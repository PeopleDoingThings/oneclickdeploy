import { combineReducers } from 'redux';
import sidebarToggle from  './reducer_sideBarToggle';
import ReposReducer from './reducer_repos';
import IsAuth from './reducer_auth';
import InstReady from './reducer_instReady';
import CreatInstance from './reducer_creatInst';
import IsDeployed from './reducer_isDeployed';
import LogOutput from './reducer_logOutput';
import memUsage from './reducer_memUsage';
import cpuUsage from './reducer_cpuUsage';
import txUsage from './reducer_txUsage';
import rxUsage from './reducer_rxUsage';
import SetRepoId from './reducer_setRepoId';
import GetEnvVar from './reducer_envVar';
import SSHLogin from  './reducer_instanceLogin';
import instanceCtrls from './reducer_instanceCtrls'; 
import appManage from './reducer_appManagement';
import deployedRepo from './reducer_appManagement_deployed';
import liveConsole from './reducer_liveConsole';
import subdomain from './reducer_subdomain';
import ErrorHandler from './reducer_error';

const rootReducer = combineReducers({
  sidebarToggle: sidebarToggle,
  repos: ReposReducer,
  auth: IsAuth,
  install: CreatInstance,
  instReady: InstReady,
  isDeployed: IsDeployed,
  logOutput: LogOutput,
  SSHLogin: SSHLogin,
  memUsage: memUsage,
  cpuUsage: cpuUsage,
  txUsage: txUsage,
  rxUsage: rxUsage,
  logOutput: LogOutput,
  selRepoId: SetRepoId,
  envVar: GetEnvVar,
  instanceCtrls: instanceCtrls,
  appManage: appManage,
  deployedRepo: deployedRepo,
  liveConsole: liveConsole,
  subdomain: subdomain,
  errorHandler: ErrorHandler,
});


export default rootReducer;