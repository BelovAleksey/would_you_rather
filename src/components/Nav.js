import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AuthorisedUser from './AuthorisedUser';

class Nav extends Component {
  render() {
    return (
      <div className="navigation-block">
        <div className="navigation-item">
          <NavLink to="/" exact activeClassName="active">
            Home
          </NavLink>
        </div>
        <div className="navigation-item">
          <NavLink to="/add" activeClassName="active">
            New Question
          </NavLink>
        </div>
        <div className="navigation-item">
          <NavLink to="/leaderboard" activeClassName="active">
            Leader Board
          </NavLink>
        </div>
        <div>{this.props.authedUser !== null ? <AuthorisedUser /> : null}</div>
      </div>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(Nav);
