import { CLICK_REPLY,
  NEW_POSTS,
  GO_TO_COURSE,
  DELETE_POST,
} from './actions';

function posts(state = [], action) {
  switch (action.type) {
    case NEW_POSTS:
      var result = [...state];
      for (const id in action.data) {
        result[action.data[id].id] = action.data[id];
      }
      return result;

    case DELETE_POST:
      var result = [...state];
      result.splice(action.post, 1);
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

export default posts;
