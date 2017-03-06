
function questions(state = [], action) {
  switch (action.type) {
    case 'ADD_QUESTIONS':
      return [
        ...state,
        ...action.data,
      ];
    default:
      return state;
  }
}

export default questions;
