import React, { Component } from 'react'
import Toolbar from "./ToolBar/Toolbar";
import { Route } from "react-router-dom";
import CreativeBoard from './CreativeBoard/CreativeBoard';
import ThingsToDo from './ThingsToDo/ThingsToDo';
import SignIn from './SignIn/SignIn';
import { connect } from 'react-redux';
import { Redirect } from "react-router-dom";
function PrivateRoute({ component: Component, authed, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) => authed === true
        ? <Component {...props} />
        : <Redirect to={{ pathname: '/', state: { from: props.location } }} />}
    />
  )
}
class App extends Component {
  render() {
    return (
      <React.Fragment>
        <header className="App-header">
          <Toolbar />
        </header>
        <Route path="/" exact component={SignIn} />
        <PrivateRoute authed={this.props.isLog} path="/createlist" exact component={CreativeBoard} />
        <PrivateRoute authed={this.props.isLog} path="/thingstodo" exact component={ThingsToDo} />
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => ({
  isLog: state.auth.isLoggin,
})
export default connect(mapStateToProps)(App);
