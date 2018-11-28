import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';
import { Redirect } from 'react-router-dom';

class Home extends Component {
  state = {
    answered: false,
  };

  changeToAnswered = e => {
    e.preventDefault();
    this.setState({ answered: true });
  };
  changeToUnanswered = e => {
    e.preventDefault();
    this.setState({ answered: false });
  };

  render() {
    const renderedQuestions = this.state.answered
      ? this.props.answeredQuestion
      : this.props.unAnsweredQuestion;
    if (this.props.authedUser === null) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="questions-list">
        <div>
          <button
            className={this.state.answered ? 'passive-questions-list' : 'active-questions-list'}
            onClick={this.changeToUnanswered}
          >
            Unanswered Questions
          </button>
          <button
            className={this.state.answered ? 'active-questions-list' : 'passive-questions-list'}
            onClick={this.changeToAnswered}
          >
            Answered Questions
          </button>
          <ul>
            {renderedQuestions.map(id => (
              <li key={id}>
                <Question id={id} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  const answered = authedUser ? Object.keys(users[authedUser].answers) : null;
  const unAnswered = authedUser
    ? Object.keys(questions).filter(
        question => !Object.keys(users[authedUser].answers).includes(question),
      )
    : null;
  return {
    authedUser,
    answeredQuestion: answered.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
    unAnsweredQuestion: unAnswered.sort((a, b) => questions[b].timestamp - questions[a].timestamp),
  };
}

export default connect(mapStateToProps)(Home);
