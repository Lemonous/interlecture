import { CLICK_REPLY, NEW_POSTS, GO_TO_COURSE } from './actions';

function questions(state = [], action) {
  switch (action.type) {
    case NEW_POSTS:
      var result = [...state];
      for (const id in action.data) {
        result[action.data[id].id] = action.data[id];
      }
      return result;

    case CLICK_REPLY:
      return [
        ...state,
      ];

    case GO_TO_COURSE:
      console.log('in reducers -> GO_TO_COURSE');
      console.log(action.data);
      return state;

    default:
      return state;
  }
}

export default questions;
