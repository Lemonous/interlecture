const CLICK_REPLY = 'CLICK_REPLY';

/* Methods called from the server: */
const NEW_POSTS = 'NEW_POSTS';
const GO_TO_COURSE = 'GO_TO_COURSE';

function serverAction(action) {
  return action;
}

function clickReply(questionId) {
  return {
    type: CLICK_REPLY,
    questionId,
  };
}

export {
  serverAction,
  clickReply,
  CLICK_REPLY,
  NEW_POSTS,
  GO_TO_COURSE,
};
