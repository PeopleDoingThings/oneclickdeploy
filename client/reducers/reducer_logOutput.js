//return repos
//state is state this reducer is responsible for
import { GETLOG } from '../actions/index';

export default function(state = [], action) {
    console.log('action in index', action)
  switch (action.type) {

    case GETLOG: 
      console.log('deployed reducer:', action.payload.data)
      return action.payload.data === undefined ? state : action.payload.data;
    default: return state;

  }
 
}