import React, { Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import axios from "axios";

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import LoginForm from './containers/Login/LoginForm';

import HR from './containers/HR/HR';
import AddFreelancer from './containers/HR/AddFreelancer';

import Dashboard from './containers/Dashboard/Dashboard';
import FreelancerSelect from './containers/Dashboard/FreelancerSelect';
import ClientSignup from './containers/Dashboard/ClientSignup';

import FreelancerDetail from './containers/Client/FreelancerDetail';
import NoRouteFound from './components/NoRoute/NoRoute';

import './assets/style.css';
import './assets/style/animate.min.css';
import './assets/style/boxicons.min.css';
import './assets/style/date-picker.min.css';
import './assets/style/flaticon.css';
import './assets/style/magnific-popup.min.css';
import './assets/style/meanmenu.min.css';
import './assets/style/nice-select.min.css';
import './assets/style/odometer.min.css';



import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';

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
        : <Redirect to={{pathname: '/dashboard', state: {from: props.location}}} />}
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
    (function () {
     const token = localStorage.getItem("accessToken");
     if (token) {
      axios.defaults.headers.common["Authorization"] = token;
     } else {
      axios.defaults.headers.common["Authorization"] = null;
      /*if setting null does not remove `Authorization` header then try     
              delete axios.defaults.headers.common['Authorization'];
      */
     }
    })();

    let { location, history, auth } = this.props;
    // console.log("auth",auth)
    return (
      <ScrollToTop location={this.props.location}>
          <React.Fragment>
            <NotificationContainer/>
            <Header location={this.props.location} authenticated={auth.isAuthenticated} history={history}/>
            <Switch>
              <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/" exact component={Dashboard} />
              <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/login" exact component={LoginForm} />
              <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/freelancers" exact component={FreelancerSelect} />
              <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/client-signup" exact component={ClientSignup} />
              <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/dashboard" exact component={HR} />
              <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/addfreelacner" exact component={AddFreelancer} />
              <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/freelancer-detail/:id" exact component={FreelancerDetail} />

              <Route component={NoRouteFound} />
            </Switch>
            <Footer location={location} authenticated={auth.isAuthenticated}/>
          </React.Fragment>
        )}
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
