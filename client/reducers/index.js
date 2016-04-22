import { combineReducers } from 'redux';
import ReposReducer from './reducer_repos';

const rootReducer = combineReducers({
	//console.log('reducer root being ran')
  repos: ReposReducer
});

export default rootReducer;
