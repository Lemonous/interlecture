import { CLICK_REPLY } from './actions';

function questions(state = [], action) {
  switch (action.type) {
    case 'NEW_POSTS':
      return [
        ...state,
        ...action.data,
      ];

    case CLICK_REPLY:
      return [
        ...state,
      ];
    default:
      return state;
  }
}

export default questions;
