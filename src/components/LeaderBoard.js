import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
class LeaderBoard extends Component {
  render() {
    if (this.props.authedUser === null) {
      return <Redirect to="/login" />;
    }
    return (
      <div className="leader-list">
        <ul>
          {Object.values(this.props.users).map(user => (
            <li key={user.id}>
              <div className="leader-section">
                <div className="avatar-section">
                  <img src={user.avatarURL} alt={`Avatar of ${user.name}`} className="avatar-big" />
                </div>
                <div className="questions-section">
                  <div className="leaderboard-name">{user.name}</div>
                  <div className="questions-section-body">
                    <div className="leaderboard-questions">
                      Answered questions {Object.keys(user.answers).length}
                    </div>
                    <div className="line"> </div>
                    <div className="leaderboard-questions">
                      Created questions {user.questions.length}
                    </div>
                  </div>
                </div>
                <div className="leaderboard-score">
                  <div className="leaderboard-score-header">Score</div>
                  <div className="leaderboard-score-body">
                    {Object.keys(user.answers).length + user.questions.length}
                  </div>
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
