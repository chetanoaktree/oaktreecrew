import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { withRouter, useParams } from "react-router-dom";
import { getFreelancer } from '../../actions/hrActions';
import _ from 'lodash';
import avatar from "../../assets/images/avatar-img.jpg";
import ProgressBar from 'react-bootstrap/ProgressBar'


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
    // console.log("detail",state.detail)_.get(state.detail, 'user_image', [avatar])
    return(
      <React.Fragment>
        <div className="page-title-area">
          <div className="container">
            <div className="page-title-content">
              <h2>Freelancer Details</h2>
            </div>
          </div>
        </div>

        <section className="candidates-details-area mt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="candidates-cv">
                  <div className="row align-items-center">
                    <div className="col-lg-2">
                      <div className="hot-jobs-img">
                        <img src={state.detail && state.detail.user_image ? state.detail.user_image : avatar} alt="Image" />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="candidates-cv-content">
                        <h3>{_.get(state.detail, 'first_name', ['']) + ' ' +_.get(state.detail, 'last_name', [''])}</h3>
                        <span className="sub-title">{_.get(state.detail.additional_information, 'title', [''])}</span>
                        <ul>
                          <li><a href="mailto:#">{_.get(state.detail, 'email', [''])}</a></li>
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
                    <div className="card mb-3">
                      <div className="card-body">
                        <p>{_.get(state.detail.additional_information, 'about_me', [''])}</p>
                      </div>
                    </div>
                  
                  <h3>Education</h3>
                  {
                    state.detail && state.detail.education_informations.length > 0 ? state.detail.education_informations.map((row,i) => {
                    return (
                      <div className="card mb-3">
                        <div className="card-body">
                            <ul key={i}>
                              <li className="arts"><i className="bx bxs-graduation"></i> {row.education_level} in {row.degree_title}</li>
                              <li className="university"><i className="bx bxs-book"></i> {row.group +' '+row.institute_name} ({row.year_of_passing})</li>
                              <li className="summary"><i className="bx bxs-notepad"></i> {row.description}</li>
                            </ul>
                        </div>
                      </div>
                        )
                    })
                    : 
                    (<ul></ul>)
                  }   
                  <h3>Work Experience</h3>
                  {state.detail && state.detail.experience_informations.length > 0 ? state.detail.experience_informations.map((row,i) => {
                    return (
                          <div className="card mb-3">
                            <div className="card-body">

                                <ul key={i}>
                                  <li className="arts"><i className="bx bxs-user"></i> {row.designation}</li>
                                  <li className="university"><i className="bx bxs-building"></i> {row.company_name} ({row.employment_period_year > 0 && row.employment_period_year +" year "} { row.employment_period_month > 0 && row.employment_period_month+' month'}) in {row.company_location}</li>
                                  <li className="summary"><i className="bx bxs-notepad"></i> {row.description}</li>
                                </ul>
                            </div>
                          </div>
                        )
                    })
                    : 
                    (<ul></ul>)
                  } 

                  <h3>Projects</h3>
                  {state.detail && state.detail.project_informations.length > 0 ? state.detail.project_informations.map((row,i) => {
                    return (
                            <div className="card mb-3">
                              <div className="card-body">
                                  <ul key={i}>
                                    <li className="arts"><i className="bx bxs-graduation"></i> {row.title}</li>
                                    <li className="university"><i className="bx bxs-calendar"></i> Period: {row.start_date} to {row.end_date} </li>
                                    <li className="university"><i className="bx bxs-tag"></i> Skills: {row.technologies} </li>
                                    <li className="summary"><i className="bx bxs-notepad"></i> {row.summary}</li>
                                  </ul>
                              </div>
                            </div>
                        )
                    })
                    : 
                    (<ul></ul>)
                  } 

                  <h3>Personal Skills</h3>
                  <div className="card mb-3">
                      <div className="card-body">
                      <div className="all-skill-bar">
                        {
                          state.detail && state.detail.additional_information.skills && state.detail.additional_information.skills.split(',').map((skill)=>{
                            return (<div className="skill-bar" data-percentage="100%">
                                  <h5 className="progress-title-holder">
                                    <span className="progress-title">{skill}</span>
                                    
                                  </h5>
                    
                                  <div className="progress-content-outter">
                                    <div className="progress-content" ></div>
                                    <ProgressBar variant="success" now={45} />
                                  </div>
                              </div>)
                            })
                        }
                      </div>
                    </div>
         
                  </div> 
                </div>
              </div>

              <div className="col-lg-4">
                <div className="candidates-details-sidebar">
                  <div className="candidates-widget">
                    <h3>Social Profile</h3>

                    <ul className="social-icon">
                      <li>
                        <a href={_.get(state.detail.additional_information, 'github_link', ['#'])} target="_blank">
                          <i className="bx bxl-github"></i>
                        </a>
                      </li>
                      <li>
                        <a href={_.get(state.detail.additional_information, 'linkedin_link', ['#'])} target="_blank">
                          <i className="bx bxl-linkedin-square"></i>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="candidates-widget">
                    <h3>Contact Information</h3>
                    
                    <ul className="overview">
                      
                      {/* <li>
                        Email
                        <a href="mailto:#"><span>: {_.get(state.detail, 'email', [''])}</span></a>
                      </li> */}
                      <li>
                        Phone
                        <a href={"tel:+91"+_.get(state.detail, 'phone', [''])}><span>: {_.get(state.detail, 'phone', [''])}</span></a>
                      </li>
                      <li>
                        Skype Id
                        <a href={"tel:+91"+_.get(state.detail.additional_information, 'skype_id', [''])}><span>: {_.get(state.detail.additional_information, 'skype_id', [''])}</span></a>
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
                
                </div>
              </div>
            </div>
          </div>
        </section>

      </React.Fragment>
    )
}

export default withRouter(FreelancerDetail);