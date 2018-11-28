import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestionAnswer } from '../actions/questions';
import { addUserAnswer } from '../actions/users';

class Polling extends Component {
  state = {
    currentAnswer: 'optionOne',
    answered: this.props.answer,
  };
  handleSubmit = e => {
    e.preventDefault();
    const { currentAnswer } = this.state;
    const { dispatch, question, user } = this.props;
    const info = {
      authedUser: user.id,
      qid: question.id,
      answer: currentAnswer,
    };
    dispatch(handleAddQuestionAnswer(info));
    dispatch(addUserAnswer(info));
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
    if (this.props.authedUser === null) {
      return <p>Please press Home to log in</p>;
    }
    const { name, avatarURL } = this.props.user;
    const { question } = this.props;
    const { answered } = this.state;

    const optionOneVotes = question.optionOne.votes.length;
    const optionTwoVotes = question.optionTwo.votes.length;
    const allVotes = optionOneVotes + optionTwoVotes;

    const optionOnePct = answered ? this.convertToPct(optionOneVotes / allVotes) : null;
    const optionTwoPct = answered ? this.convertToPct(optionTwoVotes / allVotes) : null;

    return (
      <div className="results">
        <div className="question">
          <div className="question-header">{answered ? `Asked By ${name}` : `${name} asks:`}</div>
          <div className="question-body">
            <div className="avatar-section">
              <span className="helper" />
              <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar-big" />
            </div>
            <div className="line" />
            <div className="polling-section">
              <div className="polling-header">{answered ? 'Results' : 'Would You Rather ...'}</div>
              {answered ? (
                <div className="polling-body-results">
                  <div
                    className={
                      answered === 'optionOne'
                        ? 'polling-choosen-answer'
                        : 'polling-unchoosen-answer'
                    }
                  >
                    {answered === 'optionOne' ? <div className="vote">Your vote</div> : null}
                    <div>Would you rather {question.optionOne.text}?</div>
                    <div className="polling-percentage" style={{ width: optionOnePct }}>
                      {optionOnePct}
                    </div>
                    <div className="polling-answers-count">
                      {optionOneVotes} out of {allVotes} votes
                    </div>
                  </div>

                  <div
                    className={
                      answered === 'optionTwo'
                        ? 'polling-choosen-answer'
                        : 'polling-unchoosen-answer'
                    }
                  >
                    {answered === 'optionTwo' ? <div className="vote">Your vote</div> : null}
                    <div>Would you rather {question.optionTwo.text}?</div>
                    <div className="polling-percentage" style={{ width: optionTwoPct }}>
                      {optionTwoPct}
                    </div>
                    <div className="polling-answers-count">
                      {optionTwoVotes} out of {allVotes} votes
                    </div>
                  </div>
                </div>
              ) : (
                <div className="polling-body">
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
                  <button className="polling-btn" type="submit" onClick={this.handleSubmit}>
                    Submit
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser, users, questions }, props) {
  const { question_id } = props.match.params;
  const user = users[authedUser];
  const answer = user ? user.answers[question_id] : null;
  const question = questions ? questions[question_id] : null;

  return {
    authedUser,
    question_id,
    user,
    question,
    answer,
  };
}

export default connect(mapStateToProps)(Polling);
