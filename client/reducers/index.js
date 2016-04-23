
import { combineReducers } from 'redux';
import ReposReducer from './reducer_repos';

const rootReducer = combineReducers({
	//console.log('reducer root being ran')
  repos: ReposReducer
});


export default rootReducer;


// import { combineReducers } from 'redux';
// import testReducer from './test';

// const rootReducer = combineReducers({
//   test: testReducer
// });


// export default rootReducer;

// import { combineReducers } from 'redux';

// const rootReducer = combineReducers({
//   state: (state = {}) => state
// });

// export default rootReducer;




