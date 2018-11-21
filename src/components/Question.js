import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { formatQuestion } from '../utils/helpers';
import { Link } from 'react-router-dom';

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
    const { name, id, avatar, optionOne } = question;
    return (
      <div className="question">
        <div className="question-header">{name} asks:</div>
        <div className="question-body">
          <div className="avatar-section">
            <img src={avatar} alt={`Avatar of ${name}`} className="avatar-big" />
          </div>
          <div className="polling-section">
            <div className="polling-header">Would you rather</div>
            <div className="polling-body">
              ...
              {optionOne.text}
              ...
            </div>
            <div className="polling-btn">
              <Link to={`question/${id}`}>View Poll</Link>
            </div>
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
