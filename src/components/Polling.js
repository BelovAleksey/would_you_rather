import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestionAnswer } from '../actions/questions';

class Polling extends Component {
  state = {
    currentAnswer: 'optionOne',
    answered: this.props.answer,
  };
  handleSubmit = e => {
    e.preventDefault();
    const { currentAnswer } = this.state;
    const { dispatch, question, user } = this.props;
    dispatch(
      handleAddQuestionAnswer({
        authedUser: user.id,
        qid: question.id,
        answer: currentAnswer,
      }),
    );
    this.setState(state => ({
      currentAnswer: '',
      answered: state.currentAnswer,
    }));
  };
  handleChange = e => {
    if (e.target.id === 'optionOne') {
      this.setState(() => ({ currentAnswer: 'optionOne' }));
    } else {
      this.setState(() => ({ currentAnswer: 'optionTwo' }));
    }
  };
  convertToPct = num => (num * 100).toFixed(0) + '%';

  render() {
    const { name, avatarURL } = this.props.user;
    const { question } = this.props;
    const { answered } = this.state;

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const allVotes = optionOneVotes + optionTwoVotes;

    return (
      <div className="question">
        <div className="question-info">{name} asks:</div>
        <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
        {answered ? (
          <div>
            <h3>Results</h3>
            <div>
              <span>Would you rather {question.optionOne.text}?</span>
              <span>{this.convertToPct(optionOneVotes / allVotes)}</span>
              <span>Would you rather {question.optionTwo.text}?</span>
              <span>{this.convertToPct(optionTwoVotes / allVotes)}</span>
            </div>
          </div>
        ) : (
          <div>
            <span>Would you rather</span>
            <form>
              <label>
                <input
                  type="radio"
                  id="optionOne"
                  checked={this.state.currentAnswer === 'optionOne'}
                  onChange={this.handleChange}
                />
                {question.optionOne.text}
              </label>
              <label>
                <input
                  type="radio"
                  id="optionTwo"
                  checked={this.state.currentAnswer === 'optionTwo'}
                  onChange={this.handleChange}
                />
                {question.optionTwo.text}
              </label>
            </form>
            <button className="btn" type="submit" onClick={this.handleSubmit}>
              Submit
            </button>
          </div>
        )}
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { id } = props.match.params;
  const user = users[authedUser];

  return {
    id,
    user,
    question: questions[id],
    answer: user.answers[id] ? user.answers[id] : null,
  };
}

export default connect(mapStateToProps)(Polling);
