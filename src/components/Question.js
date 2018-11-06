import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';

class Question extends Component {
  render() {
    console.log(this.props);
    return <div className="question" />;
  }
}

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id];
  return {
    question: formatQuestion(question, users[question.author]),
  };
}

export default connect(mapStateToProps)(Question);
