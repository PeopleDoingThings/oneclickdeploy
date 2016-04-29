//return repos
//state is state this reducer is responsible for
import { FETCH_REPOS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {

    case FETCH_REPOS: 
        return action.payload.data === undefined ? state : action.payload.data;
    default: return state;

  }
 
}