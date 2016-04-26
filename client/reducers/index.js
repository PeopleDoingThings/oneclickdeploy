
import { combineReducers } from 'redux';
import ReposReducer from './reducer_repos';
import IsAuth from './reducer_auth';
import Deployed from './reducer_deployed';
import CreatInstance from './reducer_creatInst';

const rootReducer = combineReducers({
  repos: ReposReducer,
  auth: IsAuth,
  deployed: Deployed,
  install: CreatInstance
});


export default rootReducer;




