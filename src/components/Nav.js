import React from 'react';
import { connect } from 'react-redux';
import { NavLink } from 'react-router-dom';
import AuthorisedUser from './AuthorisedUser';
import PropTypes from 'prop-types';

function Nav(props) {
  return (
    <div className="navigation-block">
      <div className="navigation-item">
        <NavLink className="link" to="/" exact activeClassName="active">
          Home
        </NavLink>
      </div>
      <div className="navigation-item">
        <NavLink className="link" to="/add" activeClassName="active">
          New Question
        </NavLink>
      </div>
      <div className="navigation-item">
        <NavLink className="link" to="/leaderboard" activeClassName="active">
          Leader Board
        </NavLink>
      </div>
      <div>{props.authedUser !== null ? <AuthorisedUser /> : null}</div>
    </div>
  );
}
Nav.propTypes = {
  authedUser: PropTypes.string,
};

function mapStateToProps({ authedUser }) {
  return {
    authedUser,
  };
}

export default connect(mapStateToProps)(Nav);
