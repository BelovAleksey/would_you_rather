import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { LoadingBar } from 'react-redux-loading';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Home from './Home';
import NewQuestion from './NewQuestion';
import Polling from './Polling';
import LeaderBoard from './LeaderBoard';
import Login from './Login';
import Nav from './Nav';

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
            {this.props.loading === true ? null : (
              <div>
                <Route exact path="/" component={this.props.authedUser === null ? Login : Home} />
                <Route path="/question/:question_id" component={Polling} />
                <Route path="/leaderboard" component={LeaderBoard} />
                <Route path="/add" component={NewQuestion} />
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
