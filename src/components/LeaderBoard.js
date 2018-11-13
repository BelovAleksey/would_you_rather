import React, { Component } from 'react';
import { connect } from 'react-redux';

class LeaderBoard extends Component {
  render() {
    console.log(this.props);
    return (
      <div>
        <ul className="center">
          {Object.values(this.props.users).map(user => (
            <li key={user.id}>
              <div>
                <h3>{user.name}</h3>
                <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="avatar" />
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
function mapStateToProps({ users }) {
  return {
    users,
  };
}

export default connect(mapStateToProps)(LeaderBoard);
