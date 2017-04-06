import {
  CLICK_REPLY,
  NEW_POSTS,
  DELETE_POST,
} from './actions';

function posts(state = { posts: [], replyTo: undefined }, action) {
  switch (action.type) {

    case NEW_POSTS:
      var result = state.posts.slice();
      for (const n in action.data) {
        result[action.data[n].id] = action.data[n];
      }
      return {
        posts: result,
        replyTo: state.replyTo,
      };

    case DELETE_POST:
      return {
        posts: state.posts.filter(post => post.id !== action.post),
        replyTo: state.replyTo,
      };


    case CLICK_REPLY:
      if (action.id === state.replyTo) {
        return {
          posts: state.posts,
          replyTo: undefined,
        };
      }
      return {
        posts: state.posts,
        replyTo: action.id,
      };

    default:
      return state;
  }
}

export default posts;
