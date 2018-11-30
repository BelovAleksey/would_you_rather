import React from 'react';
import { connect } from 'react-redux';
import { formatQuestion } from '../utils/helpers';
import { Link } from 'react-router-dom';

function Question(props) {
  const { name, id, avatar, optionOne } = props.question;
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

function mapStateToProps({ users, questions }, { id }) {
  const question = questions[id];
  return {
    question: question ? formatQuestion(question, users[question.author]) : null,
  };
}

export default connect(mapStateToProps)(Question);
