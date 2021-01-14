import React, { useState, useEffect, setState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { withRouter, Link } from "react-router-dom";
import Select from "react-dropdown-select";
// import TIMEZONE from "../../constants/timezones";




function ClientSignup(props) {
    
    const [state , setState] = useState({
        timezone: "",
        skills: "",
        category: "",
        freelancer_ids: [],

    })

    const handleSelect = (name, value) => {
      // console.log(name,"----",value)
      if(value.length === 0){
        return false
      } 
        setState(prevState => ({
            ...prevState,
            [name] : value[0].value
        }))
    }
    
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
                      <Select 
                          name="timezone" 
                          // options={TIMEZONE}
                          onChange={(value) => handleSelect('timezone', value)} 
                          value={state.timezone}  
                      />
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