import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { withRouter, useParams } from "react-router-dom";
import _ from 'lodash';
import {NotificationManager} from 'react-notifications';
import ProgressBar from 'react-bootstrap/ProgressBar'
import { Modal,Row,Col } from 'react-bootstrap';
import InputRange from 'react-input-range';
import 'react-input-range/lib/css/index.css';
import { getFreelancer } from '../../actions/hrActions';
import { interviewFeedback } from '../../actions/interviewerActions';
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

    const [model, setModel] = useState({
      modelShow: false,
      rating_data: [],
      feedback: '',
      status: ''
    })

    const [skillObj, setSkillObj] = useState([])

    const handleShow = () => {
      let skillObj = []
      if(state.detail && state.detail.additional_information){
        state.detail.additional_information.skills.split(',').map(skill=> {
          skillObj.push({skill: skill, rating: 0})
        })
      }
        setModel(prevState => ({
            ...prevState,
            modelShow: true,
            rating_data: skillObj,
            feedback: '',
            status: ''
        }))
        setSkillObj(skillObj)
    }

    const handleClose = () => {
        setModel(prevState => ({
            ...prevState,
            modelShow : false,
            rating_data: [],
            feedback: '',
            status: ''
        }))
    }

    const handleChange = (e) => {
        // console.log("time",time)
        const {name , value} = e.target   
        setModel(prevState => ({
            ...prevState,
            [name] : value
        }))
    }

    const changeRating = (value, i) => {
      const newSkillObj = [...skillObj];
      newSkillObj[i].rating = value;
      setSkillObj(newSkillObj)
    }
    
    const handleFeedBack = (e) => {
      e.preventDefault();
      let data = {
                rating_data: skillObj,
                // rating_data: JSON.stringify(skillObj),
                feedback: model.feedback,
                status: model.status,
              }
      console.log("data",data)

      dispatch(interviewFeedback(data, id)).then((res)=> {
          if(res && res.data.status === 200) {
             NotificationManager.success(res.data.messages, 'Success');
             // props.history.push('/freelancer');
             handleClose()
          }else{
             NotificationManager.error(res.data.messages, 'Error');  
          }
      })
    }

    const loader = useSelector(state => (state.applicationIsLoading), shallowEqual)
    
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
                                    <ProgressBar variant="success" now={50} />
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
                      {state.detail.country &&
                        <>
                          <li>
                            Country
                            <span>: {state.detail.country}</span>
                          </li>
                          {state.detail.state &&
                            <>
                              <li>
                                State
                                <span>: {state.detail.state}</span>
                              </li>
                              {state.detail.city &&
                                  <li>
                                    City
                                    <span>: {state.detail.city}</span>
                                  </li>
                              }
                            </>
                          }
                        </>  
                      }
                      {state.detail.pincode &&
                          <li>
                            Location
                            <span>: {state.detail.pincode}</span>
                          </li>
                      }
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
                        Exp. Level
                        <span>: {_.get(state.detail.additional_information, 'job_level', [''])}</span>
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
                      {state.detail.resume_pdf &&
                        <li>
                          <i className="flaticon-pdf"></i>
                          <a href={state.detail.resume_pdf} target="_blank">PDF Formate CV</a>
                        </li>
                      }
                      {state.detail.resume_doc &&
                        <li>
                          <i className="flaticon-pdf"></i>
                          <a href={state.detail.resume_doc} target="_blank">DOC Formate CV</a>
                        </li>
                      }
                    </ul>
                  </div>

                  {localStorage.role === 'interviewer' &&
                    <div className="candidates-widget">
                      <h3>Feed Back</h3>
                      <ul className="overview download ">
                        <li>
                          <i className="flaticon-pdf"></i>
                          <a onClick={() => handleShow()}>Feedback</a>
                        </li>
                      </ul>
                    </div>
                  }
                
                </div>
              </div>
            </div>
          </div>
          <Modal show={model.modelShow} onHide={() => handleClose()} className="" centered >
            <form className="resume-info" onSubmit={handleFeedBack}>
              <Modal.Header closeButton>
                  <Modal.Title>Feedback</Modal.Title>
              </Modal.Header>     
              <Modal.Body>
                <form className="">
                    <div className="row">
                        <div className="col-lg-12">
                          <h6>Rate Skills</h6>
                            <div className="card mb-3">
                                <div className="card-body">
                                <div className="all-skill-bar">
                                  {
                                    skillObj.map((row, i)=>{
                                      return (<div className="skill-bar" data-percentage="100%">
                                            <h5 className="progress-title-holder">
                                              <span className="progress-title">{row.skill}</span>
                                            </h5>
                              
                                            <div className="progress-content-outter">
                                              <div className="progress-content" ></div>
                                              <InputRange
                                                maxValue={10}
                                                minValue={0}
                                                value={row.rating}
                                                onChange={value => changeRating(value, i)} 
                                              />
                                            </div>
                                        </div>)
                                      })
                                  }
                                </div>
                              </div>
                   
                            </div> 
                          </div> 
                    </div> 
                    <Col xs={12} md={12}>
                        <div className="row mb-4 mt-4">
                            <Col xs={12} md={6} onChange={handleChange}>
                                <label className="single-check">
                                    Accept
                                    <input 
                                        type="radio" 
                                        checked={model.status === "accepted"} 
                                        name="status" 
                                        value="accepted" required/>
                                    <span className="checkmark"></span>
                                </label>
                            </Col>
                            <Col xs={12} md={6} onChange={handleChange}>
                                <label className="single-check">
                                    Reject
                                    <input 
                                        type="radio" 
                                        checked={model.status === "rejected"}
                                        name="status" 
                                        value="rejected" required/>
                                    <span className="checkmark"></span>
                                </label>
                            </Col>
                        </div>
                    </Col> 
                    <div className="row">
                        <div className="col-lg-12">
                            <h6>Note</h6>                          
                              <div className="form-group">
                              <textarea name="feedback" onChange={handleChange} className="form-control" rows="4">{model.feedback}</textarea>
                            </div>
                        </div>
                    </div>
                </form>
              </Modal.Body>
              <Modal.Footer>
                <div className="default-btn default-btn btn-two" onClick={() => handleClose()}>Close</div>
                <button className="default-btn default-btn" disabled={loader}>Submit</button>
              </Modal.Footer>
            </form>
        </Modal>
        </section>

      </React.Fragment>
    )
}

export default withRouter(FreelancerDetail);