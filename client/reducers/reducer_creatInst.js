import { CREATEINST } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {

    case CREATEINST: 
      return action.payload.data === undefined ? state : action.payload.data;
    default: return state;

  }
 
}