import { CREATE_BACKUP, GETSNAPSHOT_STATUS, DELETE_BACKUP, LIST_BACKUPS } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {

    case CREATE_BACKUP: 
        return action.payload.data === undefined ? state : action.payload.data;

    case GETSNAPSHOT_STATUS: 
    return action.payload.data === undefined ? state : action.payload.data; 

    case DELETE_BACKUP: 
    return action.payload.data === undefined ? state : action.payload.data; 

    case LIST_BACKUPS: 
    return action.payload.data === undefined ? state : action.payload.data; 
           
    default: return state;

  }
 
}
