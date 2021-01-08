import React, { useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { login, resetPassword } from '../../actions/authActions';
// import Loader from '../../components/Loader/Loader';
import { withRouter } from "react-router-dom";
import {NotificationManager} from 'react-notifications';
import { Button, Modal,Row,Col } from 'react-bootstrap';


function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        error : "",
        successMessage: null,
        show: false,
        sucess: false,
        email_error: ''
    })

    const dispatch = useDispatch();

    const handleChange = (e) => {
      // console.log("----",e)
        const {id , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [id] : value
        }))
    }

    const handleSubmitClick = (e) => {
        e.preventDefault();
        const data={
            "email":state.email,
            "password":state.password,
        }
        dispatch(login({user: data}))
          .then((res)=> {
            if(res && res.status === 200) {
               props.history.push('/freelancer');
            }else{
               NotificationManager.error(res.message, 'Error');  
            }
          })
    }

    const handleShow = () => {
        setState(prevState => ({
            ...prevState,
            show: true
        }))
    }; 

    const handleSucessClose = () => {
        setState(prevState => ({
            ...prevState,
            sucess: false
        }))
    }; 

    const handleClose = () => {
        setState(prevState => ({
            ...prevState,
            show: false
        }))
    }; 

    const fieldValChange = (e) => {
      setState(prevState => ({
            ...prevState,
            [e.target.name] : e.target.value,
            error1: null,
            email_error: ''
      }))
      // this.checkEmpty();
    }
    const forgotPassword = (e) => {
        e.preventDefault();    
        const { email } = state;
        if (email) {
          dispatch(resetPassword({user:{'email': email}}))
          .then((res) => {
            if(res.data.status === 400) {
              setState(prevState => ({
                  ...prevState,
                  email_error: res.data.message
              }))
              NotificationManager.error(res.data.message, 'Error');
            } else {
              NotificationManager.success(res.data.message, 'Success');
              setState(prevState => ({
                  ...prevState,
                  show: false, email: '', sucess: true
              }))
            }
          }).catch((e) => {
            setState(prevState => ({
                ...prevState,
                show: false
            }))
          })
        } else {
          NotificationManager.error('Please enter email.', 'Error');
          setState(prevState => ({
              ...prevState,
              email_error: 'please enter email.'
          }))
        }
    };

    const loader = useSelector(state => (state.applicationIsLoading), shallowEqual)
    // console.log("state.email",loader)
    
    return(
        <section className="user-area ptb-100">
            <div className="container">
              <div className="row">
                <div className="col-lg-3">
                
                </div>
              
                <div className="col-lg-6">
                  <div className="user-form-content log-in-50 pt-4">
                    <h3>Log In to Your Account</h3>
                  
                    <form className="user-form">
                      <div className="row">
                        <div className="col-12">
                          <div className="form-group">
                            <label>Email</label>
                            <input type="email" 
                                   className="form-control" 
                                   id="email" 
                                   placeholder="Enter email" 
                                   value={state.email}
                                   onChange={handleChange}
                            />
                          </div>
                        </div>
          
                        <div className="col-12">
                          <div className="form-group">
                            <label>Password</label>
                            <input type="password" 
                                     className="form-control" 
                                     id="password" 
                                     placeholder="Password"
                                     value={state.password}
                                     onChange={handleChange} 
                              />
                          </div>
                        </div>
          
                        <div className="col-12">
                          <div className="login-action">
                            <span className="log-rem">
                              <input id="remember" type="checkbox" />
                              <label>Keep me logged in</label>
                            </span>
                            
                            <span className="forgot-login">
                              <a href="#" onClick={handleShow}>Forgot your password?</a>
                            </span>
                          </div>
                        </div>
          
                        <div className="col-12">
                          <button className="default-btn" type="submit" onClick={handleSubmitClick} disabled={loader}>
                            Log In
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div className="col-lg-3">
                
                </div>

              </div>
              <Modal show={state.sucess} className="forgot-password-succes-popup" centered>
                <Modal.Body>
                    {/* <img src={forgot_password_succes} alt="success" className="forgot-password-succes-popup-image"/> */}
                    <h3 className="text-center">Success</h3>
                    <p className="text-center">Password reset link has been sent successfully. <br />You can check your inbox.</p>

                  <center> 
                    <button className="default-btn" type="submit" onClick={handleSucessClose}>
                      Close
                    </button>
                  </center> 

                </Modal.Body>
              </Modal>



                  <Modal show={state.show} onHide={handleClose} className="Reset-Your-Password-Popup" centered >
                    <Modal.Body>
                      <h3 className="text-center">Reset Your Password</h3>
                      <p className="text-center">Please enter the Email address which is registered with us.<br />We will send a new password to that address.</p>
                      
                      <Row>
                        <Col xs={12} md={1}>

                        </Col>
                        <Col xs={12} md={10}>
                          { state.email_error ? (
                          <div className="alert alert-danger" role="alert">
                            {state.email_error}
                          </div>
                          ) : null
                          }
    
                          <input type="email" name="email" className="form-control" placeholder="Enter Your Email Address" id="email" value={state.email} onChange={fieldValChange} required />
                          <span>{state.error1}</span>

                        </Col>                                
                      </Row>
                    </Modal.Body>
                    <Modal.Footer>
                      <button className="default-btn default-btn btn-two" onClick={handleClose}>Close</button>
                      <button className="default-btn default-btn" onClick={forgotPassword} disabled={loader}>Send</button>
                    </Modal.Footer>

                    
                  </Modal>
            </div>
          </section>
    )
}

export default withRouter(LoginForm);