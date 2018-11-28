import React, { Component } from 'react';
import { connect } from 'react-redux';
import { setAuthedUser } from '../actions/authedUser';
import { Redirect } from 'react-router-dom';

class AuthorisedUser extends Component {
  state = {
    toHome: false,
  };
  handleClick = e => {
    e.preventDefault();
    this.setState({ toHome: true });
    this.props.dispatch(setAuthedUser(null));
  };
  render() {
    const { user } = this.props;
    if (this.state.toHome === true) {
      return <Redirect to="/" />;
    }

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
