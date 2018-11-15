import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import { LoadingBar } from 'react-redux-loading';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Home from './Home';
import NewQuestion from './NewQuestion';
import Polling from './Polling';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import Nav from './Nav';
import AuthorisedUser from './AuthorisedUser';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return (
      <Router>
        <Fragment>
          <LoadingBar />
          <div>
            <Nav />
            {this.props.authedUser !== null ? <AuthorisedUser /> : null}
            {this.props.loading === true ? null : (
              <div>
                {this.props.authedUser !== null ? (
                  <Route exact path="/" render={() => <Redirect to="/home" />} />
                ) : (
                  <Route exact path="/" render={() => <Redirect to="/login" />} />
                )}
                <Route path="/login" component={Login} />
                <Route path="/questions/:question_id" component={Polling} />
                <Route path="/leaderboard" component={LeaderBoard} />
                <Route path="/add" component={NewQuestion} />
                <Route path="/home" component={Home} />
              </div>
            )}
          </div>
        </Fragment>
      </Router>
    );
  }
}

function mapStateToProps({ users, questions, authedUser }) {
  return {
    loading: questions === null,
    authedUser,
    users,
  };
}

export default connect(mapStateToProps)(App);
