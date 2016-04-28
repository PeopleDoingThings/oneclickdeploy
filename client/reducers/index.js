
import { combineReducers } from 'redux';
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

const rootReducer = combineReducers({
  repos: ReposReducer,
  auth: IsAuth,
  install: CreatInstance,
  instReady: InstReady,
  isDeployed: IsDeployed,
  logOutput: LogOutput,
  memUsage: memUsage,
  cpuUsage: cpuUsage,
  txUsage: txUsage,
  rxUsage: rxUsage
});


export default rootReducer;