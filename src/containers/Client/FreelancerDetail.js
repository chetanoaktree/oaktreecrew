import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { withRouter, useParams } from "react-router-dom";
import { getFreelancer } from '../../actions/hrActions';
import _ from 'lodash';
import avatar from "../../assets/images/avatar-img.jpg";


function FreelancerDetail(props) {
    
    const [state , setState] = useState({
        detail: ''
      })
    const dispatch = useDispatch();
    
    useEffect(() => {
      fetchData();
    }, []);

    const { id } = useParams();
    // console.log("id",id)

    const fetchData = () => {
      
      // Update the document title using the browser API
      dispatch(getFreelancer(id)).then((res)=> {
          if(res && res.status === 200) {
            // console.log("res",res.data)
            setState(prevState => ({
                detail: res.data.user
            }))
          }
      })
    }
    console.log("detail",state.detail)
    return(
      <React.Fragment>
        <div className="page-title-area">
          <div className="container">
            <div className="page-title-content">
              <h2>Candidates Details</h2>
              <ul>
                <li>
                  <a href="#">
                    Home 
                  </a>
                </li>
                <li className="active">Candidates Details</li>
              </ul>
            </div>
          </div>
        </div>

        <section className="candidates-details-area ptb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="candidates-cv">
                  <div className="row align-items-center">
                    <div className="col-lg-2">
                      <div className="hot-jobs-img">
                        <img src={avatar} alt="Image" />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="candidates-cv-content">
                        <h3>{_.get(state.detail, 'first_name', ['']) + ' ' +_.get(state.detail, 'last_name', [''])}</h3>
                        <span className="sub-title">{_.get(state.detail.additional_information, 'category', [''])}</span>
                        <ul>
                          <li><span>Location: </span>{_.get(state.detail, 'address', [''])}</li>
                        </ul>
                      </div>
                    </div>

                    <div className="col-lg-4">
                      <a href={_.get(state.detail.additional_information, 'user_resume', ['#'])} target="_blank" className="default-btn">Download CV</a>
                    </div>
                  </div>
                </div>

                <div className="candidates-details-content">
                  <h3>About Me</h3>
                  <p>{_.get(state.detail.additional_information, 'notes', [''])}</p>

                  <h3>Education</h3>
                  {state.detail && state.detail.education_informations.length > 0 ? state.detail.education_informations.map((row,i) => {
                    return (
                        <ul key={i}>
                          <li className="arts">{row.education_level} in {row.degree_title}</li>
                          <li className="university">{row.group +' '+row.institute_name} ({row.year_of_passing})</li>
                          <li className="summary">{row.description}</li>
                        </ul>
                        )
                    })
                    : 
                    (<ul></ul>)
                  }   

                  <h3>Work Experience</h3>
                  {state.detail && state.detail.experience_informations.length > 0 ? state.detail.experience_informations.map((row,i) => {
                    return (
                        <ul key={i}>
                          <li className="arts">{row.designation}</li>
                          <li className="university">{row.company_name} ({row.employment_period_year > 0 && row.employment_period_year +" year "} { row.employment_period_month > 0 && row.employment_period_month+' month'}) in {row.company_location}</li>
                          <li className="summary">{row.description}</li>
                        </ul>
                        )
                    })
                    : 
                    (<ul></ul>)
                  } 

                  <h4>Personal Skills</h4>

                  <div className="all-skill-bar">
                    <div className="skill-bar" data-percentage="100%">
                      <h4 className="progress-title-holder">
                        <span className="progress-title">Photoshop</span>
                        <span className="progress-number-wrapper">
                          <span className="progress-number-mark" >
                            <span className="percent">100%</span>
                            <span className="down-arrow"></span>
                          </span>
                        </span>
                      </h4>
        
                      <div className="progress-content-outter">
                        <div className="progress-content" ></div>
                      </div>
                    </div>
        
                    <div className="skill-bar" data-percentage="90%">
                      <h4 className="progress-title-holder clearfix">
                        <span className="progress-title">After Effects</span>
                        <span className="progress-number-wrapper">
                          <span className="progress-number-mark" >
                            <span className="percent">90%</span>
                            <span className="down-arrow"></span>
                          </span>
                        </span>
                      </h4>
        
                      <div className="progress-content-outter">
                        <div className="progress-content" ></div>
                      </div>
                    </div>
        
                    <div className="skill-bar" data-percentage="85%">
                      <h4 className="progress-title-holder clearfix">
                        <span className="progress-title">Indesign</span>
                        <span className="progress-number-wrapper">
                          <span className="progress-number-mark" >
                            <span className="percent">85%</span>
                            <span className="down-arrow"></span>
                          </span>
                        </span>
                      </h4>
        
                      <div className="progress-content-outter">
                        <div className="progress-content" ></div>
                      </div>
                    </div> 
        
                    <div className="skill-bar mb-0" data-percentage="60%">
                      <h4 className="progress-title-holder clearfix">
                        <span className="progress-title">HTML &amp; CSS</span>
                        <span className="progress-number-wrapper">
                          <span className="progress-number-mark" >
                            <span className="percent">60%</span>
                            <span className="down-arrow"></span>
                          </span>
                        </span>
                      </h4>
        
                      <div className="progress-content-outter">
                        <div className="progress-content" ></div>
                      </div>
                    </div> 
                  </div> 
                </div>
              </div>

              <div className="col-lg-4">
                <div className="candidates-details-sidebar">
                  <div className="candidates-widget">
                    <h3>Share This Job</h3>

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

                  <div className="candidates-widget">
                    <h3>Contact Information</h3>
                    
                    <ul className="overview">
                      
                      <li>
                        Email
                        <a href="mailto:#"><span>: {_.get(state.detail, 'email', [''])}</span></a>
                      </li>
                      <li>
                        Phone
                        <a href={"tel:+91"+_.get(state.detail, 'phone', [''])}><span>: {_.get(state.detail, 'phone', [''])}</span></a>
                      </li>
                      <li>
                        Location
                        <span>: {_.get(state.detail, 'address', [''])}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="candidates-widget">
                    <h3>Job Overview</h3>
                    
                    <ul className="overview">
                      <li>
                        Categories
                        <span>: {_.get(state.detail.additional_information, 'category', [''])}</span>
                      </li>
                      <li>
                        Nationality
                        <span>: {_.get(state.detail, 'nationality', [''])}</span>
                      </li>
                      <li>
                        Job Type
                        <span>: {_.get(state.detail.additional_information, 'job_nature', [''])}</span>
                      </li>
                      <li>
                        Experience
                        <span>: {_.get(state.detail, 'total_experience', [''])} year(s)</span>
                      </li>
                      <li>
                        Expected Salary
                        <span>: {_.get(state.detail.additional_information, 'expected_salary', [''])}</span>
                      </li>
                      <li>
                        Languages:
                        <span>: {_.get(state.detail, 'languages', [''])} </span>
                      </li>
                      <li>
                        Gender
                        <span>: {_.get(state.detail, 'gender', [''])}</span>
                      </li>
                    </ul>
                  </div>
                {/*
                  <div className="candidates-widget">
                    <h3>Download Resume</h3>
                    
                    <ul className="overview download ">
                      
                      <li>
                        <i className="flaticon-pdf"></i>
                        <a href="#">PDF Formate CV</a>
                      </li>
                      <li>
                        <i className="flaticon-pdf"></i>
                        <a href="#">DOC Formate CV</a>
                      </li>
                    </ul>
                  </div>
                */}
                </div>
              </div>
            </div>
          </div>
        </section>


        <section className="subscribe-area subscribe-area-about-page">
          <div className="container">
            <div className="subscribe-bg">
              <div className="row align-items-center">
                <div className="col-lg-6">
                  <div className="subscribe-content">
                    <h2>Find Your Next Great Job Opportunity!</h2>
                  </div>
                </div>
      
                <div className="col-lg-6">
                  <form className="newsletter-form" data-toggle="validator">
                    <input type="email" className="form-control" placeholder="Enter email address" name="EMAIL" required="" />
      
                    <button className="default-btn disabled" type="submit">
                      <span>Subscribe</span>
                    </button>
      
                    <div id="validator-newsletter" className="form-result"></div>
                    <p>Join The Newsletter 10,000 Users Already!</p>
                  </form> 
                </div>
              </div>
            </div>
          </div>
        </section>

      </React.Fragment>
    )
}

export default withRouter(FreelancerDetail);