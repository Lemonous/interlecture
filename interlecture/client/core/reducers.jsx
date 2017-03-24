import { CLICK_REPLY } from './actions';

function questions(state = [], action) {
  switch (action.type) {
    case 'NEW_POSTS':
      var result=[...state];
      for(var id in action.data) {
          result[action.data[id].id]=action.data[id];
        }
      return result;
      

    case CLICK_REPLY:
      return [
        ...state,
      ];
    default:
      return state;
  }
}

export default questions;
