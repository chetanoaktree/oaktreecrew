import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { withRouter, useParams } from "react-router-dom";
import {NotificationManager} from 'react-notifications';
import { getFreelancer, updateFreelancer, removeFromFreelancer } from '../../actions/hrActions';
import _ from 'lodash';
import avatar from "../../assets/images/avatar-img.jpg";
import EditUserFreelancer from "../EditForm/EditUserFreelancer"
import EditAboutFreelancer from "../EditForm/EditAboutFreelancer"
import EditContactFreelancer from "../EditForm/EditContactFreelancer"



function EditFreelancer(props) {
    
    const [model, setModel] = useState({
      userShow: false,
      aboutShow: false,
    })

    const handleShow = (name) => {
        setModel(prevState => ({
            ...prevState,
            [name] : true
        }))
    }

    const handleClose = (name) => {
        setModel(prevState => ({
            ...prevState,
            [name] : false
        }))
    }

    const [state , setState] = useState({
        detail: '',
        avatar: "",
        email:"",
        first_name: "",
        last_name: "",
        phone: "",
        dob: "",
        nationality: "",
        gender: "",
        martial_status: "",
        address: "",
        languages: "",
        total_experience: "",
        role_ids:[2],
        skip_password_validation: true,
        country: '',
        state: '',
        city: '',
        pincode: '',
        additional_information_attributes: {
            title: "",
            about_me:"", 
            presented_salary:"",
            expected_salary:"", 
            category:"",
            skills: '',
            job_nature:"", 
            job_level: "",
            attachment: "",
            github_link: "",
            linkedin_link: "",
        },
        education_informations_attributes:[],
        experience_informations_attributes: [],
        project_informations_attributes:[],
        stateArg: [],
        cityArg: []
    })

    const [education, setEducation] = useState(
        [
            {
                education_level: "", 
                degree_title: "", 
                group: "", 
                institute_name: "", 
                result: "", 
                marks: "",
                year_of_passing: "", 
                duration: "",
                description: ""
            }
        ]
    )

    const [experience, setExperience] = useState(
        [
            {
                company_name:"", 
                designation: "", 
                company_location: "",
                employment_period: "",
                description: ""
            }
        ]
    )

    const [project, setProject] = useState(
        [
            {
                title: "", 
                start_date: "2021-01-01", 
                end_date: "2021-01-01", 
                technologies: "", 
                summary: "",
                project_link: ""
            }
        ]
    )

    const dispatch = useDispatch();
    
    useEffect(() => {
      fetchData();
    }, []);

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
                let data = res.data.user    
                setState(prevState => ({
                    detail: res.data.user,
                    avatar: "",
                    email: data.email,
                    first_name: data.first_name,
                    last_name: data.last_name,
                    phone: data.phone,
                    dob: data.dob,
                    nationality: data.nationality,
                    gender: data.gender,
                    martial_status: data.martial_status,
                    address: data.address,
                    languages: data.languages,
                    total_experience: data.total_experience,
                    country: data.country,
                    state: data.state,
                    city: data.city,
                    pincode: data.pincode,
                    additional_information_attributes: {
                        title: data.additional_information.title,
                        about_me: data.additional_information.about_me, 
                        presented_salary: data.additional_information.presented_salary,
                        expected_salary: data.additional_information.expected_salary, 
                        category: data.additional_information.category,
                        skills: data.additional_information.skills,
                        job_nature: data.additional_information.job_nature, 
                        job_level: data.additional_information.job_level,
                        attachment: data.additional_information.attachment,
                        github_link: data.additional_information.github_link,
                        linkedin_link: data.additional_information.linkedin_link,
                    },
                    experience_informations_attributes: data.experience_informations,
                    education_informations_attributes: data.education_informations,
                    project_informations_attributes: data.project_informations
                }))

                setEducation(data.education_informations)
                setExperience(data.experience_informations)
                setProject(data.project_informations)
              }
          })
        }
    }

    const handleUserUpdate = () => {
        let data = { 
                    email: state.email,
                    first_name: state.first_name,
                    last_name: state.last_name,
                    // skip_password_validation: true
                }
        var form_data = new FormData();
        for ( var key in data ) {
            form_data.append(`user[${key}]`, data[key])          
        }
        form_data.append("user[additional_information_attributes[id]]",state.detail.additional_information.id)
        form_data.append("user[additional_information_attributes[title]]",state.additional_information_attributes.title)

        dispatch(updateFreelancer(form_data, id)).then((res)=> {
            // console.log("res",res)
            if(res && res.data.status === 200) {
               NotificationManager.success("Successfully update", 'Success');
               handleClose('userShow');
            }else{
               NotificationManager.error(res.data.messages, 'Error');  
            }
        })
    }
    const handleAboutUpdate = () => {

        var form_data = new FormData();
        form_data.append("user[additional_information_attributes[id]]",state.detail.additional_information.id)
        form_data.append("user[additional_information_attributes[about_me]]",state.additional_information_attributes.about_me)

        dispatch(updateFreelancer(form_data, id)).then((res)=> {
            // console.log("res",res)
            if(res && res.data.status === 200) {
               NotificationManager.success("Successfully update", 'Success');
               handleClose('aboutShow');
            }else{
               NotificationManager.error(res.data.messages, 'Error');  
            }
        })
    }
    const handleContactUpdate = () => {
        let data = { 
                    phone: state.phone,
                    address: state.address,
                }
        var form_data = new FormData();
        for ( var key in data ) {
            form_data.append(`user[${key}]`, data[key])          
        }

        dispatch(updateFreelancer(form_data, id)).then((res)=> {
            // console.log("res",res)
            if(res && res.data.status === 200) {
               NotificationManager.success("Successfully update", 'Success');
               handleClose('contactShow');
            }else{
               NotificationManager.error(res.data.messages, 'Error');  
            }
        })
    }
    const handleUpdate = (e) => {
        e.preventDefault(); 
        let data = { 
                    email: state.email,
                    first_name: state.first_name,
                    last_name: state.last_name,
                    phone: state.phone,
                    dob: state.dob,
                    nationality: state.nationality,
                    gender: state.gender,
                    martial_status: state.martial_status,
                    address: state.address,
                    languages: state.languages,
                    total_experience: state.total_experience,
                    country: state.country,
                    state: state.state,
                    city: state.city,
                    pincode: state.pincode,
                    skip_password_validation: true
                }
        var form_data = new FormData();
        for ( var key in data ) {
            form_data.append(`user[${key}]`, data[key])          
        }
        if(state.avatar){
            form_data.append(`user[avatar]`, state.avatar)          
        }

        form_data.append("user[additional_information_attributes[title]]",state.additional_information_attributes.title)
        form_data.append("user[additional_information_attributes[about_me]]",state.additional_information_attributes.about_me)
        form_data.append("user[additional_information_attributes[presented_salary]]",state.additional_information_attributes.presented_salary)
        form_data.append("user[additional_information_attributes[expected_salary]]",state.additional_information_attributes.expected_salary)
        form_data.append("user[additional_information_attributes[category]]",state.additional_information_attributes.category)
        form_data.append("user[additional_information_attributes[skills]]",state.additional_information_attributes.skills)
        form_data.append("user[additional_information_attributes[job_nature]]",state.additional_information_attributes.job_nature)
        form_data.append("user[additional_information_attributes[job_level]]",state.additional_information_attributes.job_level)
        form_data.append("user[additional_information_attributes[attachment]]",state.additional_information_attributes.attachment)
        form_data.append("user[additional_information_attributes[github_link]]",state.additional_information_attributes.github_link)
        form_data.append("user[additional_information_attributes[linkedin_link]]",state.additional_information_attributes.linkedin_link)

        education.map((p,index) => {
            form_data.append(`user[education_informations_attributes[${index}][education_level]]`, p.education_level)
            form_data.append(`user[education_informations_attributes[${index}][degree_title]]`, p.degree_title)
            form_data.append(`user[education_informations_attributes[${index}][group]]`, p.group)
            form_data.append(`user[education_informations_attributes[${index}][institute_name]]`, p.institute_name)
            form_data.append(`user[education_informations_attributes[${index}][result]]`, p.result)
            form_data.append(`user[education_informations_attributes[${index}][marks]]`, p.marks)
            form_data.append(`user[education_informations_attributes[${index}][year_of_passing]]`, p.year_of_passing)
            form_data.append(`user[education_informations_attributes[${index}][duration]]`, p.duration)
            form_data.append(`user[education_informations_attributes[${index}][description]]`, p.description)
            return p
        })

        experience.map((p,index) => {
            form_data.append(`user[experience_informations_attributes[${index}][company_name]]`, p.company_name)
            form_data.append(`user[experience_informations_attributes[${index}][designation]]`, p.designation)
            form_data.append(`user[experience_informations_attributes[${index}][company_location]]`, p.company_location)
            form_data.append(`user[experience_informations_attributes[${index}][employment_period_year]]`, p.employment_period_year)
            form_data.append(`user[experience_informations_attributes[${index}][employment_period_month]]`, p.employment_period_month)
            form_data.append(`user[experience_informations_attributes[${index}][description]]`, p.description)
            return p
        })

        project.map((p,index) => {
            form_data.append(`user[project_informations_attributes[${index}][title]]`, p.title)
            form_data.append(`user[project_informations_attributes[${index}][start_date]]`, p.start_date)
            form_data.append(`user[project_informations_attributes[${index}][end_date]]`, p.end_date)
            form_data.append(`user[project_informations_attributes[${index}][technologies]]`, p.technologies)
            form_data.append(`user[project_informations_attributes[${index}][summary]]`, p.summary)
            form_data.append(`user[project_informations_attributes[${index}][project_link]]`, p.project_link)
            return p
        })
            // console.log("form_data",form_data)
        // dispatch(saveFreelancer(form_data)).then((res)=> {
        //     // console.log("res",res)
        //     if(res && res.data.status === 200) {
        //        NotificationManager.success("Successfully added", 'Success');
        //        props.history.push('/freelancer');
        //     }else{
        //        NotificationManager.error(res.data.messages, 'Error');  
        //     }
        // })
    }

    const handleChange = (e) => {
      // console.log("----",e.target)
        const {name , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [name] : value
        }))    
    }

    const handleAdditional = (e) => {
      // console.log("----",e.target)
        const {name , value} = e.target   
        setState({...state,  
            additional_information_attributes: {
                ...state.additional_information_attributes,
                [name] : value
            }
        })
    }


    const editEducation = (row) => {

    }

    const editExperience = (row) => {
      
    }

    const editProject = (row) => {
      
    }

    const removeEducation = (uuid) => {
      let url = `/api/v1/users/${id}/education_informations/${uuid}`
      dispatch(removeFromFreelancer(url)).then((res)=> {
          if(res && res.status === 200) {
            // console.log("res",res)
            NotificationManager.success(res.message, 'Delete');  
            // fetchData(state.page, state.pageSize, '', '');
          }
      })
    }

    const removeExperience = (uuid) => {
      let url = `/api/v1/users/${id}/experience_informations/${uuid}`
      dispatch(removeFromFreelancer(url)).then((res)=> {
          if(res && res.status === 200) {
            // console.log("res",res)
            NotificationManager.success(res.message, 'Delete');  
            // fetchData(state.page, state.pageSize, '', '');
          }
      })
    }

    const removeProject = (uuid) => {
      let url = `/api/v1/users/${id}/project_informations/${uuid}`
      dispatch(removeFromFreelancer(url)).then((res)=> {
          if(res && res.status === 200) {
            // console.log("res",res)
            NotificationManager.success(res.message, 'Delete');  
            // fetchData(state.page, state.pageSize, '', '');
          }
      })
    }

    // console.log("detail",state.detail)
    return(
      <React.Fragment>
        <div className="page-title-area">
          <div className="container">
            <div className="page-title-content">
              <h2>Edit Freelancer Details</h2>
            </div>
          </div>
        </div>

        <EditUserFreelancer 
            show = {model.userShow}
            state = {state}
            handleClose = {handleClose}
            handleChange = {handleChange}
            handleAdditional = {handleAdditional}
            handleUserUpdate = {handleUserUpdate}
        />

        <EditAboutFreelancer 
            show = {model.aboutShow}
            state = {state}
            handleClose = {handleClose}
            handleAdditional = {handleAdditional}
            handleAboutUpdate = {handleAboutUpdate}
        />

        <EditContactFreelancer 
            show = {model.contactShow}
            state = {state}
            handleClose = {handleClose}
            handleChange = {handleChange}
            handleContactUpdate = {handleContactUpdate}
        />
        <section className="candidates-details-area mt-5">
          <div className="container">
            <div className="row">
              <div className="col-lg-8">
                <div className="candidates-cv">
                  <div className="row align-items-center">
                    <div className="col-lg-2">
                      <div className="hot-jobs-img">
                        <img src={state.user_image ? state.user_image : avatar} alt="Image" />
                      </div>
                    </div>

                    <div className="col-lg-6">
                      <div className="candidates-cv-content">
                        <h3>{_.get(state.detail, 'first_name', [''])+ ' '+ _.get(state.detail, 'last_name', [''])}</h3>
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
                    <i className="bx bxs-pencil" onClick={() => handleShow('userShow')}></i>
                </div>

                <div className="candidates-details-content">
                  <h3>About Me <i className="bx bxs-pencil" onClick={() => handleShow('aboutShow')}></i></h3>
                    <div className="card mb-3">
                      <div className="card-body">
                        <p>{_.get(state.detail.additional_information, 'about_me', [''])}</p>
                      </div>
                    </div>
                  
                  <h3>Education</h3>
                  {
                    education.length > 0 ? education.map((row,i) => {
                    return (
                      <div className="card mb-3" key={i}>
                        <i className="bx bx-pencil" onClick={() => editEducation(row)}></i>
                        <i className="bx bx-trash" onClick={() => removeEducation(row.id)}></i>
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
                  {experience.length > 0 ? experience.map((row,i) => {
                    return (
                          <div className="card mb-3" key={i}>
                            <i className="bx bx-pencil" onClick={() => editExperience(row)}></i>
                            <i className="bx bx-trash" onClick={() => removeExperience(row.id)}></i>
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
                  {project.length > 0 ? project.map((row,i) => {
                    return (
                            <div className="card mb-3" key={i}>
                              <i className="bx bx-pencil" onClick={() => editProject(row)}></i>
                              <i className="bx bx-trash" onClick={() => removeProject(row.id)}></i>
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

                  <h3>Personal Skills <i className="bx bx-pencil"></i></h3>
                  <div className="card mb-3">
                      <div className="card-body">
                      <div className="all-skill-bar">
                        {
                          state.detail && state.detail.additional_information.skills && state.detail.additional_information.skills.split(',').map((skill)=>{
                            return (<div className="skill-bar" data-percentage="100%">
                                  <h4 className="progress-title-holder">
                                    <span className="progress-title">{skill}</span>
                                    
                                  </h4>
                    
                                  <div className="progress-content-outter">
                                    <div className="progress-content" ></div>
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
                    <h3>Social Profile <i className="bx bx-pencil"></i></h3>

                    <ul className="social-icon">
                      <li>
                        <a href="#">
                          <i className="bx bxl-github"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i className="bx bxl-linkedin-square"></i>
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="candidates-widget">
                    <h3>Contact Information <i className="bx bx-pencil" onClick={() => handleShow('contactShow')}></i></h3>
                    
                    <ul className="overview">
                      
                      {/* <li>
                        Email
                        <a href="mailto:#"><span>: {_.get(state.detail, 'email', [''])}</span></a>
                      </li> */}
                      <li>
                        Phone
                        <a href={"tel:+91"+state.phone}><span>: {state.phone}</span></a>
                      </li>
                      <li>
                        Location
                        <span>: {state.address}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="candidates-widget">
                    <h3>Job Overview <i className="bx bx-pencil"></i></h3>
                    
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
                    <h3>Download Resume <i className="bx bx-trash"></i></h3>
                    
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

export default withRouter(EditFreelancer);