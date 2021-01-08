import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-dropdown-select";
import { saveFreelancer } from '../../actions/hrActions';
import {NotificationManager} from 'react-notifications';


function AddFreelancer(props) {
    
    const [state , setState] = useState({
        avatar: "",
        email:"",
        first_name: "",
        last_name: "",
        phone: "",
        dob: "2003-01-01",
        nationality: "",
        gender: "",
        martial_status: "",
        address: "",
        languages: "",
        total_experience: "",
        role_ids:[2],
        skip_password_validation: true,
        additional_information_attributes: {
            title: "",
            about_me:"", 
            presented_salary:"",
            expected_salary:"", 
            category:"",
            skills: '',
            job_nature:"", 
            job_level: "",
            attachment: ""
        },
        experience_informations_attributes: [
            {
                company_name:"", 
                company_business: "", 
                designation: "", 
                department: "", 
                responsebilities: "",
                company_location: "",
                employment_period_year: "",
                employment_period_month: "",
                description: ""
            }
        ],
        education_informations_attributes:[
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
        ],
        project_informations_attributes:[
            {
                title: "", 
                start_date: "2021-01-01", 
                end_date: "2021-01-01", 
                technologies: "", 
                summary: ""
            }
        ]
    })

    const [errors , setError] = useState({
        email: "",
        first_name: "",
        last_name: "",
        phone: ""
    })

    const dispatch = useDispatch();

    const handleChange = (e) => {
      // console.log("----",e.target)
        const {name , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [name] : value
        }))

        let valid = { 
                    // avatar: state.avatar,
                    [name]: value
                  }
        checkEmpty(valid)           
    }

    const handleSelect = (name, value) => {
      // console.log(name,"----",value) 
        setState(prevState => ({
            ...prevState,
            [name] : value[0].value
        }))
    }

    const onPhotoUpload = (event) => { 
    
        const {name , value} = event.target   
        setState(prevState => ({
            ...prevState,
            [name] : event.target.files[0]
        }))
    }; 

    const handleSelectLanguage = (name, value) => {
      // console.log(name,"----",value.map(e => e.value).join(",")) 
        setState(prevState => ({
            ...prevState,
            [name] : value.map(e => e.value).join(",")
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

    const handleSelectAdditional = (name, value) => {
      // console.log(name,"----",value) 
      if(name === 'skills'){
        setState({...state,  
            additional_information_attributes: {
                ...state.additional_information_attributes,
                [name] : value.map(e => e.value).join(",")
            }
        })
      }else{

        setState({...state,  
            additional_information_attributes: {
                ...state.additional_information_attributes,
                [name] : value[0].value
            }
        })

        // state.skill_options.filter((row) => {
        //   // var colorsArray=row.key.split(",");
        //   return row.key.split(",").includes(state.additional_information_attributes.category)
        // })
      }
    }
    // On file upload (click the upload button) 
    const onFileUpload = (event) => { 
    
        const {name , value} = event.target   
        setState({...state,  
            additional_information_attributes: {
                ...state.additional_information_attributes,
                [name] : event.target.files[0]
            }
        })
      // Details of the uploaded file 
      // console.log(this.state.selectedFile); 
      
    }; 


    const handleDateChange = (date) => {
        setState(prevState => ({
            ...prevState,
            dob : date
        }))
    }

    const addEducation = () => {
        let edu = {
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
        setState({...state,  
            education_informations_attributes: [...state.education_informations_attributes, edu]
        })
    }
    const handleEducation = (e, index) => {
        // console.log(index,"----",e.target)

        let newState = Object.assign(state);
        let education = newState.education_informations_attributes[index]
        education[e.target.name] = e.target.value

        setState(newState);
    }

    const handleSelectEducation = (name, value, index) => {
      // console.log(name,"----",value) 
        let newState = Object.assign(state);
        let education = newState.education_informations_attributes[index]
        education[name] = value[0].value

        setState(newState);
    }

    const addExperience = () => {
        let exp = {
                company_name:"", 
                company_business: "", 
                designation: "", 
                department: "", 
                responsebilities: "",
                company_location: "",
                employment_period: "",
                description: ""
            }
        setState({...state,  
            experience_informations_attributes: [...state.experience_informations_attributes, exp]
        })
    }
    const handleExperience = (e, index) => {
        // console.log(index,"----",e.target)

        let newState = Object.assign(state);
        let experience = newState.experience_informations_attributes[index]
        experience[e.target.name] = e.target.value

        setState(newState);
    }
    const handleSelectExperience = (name, value, index) => {
      // console.log(name,"----",value) 
        let newState = Object.assign(state);
        let experience = newState.experience_informations_attributes[index]
        experience[name] = value[0].value

        setState(newState);
    }

    const addProject = () => {
        let proj = {
                title: "", 
                start_date: new Date(), 
                end_date: new Date(), 
                technologies: "", 
                summary: ""
            }
        setState({...state,  
            project_informations_attributes: [...state.project_informations_attributes, proj]
        })
    }

    const handleProject = (e, index) => {
        // console.log(index,"----",e.target)

        let newState = Object.assign(state);
        let project = newState.project_informations_attributes[index]
        project[e.target.name] = e.target.value

        setState(newState);
    }
    const handleSelectProject = (name, value, index) => {
      // console.log(name,"----",value) 
        let newState = Object.assign(state);
        let project = newState.project_informations_attributes[index]
        project[name] = value.map(e => e.value).join(",")

        setState(newState);
    }

    const handleProjectDateChange = (name, date, index) => {
        let newState = Object.assign(state);
        let project = newState.project_informations_attributes[index]
        project[name] = date

        setState(newState);

      // console.log('=====================',state.project_informations_attributes)
    }

    const checkEmpty = (dataToCheck) => {
      let stopApicall = false

      for (var key in dataToCheck) {
          if(dataToCheck && dataToCheck[key].length === 0){
              errors[key] = "Field can't be blank"
              setError(errors)
              stopApicall = true
          }
          else{
            errors[key] = ""
            setError(errors)
          }
        }

    return stopApicall
    }

    const handleSave = (e) => {
      e.preventDefault(); 
        let data = { 
                    avatar: state.avatar,
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
                    role_ids:'2',
                    skip_password_validation: true
                }
        var form_data = new FormData();
        for ( var key in data ) {
            form_data.append(`user[${key}]`, data[key])          
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

        state.education_informations_attributes.map((p,index) => {
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

        state.experience_informations_attributes.map((p,index) => {
            form_data.append(`user[experience_informations_attributes[${index}][company_name]]`, p.company_name)
            form_data.append(`user[experience_informations_attributes[${index}][company_business]]`, p.company_business)
            form_data.append(`user[experience_informations_attributes[${index}][designation]]`, p.designation)
            form_data.append(`user[experience_informations_attributes[${index}][department]]`, p.department)
            form_data.append(`user[experience_informations_attributes[${index}][responsebilities]]`, p.responsebilities)
            form_data.append(`user[experience_informations_attributes[${index}][company_location]]`, p.company_location)
            form_data.append(`user[experience_informations_attributes[${index}][employment_period_year]]`, p.employment_period_year)
            form_data.append(`user[experience_informations_attributes[${index}][employment_period_month]]`, p.employment_period_month)
            form_data.append(`user[experience_informations_attributes[${index}][description]]`, p.description)
            return p
        })

        state.project_informations_attributes.map((p,index) => {
            form_data.append(`user[project_informations_attributes[${index}][title]]`, p.title)
            form_data.append(`user[project_informations_attributes[${index}][start_date]]`, p.start_date)
            form_data.append(`user[project_informations_attributes[${index}][end_date]]`, p.end_date)
            form_data.append(`user[project_informations_attributes[${index}][technologies]]`, p.technologies)
            form_data.append(`user[project_informations_attributes[${index}][summary]]`, p.summary)
            return p
        })
            // console.log("form_data",form_data)
        dispatch(saveFreelancer(form_data)).then((res)=> {
            console.log("res",res)
            if(res && res.status === 200) {
               NotificationManager.success("Successfully added", 'Success');
               props.history.push('/freelancer');
            }else{
               NotificationManager.error(res.message, 'Error');  
            }
        })
    }
    const gender_options =  [
                              { value: '', label: 'Select' },
                              { value: 'Male', label: 'Male' },
                              { value: 'Female', label: 'Female' }
                            ]
    const marital_options =  [
                              { value: '', label: 'Select' },
                              { value: 'Married', label: 'Married' },
                              { value: 'Unmarried', label: 'Unmarried' }
                            ]
    const nationality_options =  [
                              { value: '', label: 'Select' },
                              { value: 'Austria', label: 'Austria' },
                              { value: 'Canada', label: 'Canada' },
                              { value: 'India', label: 'India' },
                              { value: 'United Kingdom', label: 'United Kingdom' },
                            ]
    const languages_options =  [
                              { value: '', label: 'Select' },
                              { value: 'English', label: 'English' },
                              { value: 'French', label: 'French' },
                              { value: 'Arabic', label: 'Arabic' },
                              { value: 'German', label: 'German' },
                            ]
    const category_options =  [
                              { value: '', label: 'Select' },
                              { value: 'Salesforce Developer', label: 'Salesforce Developer' },
                              { value: 'ROR Developer', label: 'ROR Developer' },
                              { value: 'React Developer', label: 'React Developer' },
                              { value: 'IOS Developer', label: 'IOS Developer' },
                              { value: 'NodeJS Developer', label: 'NodeJS Developer' },
                            ]
    const skill_options =  [
                              { value: '', label: 'Select' },
                              { value: 'HTML', label: 'HTML', key: 'Salesforce Developer, ROR Developer, React Developer, NodeJS Developer' },
                              { value: 'CSS', label: 'CSS', key: 'Salesforce Developer, ROR Developer, React Developer, NodeJS Developer' },
                              { value: 'JavaScript', label: 'JavaScript', key: 'Salesforce Developer, ROR Developer, React Developer, NodeJS Developer' },
                              { value: 'Rails', label: 'Rails', key: 'ROR Developer' },
                              { value: 'ERP', label: 'ERP', key: 'ROR Developer' },
                              { value: 'Postgres', label: 'Postgres', key: 'ROR Developer' },
                              { value: 'Swift', label: 'Swift', key: 'IOS Developer' },
                              { value: 'Objective C', label: 'Objective C', key: 'IOS Developer' },
                              { value: 'Express', label: 'Express', key: 'NodeJS Developer' },
                              { value: 'Redux', label: 'Redux', key: 'React Developer' },
                              { value: 'Flux', label: 'Flux', key: 'React Developer' }, 
                            ]
    const technology_options = [
                              { value: '', label: 'Select' },
                              { value: 'Salesforce', label: 'Salesforce' },
                              { value: 'ROR', label: 'ROR' },
                              { value: 'React', label: 'React' },
                              { value: 'IOS', label: 'IOS' },
                              { value: 'NodeJS', label: 'NodeJS' },
                              { value: 'HTML', label: 'HTML' },
                              { value: 'CSS', label: 'CSS' },
                              { value: 'JavaScript', label: 'JavaScript' },
                              { value: 'Rails', label: 'Rails' },
                              { value: 'ERP', label: 'ERP' },
                              { value: 'Postgres', label: 'Postgres' },
                              { value: 'Swift', label: 'Swift' },
                              { value: 'Objective C', label: 'Objective C' },
                              { value: 'Express', label: 'Express' },
                              { value: 'Redux', label: 'Redux' },
                              { value: 'Flux', label: 'Flux' }, 
                            ]

    const education_level_options =  [
                              { value: '', label: 'Select' },
                              { value: 'Engineer', label: 'Engineer' },
                              { value: 'Master', label: 'Master' },
                              { value: 'Associate', label: 'Associate' },
                              { value: 'Graduate', label: 'Graduate' },
                              { value: 'Post Graduate', label: 'Post Graduate' },
                            ]
    const degree_title_options =  [
                              { value: '', label: 'Select' },
                              { value: 'BE(CSE)', label: 'BE(CSE)' },
                              { value: 'BE(IT)', label: 'BE(IT)' },
                              { value: 'ME', label: 'ME' },
                              { value: 'BCA', label: 'BCA' },
                              { value: 'MCA', label: 'MCA' },
                              { value: 'BSC(Computer)', label: 'BSC(Computer)' },
                              { value: 'MSC(Computer)', label: 'MSC(Computer)' },
                            ]
    const result_options =  [
                              { value: '', label: 'Select' },
                              { value: 'First', label: 'First Class' },
                              { value: 'Second', label: 'Second Class' },
                              { value: 'Third', label: 'Third Class' }
                            ]
    const year_of_passing_options =  [
                              { value: '', label: 'Select' },
                              { value: '2001', label: '2001' },
                              { value: '2002', label: '2002' },
                              { value: '2003', label: '2003' },
                              { value: '2004', label: '2004' },
                              { value: '2005', label: '2005' },
                              { value: '2006', label: '2006' },
                              { value: '2007', label: '2007' },
                              { value: '2008', label: '2008' },
                              { value: '2009', label: '2009' },
                              { value: '2010', label: '2010' },
                              { value: '2011', label: '2011' },
                              { value: '2012', label: '2012' },
                              { value: '2013', label: '2013' },
                              { value: '2014', label: '2014' },
                              { value: '2015', label: '2015' },
                              { value: '2016', label: '2016' },
                              { value: '2017', label: '2017' },
                              { value: '2018', label: '2018' },
                              { value: '2019', label: '2019' },
                              { value: '2020', label: '2020' }
                            ]
    const employment_period_year_options =  [
                              { value: '', label: 'Select' },
                              { value: '0', label: '0' },
                              { value: '1', label: '1' },
                              { value: '2', label: '2' },
                              { value: '3', label: '3' },
                              { value: '4', label: '4' },
                              { value: '5', label: '5' },
                              { value: '6', label: '6' },
                              { value: '7', label: '7' },
                              { value: '8', label: '8' },
                              { value: '9', label: '9' },
                              { value: '10', label: '10' },
                              { value: '11', label: '11' },
                              { value: '12', label: '12' },
                              { value: '13', label: '13' },
                              { value: '14', label: '14' },
                              { value: '15', label: '15' },
                              { value: '16', label: '16' },
                              { value: '17', label: '17' },
                              { value: '18', label: '18' },
                              { value: '19', label: '19' },
                              { value: '20', label: '20' }
                            ]
    const employment_period_month_options =  [
                              { value: '', label: 'Select' },
                              { value: '0', label: '0' },
                              { value: '1', label: '1' },
                              { value: '2', label: '2' },
                              { value: '3', label: '3' },
                              { value: '4', label: '4' },
                              { value: '5', label: '5' },
                              { value: '6', label: '6' },
                              { value: '7', label: '7' },
                              { value: '8', label: '8' },
                              { value: '9', label: '9' },
                              { value: '10', label: '10' },
                              { value: '11', label: '11' },
                              { value: '12', label: '12' }
                            ]
    // console.log("state======",state.project_informations_attributes)
    
    return(
        <section className="candidates-resume-area ptb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="candidates-resume-content">
                            <form className="resume-info" onSubmit={handleSave}>
                                <h3>Personal Details</h3>

                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="choose-img">
                                            <p>Upload (Profile)</p>
                                            <input type="file" id="avatar" name="avatar" accept="image/*" onChange={onPhotoUpload} required/>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Title</label>
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name="title"
                                                value={state.additional_information_attributes.title}
                                                onChange={handleAdditional} 
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name="first_name"
                                                value={state.first_name}
                                                onChange={handleChange} 
                                                required
                                            />
                                            <span className="error text-danger">{errors.first_name && "Enter First Name "}</span>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name="last_name"
                                                value={state.last_name}
                                                onChange={handleChange} 
                                                required
                                            />
                                            <span className="error text-danger">{errors.last_name && "Enter Last Name "}</span>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input 
                                                className="form-control" 
                                                type="email" 
                                                name="email"
                                                value={state.email}
                                                onChange={handleChange} 
                                                required
                                            />
                                            <span className="error text-danger">{errors.email && "Enter email address"}</span>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name="phone"
                                                value={state.phone}
                                                onChange={handleChange}
                                                required 
                                            />
                                            <span className="error text-danger">{errors.phone && "Enter phone number "}</span>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Date Of Birth</label>
                                            <div className="input-group date" id="datetimepicker">
                                                <DatePicker
                                                  selected={new Date(state.dob)}
                                                  onChange={handleDateChange}
                                                  className="form-control mn_input post-job-boxes"
                                                  dateFormat="yyyy-MM-dd"
                                                  // maxDate={new Date('2003-01-01')}
                                                  showMonthDropdown
                                                  showYearDropdown
                                                  dropdownMode="select"
                                                  required
                                                />
                                                <span className="input-group-addon"></span>
                                                <i className="bx bx-calendar"></i>
                                            </div>  
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Gender</label>
                                            <Select 
                                                name="gender" 
                                                options={gender_options}
                                                onChange={(value) => handleSelect('gender', value)} 
                                                value={state.gender}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Marital status</label>
                                            <Select 
                                                name="martial_status" 
                                                options={marital_options}
                                                onChange={(value) => handleSelect('martial_status', value)} 
                                                value={state.martial_status}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Nationality</label>
                                            <Select 
                                                name="nationality" 
                                                options={nationality_options}
                                                onChange={(value) => handleSelect('nationality', value)} 
                                                value={state.nationality}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Language</label>
                                            <Select 
                                                name="languages" 
                                                multi
                                                options={languages_options}
                                                onChange={(value) => handleSelectLanguage('languages', value)} 
                                                value={state.languages}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Total Experience</label>
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name="total_experience"
                                                value={state.total_experience}
                                                onChange={handleChange} 
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Address Details</label>
                                            <textarea 
                                                className="form-control" 
                                                rows="4"
                                                name="address" 
                                                onChange={handleChange}
                                                required
                                            >
                                                {state.address}
                                            </textarea>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>About me</label>
                                            <textarea 
                                                className="form-control" 
                                                rows="4"
                                                name="about_me" 
                                                onChange={handleAdditional}
                                                required
                                            >
                                                {state.additional_information_attributes.about_me}
                                            </textarea>
                                        </div>
                                    </div>
                                </div>

                                <h3>Career And Application Information</h3>

                                <div className="row">
                                    

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Present Salary</label>
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name="presented_salary"
                                                value={state.additional_information_attributes.presented_salary}
                                                onChange={handleAdditional} 
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Expected Salary</label>
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name="expected_salary"
                                                value={state.additional_information_attributes.expected_salary}
                                                onChange={handleAdditional} 
                                                required
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="row mb-30">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Category</label>
                                            <Select 
                                                name="category" 
                                                options={category_options}
                                                onChange={(value) => handleSelectAdditional('category', value)} 
                                                value={state.additional_information_attributes.category}
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="choose-img">
                                            <p>Upload (Resume)</p>
                                            <input type="file" id="attachment" name="attachment" onChange={onFileUpload} required/>
                                            <p>Maximum file size: 2 MB</p>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Skills</label>
                                            <Select 
                                                name="skills" 
                                                options={skill_options}
                                                onChange={(value) => handleSelectAdditional('skills', value)} 
                                                value={state.additional_information_attributes.skills}
                                                required
                                                multi
                                            />
                                        </div>
                                    </div>
                                </div>

                                <h4>Job Level</h4>

                                <div className="row mb-30">
                                    <div className="col-lg-4 col-sm-6 col-md-3" onChange={handleAdditional}>
                                        <label className="single-check">
                                            Entry Level
                                            <input 
                                                type="radio" 
                                                checked={state.additional_information_attributes.job_level === "Entry Level"} 
                                                name="job_level" 
                                                value="Entry Level" required/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-lg-4 col-sm-6 col-md-3" onChange={handleAdditional}>
                                        <label className="single-check">
                                            Mid Level
                                            <input 
                                                type="radio" 
                                                checked={state.additional_information_attributes.job_level === "Mid Level"} 
                                                name="job_level" 
                                                value="Mid Level" required/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-lg-4 col-sm-6 col-md-3" onChange={handleAdditional}>
                                        <label className="single-check">
                                            Top Level
                                            <input 
                                                type="radio" 
                                                checked={state.additional_information_attributes.job_level === "Top Level"} 
                                                name="job_level" 
                                                value="Top Level" required/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>

                                <h4>Job Nature</h4>

                                <div className="row mb-30">
                                    <div className="col-lg-2 col-sm-6 col-md-3" onChange={handleAdditional}>
                                        <label className="single-check">
                                            Full Time 
                                            <input 
                                                type="radio" 
                                                checked={state.additional_information_attributes.job_nature === "Full Time"} 
                                                name="job_nature" 
                                                value="Full Time" required/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-lg-2 col-sm-6 col-md-3" onChange={handleAdditional}>
                                        <label className="single-check">
                                            Part Time   
                                            <input 
                                                type="radio" 
                                                checked={state.additional_information_attributes.job_nature === "Part Time"} 
                                                name="job_nature" 
                                                value="Part Time" required/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-lg-2 col-sm-6 col-md-3" onChange={handleAdditional}>
                                        <label className="single-check">
                                            Contract
                                            <input 
                                                type="radio" 
                                                checked={state.additional_information_attributes.job_nature === "Contract"} 
                                                name="job_nature" 
                                                value="Contract" required/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-lg-2 col-sm-6 col-md-3" onChange={handleAdditional}>
                                        <label className="single-check">
                                            Internship
                                            <input 
                                                type="radio" 
                                                checked={state.additional_information_attributes.job_nature === "Internship"} 
                                                name="job_nature" 
                                                value="Internship" required/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>

                                    <div className="col-lg-2 col-sm-6 col-md-3" onChange={handleAdditional}>
                                        <label className="single-check">
                                            Freelance
                                            <input 
                                                type="radio" 
                                                checked={state.additional_information_attributes.job_nature === "Freelance"} 
                                                name="job_nature" 
                                                value="Freelance" required/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>

                                    <div className="col-lg-2 col-sm-6 col-md-3" onChange={handleAdditional}>
                                        <label className="single-check">
                                            Office
                                            <input 
                                                type="radio" 
                                                checked={state.additional_information_attributes.job_nature === "Office"} 
                                                name="job_nature" 
                                                value="Office" required/>
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>

                                <h3>Education</h3>

                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <a href="#" className="default-btn float-right" onClick={addEducation}>
                                            Add
                                        </a>
                                    </div>
                                    {state.education_informations_attributes.map((item, i) => {
                                        return (
                                        <React.Fragment>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Level of Education</label>
                                                    <Select 
                                                        name="education_level" 
                                                        options={education_level_options}
                                                        onChange={(value) => handleSelectEducation('education_level', value, i)} 
                                                        value={state.education_informations_attributes[i].education_level}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Exam / Degree Title</label>
                                                    <Select 
                                                        name="degree_title" 
                                                        options={degree_title_options}
                                                        onChange={(value) => handleSelectEducation('degree_title', value, i)} 
                                                        value={state.education_informations_attributes[i].degree_title}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Major/Group</label>
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        name="group" 
                                                        onChange={(e) => handleEducation(e,i)} 
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Institute Name</label>
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        name="institute_name" 
                                                        onChange={(e) => handleEducation(e,i)}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Result</label>
                                                    <Select 
                                                        name="result" 
                                                        options={result_options}
                                                        onChange={(value) => handleSelectEducation('result', value, i)} 
                                                        value={state.education_informations_attributes[i].result}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Marks(%)</label>
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        name="marks" 
                                                        onChange={(e) => handleEducation(e,i)}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Year of Passing</label>
                                                    <Select 
                                                        name="year_of_passing" 
                                                        options={year_of_passing_options}
                                                        onChange={(value) => handleSelectEducation('year_of_passing', value, i)} 
                                                        value={state.education_informations_attributes[i].year_of_passing}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Duration (Years)</label>
                                                    <input
                                                        className="form-control" 
                                                        type="text" 
                                                        name="duration" 
                                                        onChange={(e) => handleEducation(e,i)}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Description</label>
                                                    <textarea 
                                                        className="form-control" 
                                                        rows="4"
                                                        name="description" 
                                                        onChange={(e) => handleEducation(e,i)}
                                                        required
                                                    >
                                                    </textarea>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                        )
                                    })}
                                </div>

                                <h3>Experience</h3>

                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <a href="#" className="default-btn float-right" onClick={addExperience}>
                                            Add
                                        </a>
                                    </div>
                                    {state.experience_informations_attributes.map((item, i) => {
                                        return (
                                        <React.Fragment>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Company Name</label>
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        name="company_name" 
                                                        onChange={(e) => handleExperience(e,i)} 
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Company Business </label>
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        name="company_business" 
                                                        onChange={(e) => handleExperience(e,i)} 
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Designation</label>
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        name="designation" 
                                                        onChange={(e) => handleExperience(e,i)} 
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Department</label>
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        name="department" 
                                                        onChange={(e) => handleExperience(e,i)} 
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Responsibilities</label>
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        name="responsebilities" 
                                                        onChange={(e) => handleExperience(e,i)} 
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Company Location</label>
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        name="company_location" 
                                                        onChange={(e) => handleExperience(e,i)} 
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>Employment Period Year</label>
                                                    <Select 
                                                        name="employment_period_year" 
                                                        options={employment_period_year_options}
                                                        onChange={(value) => handleSelectExperience('employment_period_year', value, i)} 
                                                        value={state.experience_informations_attributes[i].employment_period_year}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>Month</label>
                                                    <Select 
                                                        name="employment_period_month" 
                                                        options={employment_period_month_options}
                                                        onChange={(value) => handleSelectExperience('employment_period_month', value, i)} 
                                                        value={state.experience_informations_attributes[i].employment_period_month}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Description</label>
                                                    <textarea 
                                                        className="form-control" 
                                                        rows="4"
                                                        name="description" 
                                                        onChange={(e) => handleExperience(e,i)}
                                                        required
                                                    >
                                                    </textarea>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                        )
                                    })}
                                </div>

                                <h3>Project</h3>

                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <a href="#" className="default-btn float-right" onClick={addProject}>
                                            Add
                                        </a>
                                    </div>
                                    {state.project_informations_attributes.map((item, i) => {
                                        return (
                                        <React.Fragment>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Title</label>
                                                    <input 
                                                        type="text"
                                                        className="form-control"
                                                        name="title" 
                                                        onChange={(e) => handleProject(e,i)} 
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>Technologies</label>
                                                    <Select 
                                                        name="technologies" 
                                                        options={technology_options}
                                                        onChange={(value) => handleSelectProject('technologies', value, i)} 
                                                        value={state.project_informations_attributes[i].technologies}
                                                        required
                                                        multi
                                                        
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Start Date</label>
                                                    <div className="input-group date" id="datetimepicker">
                                                        <DatePicker
                                                          selected={new Date(state.project_informations_attributes[i].start_date || '')}
                                                          onChange={(date) => handleProjectDateChange('start_date', date, i)}
                                                          className="form-control mn_input post-job-boxes"
                                                          dateFormat="yyyy-MM-dd"
                                                          showMonthDropdown
                                                          showYearDropdown
                                                          dropdownMode="select"
                                                          required
                                                        />
                                                        <span className="input-group-addon"></span>
                                                        <i className="bx bx-calendar"></i>
                                                    </div>  
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>End Date</label>
                                                    <div className="input-group date" id="datetimepicker">
                                                        <DatePicker
                                                          selected={new Date(state.project_informations_attributes[i].end_date  || '')}
                                                          onChange={(date) => handleProjectDateChange('end_date', date, i)}
                                                          className="form-control mn_input post-job-boxes"
                                                          dateFormat="yyyy-MM-dd"
                                                          showMonthDropdown
                                                          showYearDropdown
                                                          dropdownMode="select"
                                                          required
                                                        />
                                                        <span className="input-group-addon"></span>
                                                        <i className="bx bx-calendar"></i>
                                                    </div>  
                                                </div>
                                            </div>
                                            

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Summary</label>
                                                    <textarea 
                                                        className="form-control" 
                                                        rows="4"
                                                        name="summary" 
                                                        onChange={(e) => handleProject(e,i)}
                                                        required
                                                    >
                                                    </textarea>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                        )
                                    })}
                                    <div className="col-lg-12">
                                       <button className="default-btn" >Save </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default withRouter(AddFreelancer);