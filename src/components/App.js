import React, { Component } from 'react';
import { connect } from 'react-redux';
import { handleInitialData } from '../actions/shared';
import Home from './Home';
import NewQuestion from './NewQuestion';
import Polling from './Polling';
import LeaderBoard from './LeaderBoard';
import Login from './Login';

class App extends Component {
  componentDidMount() {
    this.props.dispatch(handleInitialData());
  }
  render() {
    return <div>{this.props.loading === true ? null : <Login />}</div>;
  }
}
//<Polling match={{ params: { id: '6ni6ok3ym7mf1p33lnez' } }} />
function mapStateToProps({ questions }) {
  return {
    loading: questions === null,
  };
}

export default connect(mapStateToProps)(App);
