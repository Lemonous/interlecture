const CLICK_REPLY = 'CLICK_REPLY';

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
};
