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

function submitReply(replyText, questionId, socketHandler) {
  socketHandler.submitReply(replyText, questionId);
}

export {
  serverAction,
  clickReply,
  CLICK_REPLY,
  submitReply,
};
