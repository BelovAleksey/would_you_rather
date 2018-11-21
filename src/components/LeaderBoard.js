import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class LeaderBoard extends Component {
  render() {
    if (this.props.authedUser === null) {
      return <Redirect to="/login" />;
    }
    return (
      <div>
        <ul className="center">
          {Object.values(this.props.users).map(user => (
            <li key={user.id}>
              <div>
                <h3>{user.name}</h3>
                <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="avatar-big" />
                <div>
                  <span>Answered questions {Object.keys(user.answers).length}</span>
                  <span>Created questions {user.questions.length}</span>
                </div>
                <div>
                  <span>Score</span>
                  <span>{Object.keys(user.answers).length + user.questions.length}</span>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}
function mapStateToProps({ authedUser, users }) {
  return {
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
