import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';
import DefaultProfileImage from "../../assets/images/profile.png";
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
    
    var route = this.props.location.pathname
    var path = route.split('/');

    var isActive0 = ''
    var isActive1 = ''
    var isActive2 = ''
    if(path[1] === "freelancer"  || path[1] === "addfreelancer" || path[1] === "freelancer-detail" || path[1] === "editfreelancer"){
        isActive1 = "active"
    }else if(path[1] === "leads"){
        isActive2 = "active"
    }else if(path[1] === "users" || path[1] === "adduser" || path[1] === "edituser"){
        isActive0 = "active"
    }

    // console.log('addfreelancer', localStorage.role)
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

                            <div className="collapse navbar-collapse mean-menu" >
                               {auth.isAuthenticated &&
                                <React.Fragment>
                                    <ul className="navbar-nav ml-auto">
                                        {localStorage.role === 'admin' &&
                                            <li className="nav-item">
                                                <Link to="/users" className={"nav-link "  + isActive0}>
                                                <i className="bx bx-user-circle"></i> Users
                                                </Link>
                                            </li>
                                        }
                                        
                                        <li className="nav-item">
                                            <Link to="/freelancer" className={"nav-link "  + isActive1}>
                                            <i className="bx bx-user"></i> Freelancers
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link to="/leads" className={"nav-link " + isActive2}>
                                            <i className="bx bx-sitemap"></i> Leads
                                            </Link>
                                        </li>



                                        <li className="nav-item">
                                            <a href="#" className="nav-link">
                                               <img src={localStorage.image !== "null" ? localStorage.image : DefaultProfileImage} className="header-menu-user-profile-image"/> {localStorage.Name}
                                                <i className="bx bx-chevron-down"></i>
                                            </a>
                
                                            <ul className="dropdown-menu">
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link"><i className="bx bx-edit"></i> Edit Profile</a>
                                                </li>
                                                <li className="nav-item">
                                                    <a href="#" className="nav-link danger" onClick={this.logout}><i className="bx bx-log-out"></i> Logout</a>
                                                </li>
                                            </ul>
                                        </li>
                                    </ul>
                                    
                                    {/* <div className="others-option">
                                        <div className="get-quote">
                                            <a href="#" onClick={this.logout} className="default-btn">
                                                Log Out
                                            </a>
                                        </div>
                                    </div> */}
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