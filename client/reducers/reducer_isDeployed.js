//return repos
//state is state this reducer is responsible for
import { ISDEPLOYED } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {

    case ISDEPLOYED: 
      return action.payload.data === undefined ? state : action.payload.data;
    default: return state;

  }
 
}