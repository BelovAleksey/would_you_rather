import React, { Component } from 'react';
import { connect } from 'react-redux';
import Question from './Question';

class Home extends Component {
  state = {
    answered: true,
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
    if (!this.props.authedUser) return <span>Please Login</span>;
    return (
      <div>
        <h3 className="center">Questions</h3>
        <div className="center">
          <button className={this.state.answered ? 'active' : null} onClick={this.changeToAnswered}>
            Answered Questions
          </button>
          <button
            className={this.state.answered ? null : 'active'}
            onClick={this.changeToUnanswered}
          >
            Unanswered Questions
          </button>
        </div>

        <ul className="center">
          {renderedQuestions.map(id => (
            <li key={id}>
              <Question id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  return {
    authedUser,
    answeredQuestion: authedUser ? Object.keys(users[authedUser].answers) : null,
    unAnsweredQuestion: authedUser
      ? Object.keys(questions).filter(
          question => !Object.keys(users[authedUser].answers).includes(question),
        )
      : null,
  };
}

export default connect(mapStateToProps)(Home);
