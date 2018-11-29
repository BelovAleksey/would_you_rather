export const RECEIVE_USERS = 'RECEIVE_USERS';
export const ADD_USER_ANSWER = 'ADD_USER_ANSWER';
export const ADD_USER_QUESTION = 'ADD_USER_QUESTION';

export function addUserAnswer(info) {
  return {
    type: ADD_USER_ANSWER,
    info,
  };
}
export function addUserQuestion(question) {
  return {
    type: ADD_USER_QUESTION,
    question,
  };
}
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users,
  };
}
