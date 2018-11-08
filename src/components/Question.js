import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';

class Question extends Component {
  toQuestion = (e, id) => {
    e.preventDefault();
    //TODO: redirect to Question
  };
  render() {
    const { question } = this.props;
    if (question === null) {
      return <p>This Question doesn't exist</p>;
    }
    const { name, id, avatar, optionOne } = question;
    return (
      <div className="question">
        <div className="question-info">{name} asks:</div>
        <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
        <div>
          <span>Would you rather</span>
          <span>
            ...
            {optionOne.text}
            ...
          </span>
        </div>
        <button className="btn" onClick={e => this.toQuestion(e, id)}>
          View Poll
        </button>
      </div>
    );
  }
}

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id];
  return {
    question: question ? formatQuestion(question, users[question.author]) : null,
  };
}

export default connect(mapStateToProps)(Question);
