import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';

import logo from "../../assets/images/logo.png";


class Header extends Component {

  constructor(props){
    super(props)
    this.state = { 
      search: ''
    }
  }

  logout = (e) => {
    e.preventDefault();
    this.props.logout();
    this.props.history.push('/')
  }

  render() {
    const { auth } = this.props;
    // console.log("authh",auth)
    
    
    return (
        <header className="header-area">
            <div className="navbar-area is-sticky">
                <div className="mobile-nav">
                    <div className="container">
                        <div className="mobile-menu">
                            <div className="logo">
                                <a href="/">
                                    <img src={logo} alt="logo" />
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="desktop-nav">
                    <div className="container">
                        <nav className="navbar navbar-expand-md navbar-light">
                            <a className="navbar-brand" href="/">
                                <img src={logo} alt="logo" />
                            </a>

                            <div class="collapse navbar-collapse mean-menu" >
                               {auth.isAuthenticated &&
                                <React.Fragment>
                                    <ul class="navbar-nav m-auto">
                                        <li class="nav-item">
                                            <a href="#" class="nav-link active">
                                                Dashboard
                                            </a>
                                        </li>

                                        <li class="nav-item">
                                            <a href="#" class="nav-link">
                                                Freelancers
                                            </a>
                                        </li>

                                        <li class="nav-item">
                                            <a href="#" class="nav-link">
                                                Clients
                                            </a>
                                        </li>

                                        <li class="nav-item">
                                            <a href="#" class="nav-link">
                                                Message
                                            </a>
                                        </li>

                                        <li class="nav-item">
                                            <a href="#" class="nav-link">
                                                Settings
                                            </a>
                                        </li>
                                    </ul>
                                    
                                    <div class="others-option">
                                        <div class="get-quote">
                                            <a href="#" onClick={this.logout} class="default-btn">
                                                Log Out
                                            </a>
                                        </div>
                                    </div>
                                </React.Fragment>
                               }
                               {/* !auth.isAuthenticated &&
                                <React.Fragment>
                                    <ul class="navbar-nav m-auto">
                                        
                                    </ul>
                                    
                                    <div class="others-option">
                                        <div class="get-quote">
                                            <a href="/login" class="default-btn">
                                                Login
                                            </a>
                                        </div>
                                    </div>
                                </React.Fragment>
                               */}
                            </div>
                        </nav>
                    </div>
                </div>

                <div className="others-option-for-responsive">
                    <div className="container">
                        <div className="dot-menu">
                            <div className="inner">
                                <div className="circle circle-one"></div>
                                <div className="circle circle-two"></div>
                                <div className="circle circle-three"></div>
                            </div>
                        </div>
                        
                        <div className="container">
                            <div className="option-inner">
                                <div className="others-option justify-content-center d-flex align-items-center">
                                    <div className="get-quote">
                                        <a href="#" className="default-btn">
                                            Post a Job
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
  }
}

Header.contextTypes = {
    router: PropTypes.object
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => dispatch(logout())
  };
};

function mapStateToProps(state) {
  return{
    auth: state.auth
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);