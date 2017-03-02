import { ADD_QUESTION } from './actions';

function questions(state = [], action) {
  switch (action.type) {
    case ADD_QUESTION:
      return [
        ...state,
        action.question,
      ];
    default:
      return state;
  }
}

export default questions;
