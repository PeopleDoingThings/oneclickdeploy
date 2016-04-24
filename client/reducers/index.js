
import { combineReducers } from 'redux';
import ReposReducer from './reducer_repos';
import IsAuth from './reducer_auth'
import Deployed from './reducer_deployed'

const rootReducer = combineReducers({
  repos: ReposReducer,
  auth: IsAuth,
  deployed: Deployed
});


export default rootReducer;




