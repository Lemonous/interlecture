import { CLICK_REPLY } from './actions';

function posts(state = [], action) {
  switch (action.type) {
    case 'NEW_POSTS':
      var result=[...state];
      for(var id in action.data) {
          result[action.data[id].id]=action.data[id];
        }
      return result;
    
    case 'DELETE_POST':
      var result=[...state];
      result.splice(action.post,1);
      return result;
      

    case CLICK_REPLY:
      return [
        ...state,
      ];
    default:
      return state;
  }
}

export default posts;
