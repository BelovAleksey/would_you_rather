import { RECEIVE_USERS, ADD_USER_ANSWER } from '../actions/users';

export default function users(state = {}, action) {
  switch (action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users,
      };
    case ADD_USER_ANSWER:
      const info = {
        authedUser: user.id,
        qid: question.id,
        answer: currentAnswer,
      };
      return {
        ...state,
      };
    default:
      return state;
  }
}
