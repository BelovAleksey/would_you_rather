import React, { Component } from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';
import { Link } from 'react-router-dom';

class Question extends Component {
  render() {
    const { question } = this.props;
    if (question === null) {
      return <p>This Question doesn't exist</p>;
    }

    const { name, id, avatar, optionOne } = question;
    return (
      <div className="question">
        <div className="question-header">{name} asks:</div>
        <div className="question-body">
          <div className="avatar-section">
            <span className="helper" />
            <img src={avatar} alt={`Avatar of ${name}`} className="avatar-big" />
          </div>
          <div className="line" />
          <div className="polling-section">
            <div className="polling-header">Would you rather</div>
            <div className="polling-body">
              ...
              {optionOne.text}
              ...
            </div>
            <Link className="link" to={`question/${id}`}>
              <div className="polling-btn">View Poll</div>
            </Link>
          </div>
        </div>
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
