import { SIDEBAR_TOGGLE } from '../actions/index';

export default function(state = false, action) {
  switch (action.type) {
      case SIDEBAR_TOGGLE:  
      return !state;
    default: return state;

  }
 
}