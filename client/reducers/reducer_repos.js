//return repos
//state is state this reducer is responsible for
import { FETCH_REPOS, REFRESH_REPO } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {

    case FETCH_REPOS: 
        return action.payload.data === undefined ? state : action.payload.data;
    case REFRESH_REPO:
        return action.payload.data === undefined ? state : action.payload.data;	
    default: return state;

  }
 
}