import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleAddQuestion } from '../actions/questions';

class NewQuestion extends Component {
  state = {
    optionOneText: '',
    optionTwoText: '',
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
    });
  };
  render() {
    const { optionOne, optionTwo } = this.state;
    if (!this.props.authedUser) return <span>Please Login</span>;
    return (
      <div>
        <h3 className="center">Create New Question</h3>
        <form className="center" onSubmit={this.handleSubmit}>
          <textarea
            placeholder="Enter Option One Text Here"
            value={optionOne}
            onChange={this.handleChangeOptionOne}
            className="textarea"
          />
          <div>Or</div>
          <textarea
            placeholder="Enter Option Two Text Here"
            value={optionTwo}
            onChange={this.handleChangeOptionTwo}
            className="textarea"
          />
          <button className="btn" type="submit" disabled={optionOne === '' || optionTwo === ''}>
            Submit
          </button>
        </form>
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
