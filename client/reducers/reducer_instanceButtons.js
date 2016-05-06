import { REBOOT_INST, REINSTALL_INST, RESCUE_INSTANCE } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {

    case REBOOT_INST: 
        return action.payload.data === undefined ? state : action.payload.data;

    case REINSTALL_INST: 
    return action.payload.data === undefined ? state : action.payload.data; 

    case RESCUE_INSTANCE: 
    return action.payload.data === undefined ? state : action.payload.data; 
           
    default: return state;

  }
 
}




