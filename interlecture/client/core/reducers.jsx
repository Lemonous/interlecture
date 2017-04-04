import { CLICK_REPLY } from './actions';

function posts(state = [], action) {
  switch (action.type) {
    case 'NEW_POSTS':
      var result=state.slice();
      for(var n in action.data) {
          result[action.data[n].id]=action.data[n];
        }
      return result;
    
    case 'DELETE_POST':
      return state.filter(post => post.id!=action.post);
      

    case CLICK_REPLY:
      return state.slice();
      
    default:
      return state;
  }
}

export default posts;
