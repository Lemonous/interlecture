const CLICK_REPLY = 'CLICK_REPLY';
const DELETE_POST = 'DELETE_POST';

/* Methods called from the server: */
const NEW_POSTS = 'NEW_POSTS';
const GO_TO_COURSE = 'GO_TO_COURSE';

function serverAction(action) {
  return action;
}

function clickReply(id) {
  return {
    type: CLICK_REPLY,
    id,
  };
}

export {
  serverAction,
  clickReply,
  NEW_POSTS,
  DELETE_POST,
  CLICK_REPLY,
  GO_TO_COURSE,
};
