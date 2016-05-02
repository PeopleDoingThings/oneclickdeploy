import { GET_ENV_VAR } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {
      case GET_ENV_VAR:  
      
       return [
       {"key":"X_AUTH","value":"SUPER58947869845"},
       {"key":"THISISTHEONE","value":"SU4534947869845"},
       {"key":"SUPERTOKEN","value":"SUP565675845"},
       {"key":"OPENSTACKER","value":"UPDATEDTHISBADBOI"}
       ]

    default: return state;

  }
 
}