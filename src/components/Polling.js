import React, { Component } from 'react';
import { connect } from 'react-redux';

class Polling extends Component {
  state = {
    selecteOption: 'one',
  };
  render() {
    const { name, avatarURL } = this.props.user;
    const question = this.props.question;

    return (
      <div className="question">
        <div className="question-info">{name} asks:</div>
        <img src={avatarURL} alt={`Avatar of ${name}`} className="avatar" />
        <div>
          <span>Would you rather</span>
          <form>
            <label>
              <input type="radio" value="optionOne" checked={this.state.selecteOption === 'one'} />
              {question.optionOne.text}
            </label>
            <label>
              <input type="radio" value="optionTwo" checked={this.state.optionOne === 'two'} />
              {question.optionTwo.text}
            </label>
            <button>Submit</button>
          </form>
        </div>
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
