import { CREATEINST } from '../actions/index';

export default function(state = [], action) {
    console.log('action in index', action)
  switch (action.type) {

    case CREATEINST: 
      console.log('createInst reducer:', action.payload.data)
      return action.payload.data === undefined ? state : action.payload.data;
    default: return state;

  }
 
}