import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  };
  handleChangeOptionOne = e => {
    const text = e.target.value;
    this.setState(() => ({
      optionOneText: text,
    }));
  };
  handleChangeOptionTwo = e => {
    const text = e.target.value;
    this.setState(() => ({
      optionTwoText: text,
    }));
  };
  handleSubmit = e => {
    e.preventDefault();
    const { optionOneText, optionTwoText } = this.state;

    const { dispatch } = this.props;

    dispatch(handleAddQuestion(optionOneText, optionTwoText));

    this.setState({
      optionOneText: '',
      optionTwoText: '',
      toHome: true,
    });
  };
  render() {
    const { optionOne, optionTwo, toHome } = this.state;
    if (toHome === true) {
      return <Redirect to="/" />;
    }
    if (this.props.authedUser === null) {
      return <p>Please press Home to log in</p>;
    }
    return (
      <div className="new-question">
        <div className="new-question-header">Create New Question</div>
        <div className="new-question-div-one">Complete the question:</div>
        <div className="new-question-div-two">Would you rather ...</div>
        <div className="new-question-body">
          <form className="" onSubmit={this.handleSubmit}>
            <textarea
              placeholder="Enter Option One Text Here"
              value={optionOne}
              onChange={this.handleChangeOptionOne}
              className="textarea"
            />
            <div className="new-question-or">OR</div>
            <textarea
              placeholder="Enter Option Two Text Here"
              value={optionTwo}
              onChange={this.handleChangeOptionTwo}
              className="textarea"
            />
            <button
              className="new-question-button"
              type="submit"
              disabled={optionOne === '' || optionTwo === ''}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
function mapToStateProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapToStateProps)(NewQuestion);
