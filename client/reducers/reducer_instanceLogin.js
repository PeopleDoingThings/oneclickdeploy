import { SSH_LOGIN } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
      case SSH_LOGIN:  
      return action.payload.data === undefined ? state : action.payload.data;
    
    default: return state;

  }
 
}