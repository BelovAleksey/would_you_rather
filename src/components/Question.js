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
        <div className="question-author">{name} asks:</div>
        <div>
          <img src={avatar} alt={`Avatar of ${name}`} className="avatar" />
          <div>
            <span>Would you rather</span>
            <span>
              ...
              {optionOne.text}
              ...
            </span>
          </div>
          <Link className="btn" to={`question/${id}`}>
            View Poll
          </Link>
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
