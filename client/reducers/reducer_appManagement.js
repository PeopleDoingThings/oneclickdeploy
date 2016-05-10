import { GITHUB_UPDATE, RESTART_REPO, REINSTALL_REPO, DELETE_REPO, OUTPUT_TOP, OUTPUT_FOREVER, OUTPUT_PRINTENV, OUTPUT_UPTIME } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {

    case GITHUB_UPDATE:
      return action.payload.data === undefined ? state : action.payload.data;

    case RESTART_REPO:
      return action.payload.data === undefined ? state : action.payload.data;

    case REINSTALL_REPO:
      return action.payload.data === undefined ? state : action.payload.data;

    case DELETE_REPO:
      return action.payload.data === undefined ? state : action.payload.data;  

    case OUTPUT_TOP:
      return action.payload.data === undefined ? state : action.payload.data;

    case OUTPUT_FOREVER:
      return action.payload.data === undefined ? state : action.payload.data;

    case OUTPUT_PRINTENV:  
      return action.payload.data === undefined ? state : action.payload.data;

    case OUTPUT_UPTIME:  
      return action.payload.data === undefined ? state : action.payload.data;
      
    default: return state;

  }
}