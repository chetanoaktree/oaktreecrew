import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';

import LoginForm from './containers/Login/LoginForm';

import './assets/style.css';


class ScrollToTop extends Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0)
    }
  }

  render() {
    return (
      <div className="app-frame">{this.props.children}</div>
    )
  }
}


function PublicOnlyRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => (!authed || (authed === false))
        ? <Component {...props} />
        : <Redirect to={{pathname: '/campaign', state: {from: props.location}}} />}
    />
  )
}

function PrivateRoute ({component: Component, authed, ...rest}) {
  return (
    <Route
      {...rest}
      render={(props) => localStorage.accessToken
        ? <Component {...props} />
        : <Redirect to={{pathname: '/login', state: {from: props.location}}} />}
    />
  )
}

const App = class App extends Component {

  render() {
    let { location, history, auth } = this.props;
    
    return (
      <ScrollToTop location={this.props.location}>
          <NotificationContainer/>
          <Header location={this.props.location} history={history}/>
          <Switch>
            <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/login" exact component={LoginForm} />

            
            <Route component={NoRouteFound} />
          </Switch>
          <Footer location={location} authenticated={auth.isAuthenticated}/>
      </ScrollToTop>
    )
  }

// )
}

function mapStateToProps(state) {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps, null)(App);
