import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { login } from '../../actions/authActions';
// import Loader from '../../components/Loader/Loader';
import { withRouter } from "react-router-dom";

import {NotificationManager} from 'react-notifications';
// import { Button, Modal,Row,Col } from 'react-bootstrap';

function LoginForm(props) {
    const [state , setState] = useState({
        email : "",
        password : "",
        error : "",
        successMessage: null
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

    // const loader = useSelector(state => (state.applicationIsLoading), shallowEqual)

    
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
                              <input id="remember-2" type="checkbox" />
                              <label>Keep me logged in</label>
                            </span>
                            
                            <span className="forgot-login">
                              <a href="#">Forgot your password?</a>
                            </span>
                          </div>
                        </div>
          
                        <div className="col-12">
                          <button className="default-btn" type="submit" onClick={handleSubmitClick}>
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
            </div>
          </section>
    )
}

export default withRouter(LoginForm);