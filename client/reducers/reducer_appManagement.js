import { GITHUB_UPDATE } from '../actions/index';

export default function(state = [], action) {
  switch (action.type) {

    case GITHUB_UPDATE:
      return action.payload.data === undefined ? state : action.payload.data;

    default: return state;

  }
