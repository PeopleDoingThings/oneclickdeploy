//return isAuth
//state is state this reducer is responsible for
import { IS_AUTH } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {

    case IS_AUTH: 
        return action.payload.data === undefined ? state : action.payload.data;
    default: return state;

  }
 
}