import { CREATE_SUBDOMAIN } from '../actions/index';

export default function(state = "none", action) {
  switch (action.type) {
    
    case CREATE_SUBDOMAIN: 
      return action.payload.data === undefined ? state : action.payload.data;


    default: return state;

  }
}