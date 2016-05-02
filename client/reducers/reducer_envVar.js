import { GET_ENV_VAR } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
      case GET_ENV_VAR:  
      // return action.payload.data === undefined ? state : action.payload.data;
       return [
       {testkey1: 'testval1'},
       {testkey2: 'testval2'}
       ];

    default: return state;

  }
 
}