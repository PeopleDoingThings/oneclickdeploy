//return repos
//state is state this reducer is responsible for
import { GETLOG, UPDATE_LOG_FILE } from '../actions/index';

var logArray = [];
var firstLine = 0;
export default function(state = [], action) {
      console.log('logging logarray',logArray)
  switch (action.type) {

    case GETLOG: 
       logArray = action.payload.data === undefined ? state : '\n\n\n\n\n\n\n\n\n\n\n\n\n' + action.payload.data.output;
       var test = !logArray.code && logArray.split ? logArray.split("\n").slice(firstLine, firstLine + 24) : state;
       console.log('test getlog#1', test )
       return test;

    case UPDATE_LOG_FILE:

      var test2= !logArray.code && logArray.split ? logArray.split("\n").slice(firstLine, firstLine + 24) : state;
      firstLine++;
      console.log('test updatelog#@', test2 )
      return test2
    default: return state;
  }
 
}