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
import EditSocialFreelancer from "../EditForm/EditSocialFreelancer"


import EditEducationFreelancer from "../EditForm/EditEducationFreelancer"
import EditExperienceFreelancer from "../EditForm/EditExperienceFreelancer"
import EditProjectFreelancer from "../EditForm/EditProjectFreelancer"



function EditFreelancer(props) {
    
    const [model, setModel] = useState({
      userShow: false,
      aboutShow: false,
      contactShow: false,
      socialShow: false,
      educationShow: false,
      experienceShow: false,
      projectShow: false,
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
        {
            education_level: "", 
            degree_title: "", 
            group: "", 
            institute_name: "", 
            result: "", 
            marks: "",
            year_of_passing: "", 
            duration: "",
            description: "",
            new: true
        }
    )

    const [experience, setExperience] = useState(
        {
            company_name:"", 
            designation: "", 
            company_location: "",
            employment_period: "",
            description: "",
            new: true
        }
    )

    const [project, setProject] = useState(
        {
            title: "", 
            start_date: "2021-01-01", 
            end_date: "2021-01-01", 
            technologies: "", 
            summary: "",
            project_link: "",
            new: true
        }
    )

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

                // setEducation(data.education_informations)
                // setExperience(data.experience_informations)
                // setProject(data.project_informations)
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

        updateApi(form_data, id, 'userShow');
    }
    const handleAboutUpdate = () => {

        var form_data = new FormData();
        form_data.append("user[additional_information_attributes[id]]",state.detail.additional_information.id)
        form_data.append("user[additional_information_attributes[about_me]]",state.additional_information_attributes.about_me)

        updateApi(form_data, id, 'aboutShow');
    }
    const handleSocialUpdate = () => {

        var form_data = new FormData();
        form_data.append("user[additional_information_attributes[id]]",state.detail.additional_information.id)
        form_data.append("user[additional_information_attributes[github_link]]",state.additional_information_attributes.github_link)
        form_data.append("user[additional_information_attributes[linkedin_link]]",state.additional_information_attributes.linkedin_link)

        updateApi(form_data, id, 'socialShow');
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
        updateApi(form_data, id, 'contactShow');
        
    }
    
    const updateApi = (form_data, id, modelName) => {
        dispatch(updateFreelancer(form_data, id)).then((res)=> {
            // console.log("res",res)
            if(res && res.data.status === 200) {
               fetchData(); 
               NotificationManager.success("Successfully update", 'Success');
               handleClose(modelName);
            }else{
               NotificationManager.error(res.data.messages, 'Error');  
            }
        })
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

    

    const saveEducation = (add, row) => {
        handleShow('educationShow')
        if(!add){
            setEducation(row)
        }
    }

    const handleEducation = (e) => {
        const {name , value} = e.target   
        setEducation(prevState => ({
            ...prevState,
            [name] : value
        })) 
    }
    const handleEducationSave = (add) => {

        var form_data = new FormData();
        // form_data.append(`user[education_informations_attributes[0][education_level]]`, education.education_level)
        // form_data.append(`user[education_informations_attributes[0][degree_title]]`, education.degree_title)
        form_data.append(`user[education_informations_attributes[0][group]]`, education.group)
        form_data.append(`user[education_informations_attributes[0][institute_name]]`, education.institute_name)
        form_data.append(`user[education_informations_attributes[0][result]]`, education.result)
        form_data.append(`user[education_informations_attributes[0][marks]]`, education.marks)
        // form_data.append(`user[education_informations_attributes[0][year_of_passing]]`, education.year_of_passing)
        // form_data.append(`user[education_informations_attributes[0][duration]]`, education.duration)
        form_data.append(`user[education_informations_attributes[0][description]]`, education.description)

        
        if(add){
            updateApi(form_data, id, 'educationShow');
            // console.log("handleProjectSaveNew",add)
        }else{
            form_data.append(`user[education_informations_attributes[0][id]]`, education.id)
            updateApi(form_data, id, 'educationShow');
            // console.log("handleProjectSaveold")
        }
    }

    const saveExperience = (add, row) => {
        handleShow('experienceShow')
        if(!add){
            setExperience(row)
        }
    }

    const handleExperience = (e) => {
        const {name , value} = e.target   
        setExperience(prevState => ({
            ...prevState,
            [name] : value
        })) 
    }
    const handleExperienceSave = (add) => {

        var form_data = new FormData();
        form_data.append(`user[experience_informations_attributes[0][company_name]]`, experience.company_name)
        form_data.append(`user[experience_informations_attributes[0][designation]]`, experience.designation)
        form_data.append(`user[experience_informations_attributes[0][company_location]]`, experience.company_location)
        form_data.append(`user[experience_informations_attributes[0][employment_period_year]]`, experience.employment_period_year)
        form_data.append(`user[experience_informations_attributes[0][employment_period_month]]`, experience.employment_period_month)
        form_data.append(`user[experience_informations_attributes[0][description]]`, experience.description)
        
        if(add){
            updateApi(form_data, id, 'experienceShow');
            // console.log("handleProjectSaveNew",add)
        }else{
            form_data.append(`user[experience_informations_attributes[0][id]]`, experience.id)
            updateApi(form_data, id, 'experienceShow');
            // console.log("handleProjectSaveold")
        }
    }

    const saveProject = (add, row) => {
        handleShow('projectShow')
        if(!add){
            setProject(row)
        }
    }

    const handleProject = (e) => {
        const {name , value} = e.target   
        setProject(prevState => ({
            ...prevState,
            [name] : value
        })) 
    }
    const handleProjectSave = (add) => {

        var form_data = new FormData();
        form_data.append(`user[project_informations_attributes[0][title]]`, project.title)
        form_data.append(`user[project_informations_attributes[0][project_link]]`, project.project_link)
        form_data.append(`user[project_informations_attributes[0][summary]]`, project.summary)
        // form_data.append(`user[project_informations_attributes[${index}][start_date]]`, p.start_date)
        // form_data.append(`user[project_informations_attributes[${index}][end_date]]`, p.end_date)
        // form_data.append(`user[project_informations_attributes[${index}][technologies]]`, p.technologies)
        if(add){
            updateApi(form_data, id, 'projectShow');
            // console.log("handleProjectSaveNew",add)
        }else{
            form_data.append(`user[project_informations_attributes[0][id]]`, project.id)
            updateApi(form_data, id, 'projectShow');
            // console.log("handleProjectSaveold")
        }
    }

    const removeEducation = (uuid) => {
      let url = `/api/v1/users/${id}/education_informations/${uuid}`
      dispatch(removeFromFreelancer(url)).then((res)=> {
          if(res && res.status === 200) {
            // console.log("res",res)
            fetchData();
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
            fetchData();
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
            fetchData();
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

        <EditSocialFreelancer 
            show = {model.socialShow}
            state = {state}
            handleClose = {handleClose}
            handleAdditional = {handleAdditional}
            handleSocialUpdate = {handleSocialUpdate}
        />

        <EditEducationFreelancer 
            show = {model.educationShow}
            state = {education}
            handleClose = {handleClose}
            handleEducation = {handleEducation}
            handleEducationSave = {handleEducationSave}
        />

        <EditExperienceFreelancer 
            show = {model.experienceShow}
            state = {experience}
            handleClose = {handleClose}
            handleExperience = {handleExperience}
            handleExperienceSave = {handleExperienceSave}
        />

        <EditProjectFreelancer 
            show = {model.projectShow}
            state = {project}
            handleClose = {handleClose}
            handleProject = {handleProject}
            handleProjectSave = {handleProjectSave}
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

                <div className="candidates-details-content candidates-details-content-edit-form">
                  <h3>About Me <i className="bx bx-pencil edit-icon-btn" onClick={() => handleShow('aboutShow')}></i></h3>
                    <div className="card mb-3">
                      <div className="card-body">
                        <p>{_.get(state.detail.additional_information, 'about_me', [''])}</p>
                      </div>
                    </div>
                  
                  <h3>Education <i className="bx bx-plus" onClick={() => saveEducation(true, false)}></i></h3>
                  {
                    state.detail && state.detail.education_informations.length > 0 ? state.detail.education_informations.map((row,i) => {
                    return (
                      <div className="card mb-3" key={i}>
                        <i className="bx bx-pencil" onClick={() => saveEducation(false,row)}></i>
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
                  <h3>Work Experience <i className="bx bx-plus" onClick={() => saveExperience(true,false)}></i></h3>
                  {state.detail && state.detail.experience_informations.length > 0 ? state.detail.experience_informations.map((row,i) => {
                    return (
                          <div className="card mb-3" key={i}>
                            <i className="bx bx-pencil" onClick={() => saveExperience(false,row)}></i>
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

                  <h3>Projects <i className="bx bx-plus" onClick={() => saveProject(true, false)}></i></h3>
                  {state.detail && state.detail.project_informations.length > 0 ? state.detail.project_informations.map((row,i) => {
                    return (
                            <div className="card mb-3" key={i}>
                              <i className="bx bx-pencil" onClick={() => saveProject(false, row)}></i>
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
                    <h3>Social Profile <i className="bx bx-pencil edit-icon-btn" onClick={() => handleShow('socialShow')}></i></h3>

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
                    <h3>Contact Information <i className="bx bx-pencil edit-icon-btn" onClick={() => handleShow('contactShow')}></i></h3>
                    
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
                    <h3>Job Overview <i className="bx bx-pencil edit-icon-btn"></i></h3>
                    
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
                    <h3>Download Resume <i className="bx bx-trash delete-icon-btn"></i></h3>
                    
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