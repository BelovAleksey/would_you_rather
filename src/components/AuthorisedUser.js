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
      <div className="navigation-item">
        <div className="navigation-user">Hello, {user.name}</div>
        <div className="navigation-user">
          <img className="avatar-small" src={user.avatarURL} alt={`Avatart of ${user.name}`} />
        </div>
        <div className="navigation-user">
          <button className="logout" onClick={this.handleClick}>
            Logout
          </button>
        </div>
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
