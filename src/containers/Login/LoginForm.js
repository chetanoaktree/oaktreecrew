import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login, resetPassword, googleLogin, getConfirmation } from '../../actions/authActions';
// import Loader from '../../components/Loader/Loader';
import {NotificationManager} from 'react-notifications';
import { Button, Modal,Row,Col } from 'react-bootstrap';


class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: null,
      error1: null,
      show: '',
      errors: {
        email: '',
        password: ''
      },
      submittedOnce: false
    }
    this.checkEmpty = this.checkEmpty.bind(this)
  }

  fieldValChange = (e) => {
    this.setState({[e.target.name] : e.target.value,error1: null})
    this.checkEmpty();
  }

  checkEmpty(){
    const { email, password, errors } = this.state;
    // console.log("email",email)
    if(email === ""){
      errors['email'] = "Please enter email"
      this.setState({errors})
      return false
    }else{
      errors['email'] = ""
      this.setState({errors})
    }
    if(password === ""){
      errors['password'] = "Please enter password"
      this.setState({errors})
      return false
    }else{
      errors['password'] = ""
      this.setState({errors})
    }
    return true
  }

  login = (e) => {
    e.preventDefault();    
    this.setState({submittedOnce: true})
    if(this.checkEmpty()){
      const { email, password } = this.state;

      var userData = {}
      userData = {
        email,
        password
      }
      this.props.userLogin(userData)
      .then((res)=> {console.log("res",res)
        if(res && res.status !== 200) {
           NotificationManager.error(res.data.error && res.data.error.user_authentication, 'Error');  
          this.setState({
            error: res.data.error && res.data.error.user_authentication
          })
        }
      })
    }
  }

  componentDidMount(){

    if(this.props.location.search !== ""){
      var token = new URLSearchParams(this.props.location.search).get('token') 
      this.props.getConfirmation(REACT_API_URL + `/confirmation?token=${token}`)
      .then((response) => {
        if(response.status === 200){
           NotificationManager.success(response.message, 'Success');  
        }else{
          NotificationManager.error(response.message, 'Error');  
        }
        // console.log(response.data.last_page_number,'did')
      })
      // var code = new URLSearchParams(this.props.location.search).get('code')
      // // Simple POST request with a JSON body using fetch
      // var bodyData = {}
      // bodyData = {
      //   "provider": 'linkedin',
      //   "code": code
      // }
      // this.props.userLogin(bodyData)
      // .then((res)=> {
      //   if(res && res.status !== 200) {
      //     this.setState({
      //       error: res.data.error.user_authentication
      //     })
      //   }
      // }) 
    }
  }

  responseGoogle = (response) => {
    // console.log(response,'ress');
    var userData = {}
    userData = {
      provider: 'google',
      uid: response.googleId,
      first_name: response.profileObj.givenName || '',
      last_name: response.profileObj.familyName || '',
      email: response.profileObj.email
    }

    this.props.googleLogin(userData)
    .then((res)=> {
      if(res && res.status !== 200) {
        this.setState({
          error: res.data.error.user_authentication
        })
      }
    }).catch((err) => {
      console.log(err)
    })
  }

  /*requestProfile = () => {
    var oauthUrl = LINKEDIN_URL+RIDIRECT_URL
    window.location.replace(oauthUrl);
  };*/

  handleShow = () => {
      this.setState({show: true})
  }; 

  handleSucessClose = () => {
      this.setState({sucess: false})
  }; 

  handleClose = () => {
      this.setState({show: false})
  }; 

  forgotPassword = (e) => {
      e.preventDefault();    
      const { email } = this.state;
      if (email) {
        this.props.resetPassword(email)
        .then((res) => {
          if(res.data.status === 400) {
            this.setState({ email_error: res.data.message })     
            NotificationManager.error(res.data.message, 'Error');
          } else {
            NotificationManager.success(res.data.message, 'Success');
            this.setState({ show: false, email: '', sucess: true })
          }
        }).catch((e) => {
          this.setState({ show: false })
        })
      } else {
        NotificationManager.error('Please enter email.', 'Error');
        this.setState({ email_error: 'please enter email.' })
      }
  }; 

  render() {
    const { email_error } = this.state;
    const { isLoading } = this.props;
    if(localStorage.accessToken) {
      this.props.history.push('/')
    }
    // disabled={renderProps.disabled}
    return (
          <section class="user-area ptb-100">
            <div class="container">
              <div class="row">
                <div class="col-lg-3">
                
                </div>
              
                <div class="col-lg-6">
                  <div class="user-form-content log-in-50 pt-4">
                    <h3>Log In to Your Account</h3>
                  
                    <form class="user-form">
                      <div class="row">
                        <div class="col-12">
                          <div class="form-group">
                            <label>Email</label>
                            <input class="form-control" type="text" name="name" />
                          </div>
                        </div>
          
                        <div class="col-12">
                          <div class="form-group">
                            <label>Password</label>
                            <input class="form-control" type="password" name="password" />
                          </div>
                        </div>
          
                        <div class="col-12">
                          <div class="login-action">
                            <span class="log-rem">
                              <input id="remember-2" type="checkbox" />
                              <label>Keep me logged in</label>
                            </span>
                            
                            <span class="forgot-login">
                              <a href="#">Forgot your password?</a>
                            </span>
                          </div>
                        </div>
          
                        <div class="col-12">
                          <button class="default-btn" type="submit">
                            Log In
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>

                <div class="col-lg-3">
                
                </div>

              </div>
            </div>
          </section>
          
    )
  }
}

const mapStateToProps = (state) => {
  return {
    isLoading: state.applicationIsLoading
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    userLogin: (data) => dispatch(login(data)),
    resetPassword: (data) => dispatch(resetPassword(data)),
    googleLogin: (data) => dispatch(googleLogin(data)),
    getConfirmation: (url) => dispatch(getConfirmation(url))
  };
};


export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);