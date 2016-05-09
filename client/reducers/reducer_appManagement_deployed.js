import { DEPLOYED_REPO } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
    
    case DEPLOYED_REPO: 
      return action.payload.data === undefined ? state : action.payload.data;


    default: return state;

  }
}