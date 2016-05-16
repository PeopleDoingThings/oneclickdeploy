import { REBOOT_INST, REINSTALL_INST, RESCUE_INSTANCE, CREATE_BACKUP, GETSNAPSHOT_STATUS, DELETE_BACKUP, LIST_BACKUPS, CREATE_SUBDOMAIN, LOADING  } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {

    case REBOOT_INST: 
      return action.payload.data === undefined ? state : action.payload.data;

    case REINSTALL_INST: 
      return action.payload.data === undefined ? state : action.payload.data; 

    case RESCUE_INSTANCE: 
      return action.payload.data === undefined ? state : action.payload.data;

    case CREATE_BACKUP: 
      return action.payload.data === undefined ? state : action.payload.data;

    case GETSNAPSHOT_STATUS: 
      return action.payload.data === undefined ? state : action.payload.data; 

    case DELETE_BACKUP: 
      return action.payload.data === undefined ? state : action.payload.data; 

    case LIST_BACKUPS: 
      return action.payload.data === undefined ? state : action.payload.data;    

    case CREATE_SUBDOMAIN:
      return action.payload.data === undefined ? state : action.payload.data;

    case LOADING:
      return true;
           
    default: return state;

  }
 
}




