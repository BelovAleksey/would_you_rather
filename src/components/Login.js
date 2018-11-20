import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { Dropdown } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { setAuthedUser } from '../actions/authedUser';

class Login extends Component {
  state = {
    currentOption: 'unselected',
    toHome: false,
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
    this.setState(() => ({
      toHome: true,
    }));
  };

  render() {
    const { currentOption, toHome } = this.state;
    if (toHome === 'true' || this.props.authedUser !== null) {
      return <Redirect to="/home" />;
    }
    return (
      <div className="login">
        <div>
          <h3>Welcome to the Would You Rather App!</h3>
          <span>Please sign in to continue</span>
        </div>
        <img
          className="login-image"
          src="https://image.flaticon.com/icons/svg/544/544570.svg"
          alt="Would you rather"
        />
        <Dropdown
          placeholder="Select User"
          fluid
          selection
          options={this.props.users}
          onChange={this.handleChange}
        />
        <button
          className="login-button"
          onClick={this.handleSubmit}
          disabled={currentOption === 'unselected' ? true : false}
        >
          Sign In
        </button>
      </div>
    );
  }
}
function mapStateToProps({ users, authedUser }) {
  return {
    authedUser,
    users: Object.values(users).map(user => ({
      text: user.name,
      value: user.id,
      image: { avatar: user.avatarURL ? true : false, src: user.avatarURL },
    })),
  };
}
export default connect(mapStateToProps)(Login);
