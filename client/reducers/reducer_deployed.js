//return repos
//state is state this reducer is responsible for
import { INSTANCE_READY } from '../actions/index';

export default function(state = [], action) {
    console.log('action in index', action)
  switch (action.type) {

    case INSTANCE_READY: 
      console.log('deployed reducer:', action.payload.data)
      return action.payload.data === undefined ? state : action.payload.data;
    default: return state;

  }
 
}