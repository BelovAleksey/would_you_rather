import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';
import { Redirect } from 'react-router-dom';
import Login from './Login';
import PropTypes from 'prop-types';

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
    toHome: false,
  };
  handleChange = e => {
    const text = e.target.value;
    const id = e.target.id;
    if (id === 'optionOne') {
      this.setState(() => ({
        optionOneText: text,
      }));
    } else if (id === 'optionTwo') {
      this.setState(() => ({
        optionTwoText: text,
      }));
    }
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
    const { optionOneText, optionTwoText, toHome } = this.state;
    if (toHome === true) {
      return <Redirect to="/" />;
    }
    if (this.props.authedUser === null) {
      return <Login />;
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
              value={optionOneText}
              id="optionOne"
              onChange={this.handleChange}
              className="textarea"
            />
            <div className="new-question-or">OR</div>
            <textarea
              placeholder="Enter Option Two Text Here"
              value={optionTwoText}
              id="optionTwo"
              onChange={this.handleChange}
              className="textarea"
            />
            <button
              className="new-question-button"
              type="submit"
              disabled={optionOneText === '' || optionTwoText === ''}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }
}
NewQuestion.propTypes = {
  authedUser: PropTypes.string,
};

function mapToStateProps({ authedUser }) {
  return {
    authedUser,
  };
}
export default connect(mapToStateProps)(NewQuestion);
