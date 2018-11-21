import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink, Redirect } from 'react-router-dom';
import AuthorisedUser from './AuthorisedUser';

class Nav extends Component {
  handleClick = e => {
    if (this.props.authedUser === null) {
      e.preventDefault();
    }
  };
  render() {
    return (
      <div className="navigation-block">
        <div className="navigation-item">
          <NavLink className="link" to="/home" activeClassName="active" onClick={this.handleClick}>
            Home
          </NavLink>
        </div>
        <div className="navigation-item">
          <NavLink className="link" to="/add" activeClassName="active" onClick={this.handleClick}>
            New Question
          </NavLink>
        </div>
        <div className="navigation-item">
          <NavLink
            className="link"
            to="/leaderboard"
            activeClassName="active"
            onClick={this.handleClick}
          >
            Leader Board
          </NavLink>
        </div>
        <div>{this.props.authedUser !== null ? <AuthorisedUser /> : <Redirect to="/login" />}</div>
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
