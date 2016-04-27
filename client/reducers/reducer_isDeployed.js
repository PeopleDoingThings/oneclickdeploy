//return repos
//state is state this reducer is responsible for
import { ISDEPLOYED } from '../actions/index';

export default function(state = [], action) {
    console.log('action in index', action)
  switch (action.type) {

    case ISDEPLOYED: 
      console.log('deployed reducer:', action.payload.data)
      return action.payload.data === undefined ? state : action.payload.data;
    default: return state;

  }
 
}