import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';

class AuthorisedUser extends Component {
  handleClick = e => {
    e.preventDefault();
    this.props.dispatch(setAuthedUser(''));
  };
  render() {
    const { user } = this.props;
    return (
      <div className="user">
        <span>Hello, {user.name}</span>
        <img className="avatar-small" src={user.avatarURL} alt={`Avatart of ${user.name}`} />
        <button onClick={this.handleClick}>Logout</button>
      </div>
    );
  }
}
function mapStateToProps({ users, authedUser }) {
  return {
    user: users[authedUser],
  };
}
export default connect(mapStateToProps)(AuthorisedUser);
