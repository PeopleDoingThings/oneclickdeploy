
import { combineReducers } from 'redux';
import ReposReducer from './reducer_repos';

const rootReducer = combineReducers({
  repos: ReposReducer //repos => key on global state
});


export default rootReducer;




