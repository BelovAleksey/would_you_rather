import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { formatQuestion } from '../utils/helpers';

class Question extends Component {
  toQuestion = (e, id) => {
    e.preventDefault();
    return <Redirect to={`questions/${id}`} />;
  };
  render() {
    const { question } = this.props;
    if (question === null) {
      return <p>This Question doesn't exist</p>;
    }
    if (!this.props.authedUser) return <span>Please Login</span>;
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

function mapStateToProps({ authedUser, users, questions }, { id }) {
  const question = questions[id];
  return {
    authedUser,
    question: question ? formatQuestion(question, users[question.author]) : null,
  };
}

export default connect(mapStateToProps)(Question);
