import React, { useState, useEffect, setState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { withRouter, Link } from "react-router-dom";
import {NotificationManager} from 'react-notifications';
import Select from "react-dropdown-select";
import TIMEZONES from "../../constants/timezones";
import { saveLeads } from '../../actions/hrActions';




function ClientSignup(props) {
    
    const dispatch = useDispatch();

    const [state , setState] = useState({
        name: "",
        company_name: "",
        business_email: "",
        phone_number: "",
        timezone: "",
        skills: "",
        freelancer_ids: [],
        category: "",
        checked: ""
    })

    const handleChange = (e) => {
      let name = e.target.name
      let value = e.target.value   
      if(e.target.type  === 'checkbox'){
        value = e.target.checked
      }
      console.log("e.target",e.target.checked)
        setState(prevState => ({
            ...prevState,
            [name] : value
        }))        
    }

    const handleSelect = (name, value) => {
      // console.log("value",value)
      if(value.length === 0){
        return false
      } 
        setState(prevState => ({
            ...prevState,
            [name] : value[0].time
        }))
    }
    const handleSave = (e) => {
      e.preventDefault(); 
      if(!state.checked){
        NotificationManager.error("Please accept terms and conditions", 'Error');
      }else{
        let data = { 
                  name: state.name,
                  company_name: state.company_name,
                  business_email: state.business_email,
                  phone_number: state.phone_number,
                  timezone: state.timezone,
                  skills: props.location.state.skills,
                  freelancer_ids: props.location.state.freelancer_ids,
                  category: props.location.state.category,
                }
        
            // console.log("form_data",data)
        dispatch(saveLeads(data)).then((res)=> {
            // console.log("res",res)
            if(res && res.data.status === 200) {
               NotificationManager.success(res.data.message, 'Success');
               props.history.push('/');
            }else{
               NotificationManager.error(res.data.message, 'Error');  
            }
        })
      }
    }
    
    const loader = useSelector(state => (state.applicationIsLoading), shallowEqual)
    // console.log("props.location.state",props.location.state)
    return(
       <section className="job-information-area ptb-100">
          <div className="container">
          
            <div className="section-title">
              <span>Our talent experts will connect with you to help you find the team you require.</span>
              <h2>How can we reach you ?</h2>
            </div>      
          
          
            <div className="job-information">
              <form className="resume-info" onSubmit={handleSave}>
                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Name<span className="text-danger">*</span></label>
                      <input className="form-control" type="text" name="name" onChange={handleChange} required/>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <div className="form-group">
                      <label>Company Name<span className="text-danger">*</span></label>
                      <input className="form-control" type="text" name="company_name" onChange={handleChange} required/>
                    </div>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>Business Email<span className="text-danger">*</span></label>
                      <input className="form-control" type="email" name="business_email" onChange={handleChange} required/>
                    </div>
                  </div>
                  
                  <div className="col-lg-6 col-md-6">
                    <div className="form-group">
                      <label>Phone Number<span className="text-danger">*</span></label>
                      <input className="form-control" type="phone" name="phone_number" onChange={handleChange} required/>
                    </div>
                  </div>              

                  <div className="col-lg-12 col-md-12">
                    <div className="form-group">
                      <label>Timezone<span className="text-danger">*</span></label>
                      <Select 
                          name="timezone"
                          options={TIMEZONES}
                          onChange={(value) => handleSelect('timezone', value)} 
                          value={state.timezone}
                          labelField="time"
                          valueField="time"
                          required
                      />
                    </div>
                  </div>


                  <div className="col-12">
                    <div className="form-group checkboxs">
                      <input type="checkbox" id="chb2" name="checked" checked={state.checked} onChange={handleChange}/>
                      <p>
                        By clicking checkbox, you agree to our <a href="#">Terms & Conditions</a> And <a href="#">Privacy Policy.</a>
                      </p>
                    </div>
                  </div>

                  <div className="col-lg-12">
                    <button className="default-btn" disabled={loader}>Submit </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </section>
    )
}

export default withRouter(ClientSignup);