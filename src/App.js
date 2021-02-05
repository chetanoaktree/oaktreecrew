import React, { Suspense, lazy, Component } from 'react';
import { Switch, Route, Redirect } from "react-router-dom";
import { connect } from 'react-redux';
import axios from "axios";

import './assets/style.css';
import './assets/style/animate.min.css';
import './assets/style/boxicons.min.css';
import './assets/style/date-picker.min.css';
import './assets/style/flaticon.css';
import './assets/style/magnific-popup.min.css';
import './assets/style/meanmenu.min.css';
import './assets/style/nice-select.min.css';
import './assets/style/odometer.min.css';

import 'react-responsive-tabs/styles.css';
import 'react-table-v6/react-table.css'

import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';


const Header = lazy(() => import('./components/Header/Header'));
const Footer = lazy(() => import('./components/Footer/Footer'));
const LoginForm = lazy(() => import('./containers/Login/LoginForm'));
const RecoveryConfirmation = lazy(() => import('./containers/Password/Confirm'));

const Freelancer = lazy(() => import('./containers/HR/Freelancer'));
const AddFreelancer = lazy(() => import('./containers/HR/AddFreelancer'));
const EditFreelancer = lazy(() => import('./containers/HR/EditFreelancer'));
const CustomCV = lazy(() => import('./containers/HR/CustomCV'));
const Leads = lazy(() => import('./containers/HR/Leads'));

const Users = lazy(() => import('./containers/Admin/Users'));
const SaveUser = lazy(() => import('./containers/Admin/SaveUser'));

const Dashboard = lazy(() => import('./containers/Dashboard/Dashboard'));
const FreelancerSelect = lazy(() => import('./containers/Dashboard/FreelancerSelect'));
const ClientSignup = lazy(() => import('./containers/Dashboard/ClientSignup'));

const Interview = lazy(() => import('./containers/Interviewer/Interview'));

const Profile = lazy(() => import('./containers/Profile/Profile'));
const FreelancerDetail = lazy(() => import('./containers/Client/FreelancerDetail'));
const NoRouteFound = lazy(() => import('./components/NoRoute/NoRoute'));

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
        : <Redirect to={{pathname: (localStorage.role === 'hr') ? '/freelancer' : (localStorage.role === 'admin') ? '/users' : '/interview', state: {from: props.location}}} />}
    />
  )
}

function PrivateRoute ({component: Component, authed, role, ...rest}) {
  // console.log("role",role)
  return (
    <Route
      {...rest}
      render={(props) => localStorage.accessToken && role.includes(localStorage.role) 
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
        <Suspense fallback={<div id="lazzy" class="lazzy-center"></div> }>
          <React.Fragment>
            <NotificationContainer/>
            <Header location={this.props.location} authenticated={auth.isAuthenticated} history={history}/>
            <Switch>
              <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/" exact component={Dashboard} />
              <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/login" exact component={LoginForm} />
              <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/freelancers" exact component={FreelancerSelect} />
              <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/client-signup" exact component={ClientSignup} />
              <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/users/password/edit" exact component={RecoveryConfirmation} />  
              <PublicOnlyRoute history={history} authed={auth.isAuthenticated} location={location} path="/freelancer-details/:id" exact component={FreelancerDetail} />

              <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/freelancer" exact component={Freelancer} role={['admin','hr']}/>
              <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/addfreelancer" exact component={AddFreelancer} role={['hr']}/>
              <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/editfreelancer/:id" exact component={EditFreelancer} role={['hr']}/>
              <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/custom-cv/:id" exact component={CustomCV} role={['hr']}/>
              <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/freelancer-detail/:id" exact component={FreelancerDetail} role={['admin','hr']}/>
              <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/leads" exact component={Leads} role={['admin','hr']}/>

              <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/profile" exact component={Profile} role={['admin','hr','interviewer']}/>

              <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/users" exact component={Users} role={['admin']}/>
              <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/adduser" exact component={SaveUser} role={['admin']}/>
              <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/edituser/:id" exact component={SaveUser} role={['admin']}/>

              <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/interview" exact component={Interview} role={['interviewer']}/>
              <PrivateRoute history={history} authed={auth.isAuthenticated} location={location} path="/freelancer-interview/:id" exact component={FreelancerDetail} role={['interviewer']}/>

              <Route component={NoRouteFound} />
            </Switch>
            <Footer location={location} authenticated={auth.isAuthenticated}/>
          </React.Fragment>
        </Suspense>
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
