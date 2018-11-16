import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';

class Nav extends Component {
  handleClick = e => {
    if (this.props.authedUser === null) {
      e.preventDefault();
    }
  };
  render() {
    return (
      <nav className="nav">
        <ul>
          <li>
            <NavLink to="/home" activeClassName="active" onClick={this.handleClick}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/add" activeClassName="active" onClick={this.handleClick}>
              New Question
            </NavLink>
          </li>
          <li>
            <NavLink to="/leaderboard" activeClassName="active" onClick={this.handleClick}>
              Leader Board
            </NavLink>
          </li>
        </ul>
      </nav>
    );
  }
}

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(Nav);
