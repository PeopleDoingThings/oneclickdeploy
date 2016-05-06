import { GET_ENV_VAR, UPDATE_ENV_VAR } from '../actions/index';

var varsCopy = [];
export default function(state = [], action) {


  switch (action.type) {
      case GET_ENV_VAR:

        varsCopy = action.payload.data === "No Environment Variables Found!" ? [{variables:[{key:'', value: ''}]}]: action.payload.data;
        console.log('this is varsCopy', varsCopy)
        return varsCopy;

      //return action.payload.data === undefined ? state : action.payload.data;

             //** testing data **//
            // varsCopy = [
            //  {"key":"X_AUTH","value":"SUPER58947869845"},
            //  {"key":"THISISTHEONE","value":"SU4534947869845"},
            //  {"key":"SUPERTOKEN","value":"SUP565675845"},
            //  {"key":"OPENSTACKER","value":"UPDATEDTHISBADBOI"}
            //  ].slice(0);

            //  return varsCopy
              //** testing data **//


    case UPDATE_ENV_VAR:
      varsCopy[0].variables.push({key:'', value: ''})
      console.log('updating this varsCopy',varsCopy)
      return varsCopy;
    default: return state;

  }

}

