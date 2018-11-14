import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
  state = {
    currentOption: 'unselected',
  };
  handleChange = (e, data) => {
    e.preventDefault();
    this.setState(() => ({
      currentOption: data.value,
    }));
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(this.state.currentOption));
  };

  render() {
    const { currentOption } = this.state;
    return (
      <div className="center">
        <h3>Welcome to the Would You Rather App!</h3>
        <span>Please sign in to continue</span>
        <span>Sign in</span>
        <Dropdown
          placeholder="Select User"
          fluid
          selection
          options={this.props.users}
          onChange={this.handleChange}
        />
        <button
          className="btn"
          onClick={this.handleSubmit}
          disabled={currentOption === 'unselected' ? true : false}
        >
          Sign In
        </button>
      </div>
    );
  }
}
function mapStateToProps({ users }) {
  return {
    users: Object.values(users).map(user => ({
      text: user.name,
      value: user.id,
      image: { avatar: user.avatarURL ? true : false, src: user.avatarURL },
    })),
  };
}
export default connect(mapStateToProps)(Login);
