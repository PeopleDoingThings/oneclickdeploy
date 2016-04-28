//return repos
//state is state this reducer is responsible for
import { INSTANCE_READY } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {

    case INSTANCE_READY: 
      return action.payload.data === undefined ? state : action.payload.data;
    default: return state;

  }
 
}