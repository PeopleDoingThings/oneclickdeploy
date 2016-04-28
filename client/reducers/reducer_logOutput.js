//return repos
//state is state this reducer is responsible for
import { GETLOG } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {

    case GETLOG: 
      return action.payload.data === undefined ? state : action.payload.data;
    default: return state;

  }
 
}