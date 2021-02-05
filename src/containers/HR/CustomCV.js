import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { withRouter, useParams } from "react-router-dom";
// import {NotificationManager} from 'react-notifications';
import { getFreelancer, generateFreelancerCV } from '../../actions/hrActions';
import _ from 'lodash';
import avatar from "../../assets/images/avatar-img.jpg";
import ProgressBar from 'react-bootstrap/ProgressBar'



function CustomCV(props) {

    const [state , setState] = useState({
        detail: '',
        email:"",
        otheremail: "",
        emailChecked: false,
        edu_ids: [],
        pro_ids: [],
        exp_ids: []
    })

    const dispatch = useDispatch();
    
    const { id } = useParams();
    // console.log("id",id)

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
        if(id){
          // Update the document title using the browser API
          dispatch(getFreelancer(id)).then((res)=> {
              if(res && res.status === 200) {
                // console.log("res",res.data)
                setState(prevState => ({
                    ...prevState,
                    detail: res.data.user,
                    email: res.data.user.email
                }))
              }
          })
        }
    }

    const handleChange = (e) => {
        const {name , value, checked} = e.target   
        if(name === 'otheremail'){
            setState(prevState => ({
                ...prevState,
                [name] : value
            }))
        }else{
            setState(prevState => ({
                ...prevState,
                [name] : checked
            }))
        }
    }
    const selectHandle = (e) => {
        const {name , value, checked} = e.target   
        if(!checked){
            setState(prevState => ({
                ...prevState,
                [name] : _.without(state[name], parseInt(value))
            }))
        }else{
            setState(prevState => ({
                ...prevState,
                [name] : [...prevState[name], parseInt(value)]
            }))    
        }
    }

    const generateCV = (type) => {
        let data = {
                    resume_type: type,
                    email: (state.emailChecked) ? state.otheremail : state.email,
                    edu_ids: state.edu_ids,
                    pro_ids: state.pro_ids,
                    exp_ids: state.exp_ids
                }
        dispatch(generateFreelancerCV(data, id));
    }

    const loader = useSelector(state => (state.applicationIsLoading), shallowEqual)
    // console.log(state)
    return(
      <React.Fragment>
        {loader && <div id="lazzy" class="lazzy-center"></div>}
        <div className="page-title-area">
          <div className="container">
            <div className="page-title-content">
              <h2>Custom CV for Freelancer</h2>
            </div>
          </div>
        </div>

        <section className="candidates-details-area mt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                  <div className="candidates-details-sidebar">
                    <div className="candidates-widget">
                        <div className="edit-profile-image-and-title">
                          {/* <div className="card"> */}
                            {/* <div className="card-header"> */}
                            <h3>&nbsp;</h3>
                              
                            {/* </div>   */}
                            <div className="overview">
                              <div className="row align-items-center">
                                <div className="col-lg-2">
                                  <div className="hot-jobs-img">
                                    <img src={state.user_image ? state.user_image : avatar} alt="Image" />
                                  </div>
                                </div>

                                <div className="col-lg-6">
                                  <div className="candidates-cv-content">
                                    <h4>{_.get(state.detail, 'first_name', [''])} { state.detail && state.detail.middle_name !== "null" && state.detail.middle_name }{_.get(state.detail, 'last_name', [''])}</h4>
                                    <span className="sub-title">{_.get(state.detail.additional_information, 'title', [''])}</span>
                                    <ul>
                                      <li><a href="mailto:#">{_.get(state.detail, 'email', [''])} </a> <input onClick={handleChange} checked={state.emailChecked} name="emailChecked" type="checkbox" /></li>
                                      <li><label>Other Email</label>
                                        <input 
                                            className="form-control" 
                                            type="email" 
                                            name="otheremail"
                                            value={state.otheremail}
                                            onChange={handleChange} 
                                        />
                                      </li>
                                    </ul>
                                  </div>
                                </div>
                              </div>
                            </div>
                          {/* </div>   */}
                        </div>
                    </div>    
                  </div>


                  <div className="candidates-details-sidebar">
                    <div className="candidates-widget">
                        <h3>About Me </h3>
                        <div className="overview">
                          <p>{_.get(state.detail.additional_information, 'about_me', [''])}</p>

                        </div>

                      </div>
                  </div>    


                <div className="candidates-details-content candidates-details-content-edit-form">
                    {/* <h3>About Me <i className="bx bx-pencil edit-icon-btn" onClick={() => handleShow('aboutShow')}></i></h3>
                    <div className="card mb-3">
                      <div className="card-body">
                        <p>{_.get(state.detail.additional_information, 'about_me', [''])}</p>
                      </div>
                    </div> */}
                  
                  <h3>Education </h3>
                  {
                    state.detail && state.detail.education_informations.length > 0 ? state.detail.education_informations.map((row,i) => {
                    // console.log(row.id,"state.edu_ids.includes(row.id)",state.edu_ids.indexOf(row.id) > -1)
                    return (
                      <div className="card mb-3" key={row.id}>
                          <div className="card-header">
                            <input onClick={selectHandle} checked={state.edu_ids.includes(row.id)} name="edu_ids" value={row.id} type="checkbox" />
                          </div>
                          <div className="card-body">
                            <ul>
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
                  <h3>Work Experience </h3>
                  {state.detail && state.detail.experience_informations.length > 0 ? state.detail.experience_informations.map((row,i) => {
                    return (
                          <div className="card mb-3" key={row.id}>
                            <div className="card-header">
                                <input onClick={selectHandle} checked={state.exp_ids.includes(row.id)} name="exp_ids" value={row.id} type="checkbox" />
                            </div>
                            <div className="card-body">
                                <ul>
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

                  <h3>Projects </h3>
                  {state.detail && state.detail.project_informations.length > 0 ? state.detail.project_informations.map((row,i) => {
                    return (
                            <div className="card mb-3" key={row.id}>
                              <div className="card-header">
                                <input onClick={selectHandle} checked={state.pro_ids.includes(row.id)} name="pro_ids" value={row.id} type="checkbox" />
                              </div>  
                              <div className="card-body">
                                  <ul>
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

                </div>
                
                <div className="candidates-details-sidebar mt-4">
                  <div className="candidates-widget">
                    <h3>Personal Skills </h3>
                    <div className="overview">
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
                    <h3>Social Profile </h3>
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
                    <h3>Contact Information </h3>
                    
                    <ul className="overview">
                      <li>
                        Phone
                        <a href={"tel:+91"+state.phone}><span>: {state.detail.phone}</span></a>
                      </li>
                      <li>
                        Skype Id
                        <a href={"tel:+91"+_.get(state.detail.additional_information, 'skype_id', [''])}><span>: {_.get(state.detail.additional_information, 'skype_id', [''])}</span></a>
                      </li>
                      <li>
                        Location
                        <span>: {state.detail.address}</span>
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
                    <h3>Job Overview </h3>
                    
                    <ul className="overview">
                      <li>
                        Categories
                        <span>: {_.get(state.detail.additional_information, 'category', [''])}</span>
                      </li>
                      <li>
                        Nationality
                        <span>: {state.nationality}</span>
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
                        <span>: {state.total_experience} year(s)</span>
                      </li>
                      <li>
                        Expected Salary
                        <span>: {_.get(state.detail.additional_information, 'expected_salary', [''])}</span>
                      </li>
                      <li>
                        Languages:
                        <span>: {state.languages} </span>
                      </li>
                      <li>
                        Gender
                        <span>: {state.gender}</span>
                      </li>
                    </ul>
                  </div>   
                  <div className="candidates-widget">
                    <h3>Generate CV</h3>
                    
                    <ul className="overview download ">
                      <li>
                        <i className="flaticon-pdf"></i>
                        <a href="#" onClick={() => generateCV('pdf')}>PDF Formate CV</a>
                      </li>
                      <li>
                        <i className="flaticon-pdf"></i>
                        <a href="#" onClick={() => generateCV('doc')}>DOC Formate CV</a>
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

export default withRouter(CustomCV);