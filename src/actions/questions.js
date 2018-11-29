import { saveQuestion, saveQuestionAnswer } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
import { addUserQuestion } from './users';

export const RECEIVE_QUESTIONS = 'RECEIVE_QUESTIONS';
export const ADD_QUESTION = 'ADD_QUESTION';
export const ADD_QUESTION_ANSWER = 'ADD_QUESTION_ANSWER';

export function addQuestionAnswer(info) {
  return {
    type: ADD_QUESTION_ANSWER,
    info,
  };
}

export function handleAddQuestionAnswer(info) {
  return dispatch => {
    dispatch(addQuestionAnswer(info));

    return saveQuestionAnswer(info).catch(e => {
      console.warn('Error in handleAddQuestionAnswer: ', e);
      dispatch(addQuestionAnswer(info));
      alert('The was an error answering question. Try again.');
    });
  };
}

export function addQuestion(question) {
  return {
    type: ADD_QUESTION,
    question,
  };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());

    return saveQuestion({ optionOneText, optionTwoText, author: authedUser })
      .then(question => {
        dispatch(addQuestion(question));
        dispatch(addUserQuestion(question));
      })
      .then(() => dispatch(hideLoading()));
  };
}

export function receiveQuestions(questions) {
  return {
    type: RECEIVE_QUESTIONS,
    questions,
  };
}
