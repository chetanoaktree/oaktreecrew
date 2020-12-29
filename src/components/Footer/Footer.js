import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
// import { Button, Modal } from 'react-bootstrap';
import { subcribtion } from '../../actions/authActions';
import {NotificationManager} from 'react-notifications';
import logo from "../../assets/images/logo.png";


class Footer extends React.Component {
    constructor(props, context) {
        super(props);
        this.state = {
          show: false,
          email: '',
          error: ""
        }
    }
    fieldValChange = (e) => {
        this.setState({email: e.target.value})
    } 

    handleClose = () => {
        this.setState({show: false})
    }

    subcribe = () => {
        if(this.state.email){
            this.props.subcribtion(this.state.email)
            .then((res) => {
              if(res.data.status === 200) {
                NotificationManager.success(res.data.message, 'Success');  
                this.setState({show: false})
                // this.props.history.push('/campaign')
              } else {
                NotificationManager.error(res.data.message, 'Error');  
                this.setState({
                  error: "something went wrong."
                })
              }
            })

        }else{
            NotificationManager.error("Please enter valid email address", 'Error');  
        }
    }

  render() {
    const { authenticated, location } = this.props;
    if((!authenticated) && location.pathname !== '/')
        return null
    return (
      <React.Fragment>
        <footer className="footer-area pt-100 pb-70">
            <div className="container">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <div className="single-footer-widget single-bg">
                            <a href="#" className="logo">
                                <img src={logo} alt="Image" />
                            </a>

                            <p>OakTreeCrew is a software development firm known for developing business solutions for small to large scale businesses. Headquartered in India, four enthusiastic and young minds have started it in 2016 from Indore. We are serving clients globally</p>

                            <ul className="social-icon">
                                <li>
                                    <a href="#">
                                        <i className="bx bxl-facebook"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="bx bxl-instagram"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="bx bxl-linkedin-square"></i>
                                    </a>
                                </li>
                                <li>
                                    <a href="#">
                                        <i className="bx bxl-twitter"></i>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="single-footer-widget">
                            <h3>Contact</h3>

                            <ul className="address">
                                <li>
                                    <i className="bx bx-phone-call"></i>
                                    <span>Phone:</span>
                                    <a href="tel:+1-(514)-7939-357">+91 0731 499 1873</a>
                                </li>
                                <li>
                                    <i className="bx bx-envelope"></i>
                                    <span>Email:</span>
                                    <a href="mailto:hello@oaktreecrew.com">info@oaktreescrew.com</a>
                                </li>
                                <li className="location">
                                    <i className="bx bx-location-plus"></i>
                                    <span>Address:</span>
                                    Shekhar central, 8th, floor, 802, Palasia Square, Manorama Ganj, Indore, Madhya Pradesh 452001
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="single-footer-widget">
                            <h3>Helpful Resources</h3>

                            <ul className="import-link">
                                <li>
                                    <a href="#">Create Account</a>
                                </li>
                                <li>
                                    <a href="#">Contact Us</a>
                                </li>
                                <li>
                                    <a href="#">Site Map</a>
                                </li>
                                <li>
                                    <a href="#">Terms of Use</a>
                                </li>
                                <li>
                                    <a href="#">Privacy Centre</a>
                                </li>
                                <li>
                                    <a href="#">Blog</a>
                                </li>
                            </ul>
                        </div>
                    </div>

                    <div className="col-lg-3 col-md-6">
                        <div className="single-footer-widget">
                            <h3>Job Seekers</h3>

                            <ul className="import-link">
                                <li>
                                    <a href="#">Create Account</a>
                                </li>
                                <li>
                                    <a href="#">Browse Jobs</a>
                                </li>
                                <li>
                                    <a href="#">Upload CV</a>
                                </li>
                                <li>
                                    <a href="#">Company Profile</a>
                                </li>
                                <li>
                                    <a href="#">International Jobs</a>
                                </li>
                                <li>
                                    <a href="#">FAQ</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </footer>

        <div className="copy-right-area">
            <div className="container">
                <p>
                    © 2020 Oak Tree Crew. All Rights Reserved.
                </p>
            </div>
        </div>
        <div className="go-top active">
            <i className="bx bx-chevrons-up"></i>
            <i className="bx bx-chevrons-up"></i>
        </div>
      </React.Fragment>  
    )
  }
}

const mapStateToProps = (state) => {
  // console.log('state',state)
  return {
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    subcribtion: (email) => dispatch(subcribtion(email))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Footer);