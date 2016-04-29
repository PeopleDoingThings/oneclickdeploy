//return isAuth
//state is state this reducer is responsible for
import { SETREPOID } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {

    case SETREPOID: 
        //console.log('reducer setrepoid:', action.payload)
        return action.payload === undefined ? state : action.payload;
    default: return state;

  }
 
}