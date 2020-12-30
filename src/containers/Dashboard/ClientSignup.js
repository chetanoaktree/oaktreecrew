import React from 'react';
import { withRouter } from "react-router-dom";


// import logo from "../../assets/images/logo.png";


function ClientSignup(props) {
    
    
    return(
       <section className="job-information-area ptb-100">
          <div className="container">
          
            <div className="section-title">
              <span>Our talent experts will connect with you to help you find the team you require.</span>
              <h2>How can we reach you ?</h2>
            </div>      
          
          
            <div className="job-information">
              <form>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name*</label>
                      <input className="form-control" type="text" name="title" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Company Name</label>
                      <input className="form-control" type="text" name="Company" />
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>Business Email</label>
                      <input className="form-control" type="email" name="email" />
                    </div>
                  </div>
                  
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>Phone Number</label>
                      <input className="form-control" type="phone" name="phone" />
                    </div>
                  </div>              

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Timezone*</label>
                      <select>
                        <option value="1">Dateline Standard Time, (GMT-12:00) International Date Line West</option>
                        <option value="2">Samoa Standard Time, (GMT-11:00) Midway Island, Samoa</option>
                        <option value="3">Hawaiian Standard Time, (GMT-10:00) Hawaii</option>
                        <option value="4">Alaskan Standard Time, (GMT-09:00) Alaska</option>
                        <option value="5">Pacific Standard Time, (GMT-08:00) Pacific Time (US and Canada); Tijuana</option>
                      </select>
                    </div>
                  </div>


                  <div className="col-12">
                    <div className="form-group checkboxs">
                      <input type="checkbox" id="chb2" />
                      <p>
                        By clicking checkbox, you agree to our <a href="#">Terms & Conditions</a> And <a href="#">Privacy Policy.</a>
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <button className="default-btn">
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
    )
}

export default withRouter(ClientSignup);