import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { withRouter, useParams } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
// import Select from "react-dropdown-select";
import Select from 'react-select-me';
import 'react-select-me/lib/ReactSelectMe.css';
import {NotificationManager} from 'react-notifications';
import csc from "country-state-city";
import { saveFreelancer, getFreelancer, updateFreelancer } from '../../actions/hrActions';
import LANGUAGES from "../../constants/languages";
import CATEGORY from "../../constants/category";
import SKILLS from "../../constants/skills";
import DEGREE from "../../constants/degree";

function SaveUser(props) {

    const initialState = {
                        avatar: "",
                        email:"",
                        first_name: "",
                        middle_name: "",
                        last_name: "",
                        phone: "",
                        dob: "",
                        gender: "",
                        languages: "",
                        total_experience: "",
                        role_name: "",
                        skip_password_validation: true,
                        country: '',
                        state: '',
                        city: '',
                        pincode: '',
                        additional_information_attributes: {
                            category:"",
                            skype_id: "",
                        }
                    };
    const [state , setState] = useState(initialState)

    const initialEdState = {
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
    const [education, setEducation] = useState([ initialEdState ])

    const initialExState = {
                company_name:"", 
                designation: "", 
                company_location: "",
                employment_period: "",
                description: ""
            }

    const [experience, setExperience] = useState([ initialExState ])
    
    const initialPrState = {
                title: "", 
                start_date: "", 
                end_date: "", 
                technologies: "", 
                summary: "",
                project_link: ""
            }

    const [project, setProject] = useState([ initialPrState ])
    

    const clearState = () => {
        setState({ ...initialState });
        setEducation([{ ...initialEdState }]);
        setExperience([{ ...initialExState }]);
        setProject([{ ...initialPrState }]);
    };

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
    //   console.log(name,"----",value)
    //   if(value.length === 0){
    //     return false
    //   } 
        setState(prevState => ({
            ...prevState,
            [name] : value.value
        }))
    }

    const selectCurrentCountry = (name, value) => {
        if(value.length === 0){
            return false
        }
        // console.log(name,"----",value)
        setState(prevState => ({
            ...prevState,
            [name] : value[0].name
        }))

        let stateArg = csc.getStatesOfCountry(value[0].isoCode);

        setState(prevState => ({
            ...prevState,
            stateArg : stateArg,
            cityArg : [],
            state: '',
            city: ''
        }))

        // console.log("state",state)
        // const city = csc.getCitiesOfState(state.id)[0];
    }

    const selectCurrentState = (name, value) => {
      // console.log(name,"----",value) 
        if(value.length === 0){
            return false
        }
        setState(prevState => ({
            ...prevState,
            [name] : value[0].name
        }))

        let cityArg = csc.getCitiesOfState(value[0].countryCode, value[0].isoCode);
        // console.log("cityArg",cityArg)
        setState(prevState => ({
            ...prevState,
            cityArg : cityArg,
            city: ''
        }))
    }

    const selectCurrentCity = (name, value) => {
      // console.log(name,"----",value) 
        if(value.length === 0){
            return false
        }
        setState(prevState => ({
            ...prevState,
            [name] : value[0].name
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
        if(value.length === 0){
            return false
        }
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

    const handleSelectAdditionalCat = (name, value) => {
      // console.log(name,"----",value) 
        // if(value.length === 0){
        //     return false
        // }
        setState({...state,  
            additional_information_attributes: {
                ...state.additional_information_attributes,
                [name] : value.value
            }
        })

        // var filteredItems = SKILLS.filter(item => (
        //     item.filter === value[0].value
        //   ));
        // // console.log("filteredItems",filteredItems)
        // setState(prevState => ({
        //     ...prevState,
        //     skillArg : filteredItems
        // }))
        
    }

    const handleSelectAdditional = (name, value) => {
      // console.log(name,"----",value) 
        if(value.length === 0){
            return false
        }
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

    const { id } = useParams();

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
                    middle_name: data.middle_name,
                    last_name: data.last_name,
                    phone: data.phone,
                    dob: data.dob,
                    gender: data.gender,
                    total_experience: data.total_experience,
                    role_name: data.current_role,
                    additional_information_attributes: {
                        category: data.additional_information.category,
                        skype_id: data.additional_information.skype_id,
                    }
                }))

                // setEducation(data.education_informations)
                // setExperience(data.experience_informations)
                // setProject(data.project_informations)
              }
          })
        }
    }

    
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
        setEducation([...education, edu])
    }
    const removeEducation = (index) => {
        setEducation(experience.filter(( id, i ) => i !== index));
    }
    const handleEducation = (e, index) => {
        // console.log(index,"----",e.target)
        setEducation(prevState => {
          let obj = prevState.find(( id, i ) => i === index);
          // if(obj !== undefined) {
            obj[e.target.name] = e.target.value;
          // }
          return [...prevState];
        })
    }

    const handleSelectEducation = (name, value, index) => {
      // console.log(name,"----",value) 
        if(value.length === 0){
            return false
        }

        let newState = Object.assign(education);
        newState[index][name] = value[0].value
        setEducation(newState); 
    }

    const addExperience = () => {
        let exp = {
                company_name:"", 
                designation: "", 
                company_location: "",
                employment_period: "",
                description: ""
            }
        setExperience([...experience, exp])
    }
    const removeExperience = (index) => {
        setExperience(experience.filter(( id, i ) => i !== index));
    }
    const handleExperience = (e, index) => {
        // console.log(index,"----",e.target)
        setExperience(prevState => {
          let obj = prevState.find(( id, i ) => i === index);
          // if(obj !== undefined) {
            obj[e.target.name] = e.target.value;
          // }
          return [...prevState];
        })

    }
    const handleSelectExperience = (name, value, index) => {
      // console.log(name,"----",value)
        if(value.length === 0){
            return false
        }

        let newState = Object.assign(experience);
        newState[index][name] = value[0].value
        setExperience(newState); 
    }

    const addProject = () => {
        let proj = {
                title: "", 
                start_date: "", 
                end_date: "", 
                technologies: "", 
                summary: "",
                project_link: ""
            }

        setProject([...project, proj])
    }

    const removeProject = (index) => {
        // console.log("index",index)
        setProject(project.filter(( id, i ) => i !== index));
    }

    const handleProject = (e, index) => {
        setProject(prevState => {
          let obj = prevState.find(( id, i ) => i === index);
          // if(obj !== undefined) {
            obj[e.target.name] = e.target.value;
          // }
          return [...prevState];
        })

    }
    const handleSelectProject = (name, value, index) => {
        if(value.length === 0){
            return false
        }

        let newState = Object.assign(project);
        newState[index][name] = value.map(e => e.value).join(",")
        setProject(newState);
    }

    const handleProjectDateChange = (name, date, index) => {

        setProject(prevState => {
          let obj = prevState.find(( id, i ) => i === index);
          // if(obj !== undefined) {
            obj[name] = date;
          // }
          return [...prevState];
        })
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
        if(id){
            handleUpdate();
            return false
        }
        let data = { 
                   
                    email: state.email,
                    first_name: state.first_name,
                    middle_name: state.middle_name,
                    last_name: state.last_name,
                    phone: state.phone,
                    dob: state.dob,
                    gender: state.gender,
                    languages: state.languages,
                    total_experience: state.total_experience,
                    role_name: state.role_name,
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
        if(state.role_name !== 'hr'){
            form_data.append("user[additional_information_attributes[category]]",state.additional_information_attributes.category)
        }

        form_data.append("user[additional_information_attributes[skype_id]]",state.additional_information_attributes.skype_id)
        // console.log("form_data",form_data)
        dispatch(saveFreelancer(form_data)).then((res)=> {
            // console.log("res",res)
            if(res && res.data.status === 200) {
               NotificationManager.success("Successfully added", 'Success');
               props.history.push('/users');
            }else{
               NotificationManager.error(res.data.messages, 'Error');  
            }
        })
    }
    const handleUpdate = () => {
        let data = { 
                    email: state.email,
                    first_name: state.first_name,
                    last_name: state.last_name,
                    phone: state.phone,
                    dob: state.dob,
                    gender: state.gender,
                    total_experience: state.total_experience,
                }
        var form_data = new FormData();
        for ( var key in data ) {
            form_data.append(`user[${key}]`, data[key])          
        }
        form_data.append("user[additional_information_attributes[id]]",state.detail.additional_information.id)
        form_data.append("user[additional_information_attributes[category]]",state.additional_information_attributes.category)
        form_data.append("user[additional_information_attributes[skype_id]]",state.additional_information_attributes.skype_id)
        
        dispatch(updateFreelancer(form_data, id)).then((res)=> {
            // console.log("res",res)
            if(res && res.data.status === 200) {
               NotificationManager.success("Successfully update", 'Success');
               props.history.push('/users');
            }else{
               NotificationManager.error(res.data.messages, 'Error');  
            }
        })
    }

    const gender_options =  [
                            //   { value: '', label: 'Select' },
                              { value: 'Male', label: 'Male' },
                              { value: 'Female', label: 'Female' }
                            ]
    const role_name_options =  [
                            //   { value: '', label: 'Select' },
                              { value: 'hr', label: 'HR' },
                              { value: 'interviewer', label: 'Interviewer' },
                              { value: 'matchmaker', label: 'Match Maker' }
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
                              { value: 'United State', label: 'United State' },
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
                              { value: 'Diploma', label: 'Diploma' },
                              { value: 'Graduate', label: 'Graduate' },
                              { value: 'Post Graduate', label: 'Post Graduate' },
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
    // console.log("education======",education)
    // console.log("experience'======",experience)
    // console.log("project======",project)
    const loader = useSelector(state => (state.applicationIsLoading), shallowEqual)
    return(

        <div>
        {/* Start Page Title Area */}
        <div className="page-title-area">
            <div className="container">
                <div className="page-title-content">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>{id ? "Edit User" : "Add New User"}</h2>                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* End Page Title Area */}




        <section className="candidates-resume-area mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="candidates-resume-content">
                            <form className="resume-info" onSubmit={handleSave}>
                                <h3><i className="bx bxs-user"></i> Personal Details</h3>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="choose-img">
                                                    <p>Upload (Profile)</p>
                                                    <input type="file" id="avatar" name="avatar" accept="image/*" onChange={onPhotoUpload}/>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Role<span className="text-danger">*</span></label>
                                                    <Select 
                                                        name="role_name" 
                                                        options={role_name_options}
                                                        onChange={(value) => handleSelect('role_name', value)} 
                                                        value={state.role_name}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label> First Name<span className="text-danger">*</span></label>
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
                                            {/*
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label> Middle Name</label>
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        name="middle_name"
                                                        value={state.middle_name}
                                                        onChange={handleChange} 
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="choose-img">
                                                    <p>Upload (Resume)<span className="text-danger">*</span></p>
                                                    <input type="file" id="attachment" name="attachment" onChange={onFileUpload} required/>
                                                    <p>Maximum file size: 2 MB</p>
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Title<span className="text-danger">*</span></label>
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        name="title"
                                                        value={state.additional_information_attributes.title}
                                                        onChange={handleAdditional} 
                                                        required
                                                    />
                                                </div>
                                            </div>*/}

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label> Last Name<span className="text-danger">*</span></label>
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
                                                    <label>Email<span className="text-danger">*</span></label>
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
                                                    <label> Phone<span className="text-danger">*</span></label>
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
                                                        selected={state.dob !== '' ? new Date(state.dob) : ''}
                                                        onChange={handleDateChange}
                                                        className="form-control mn_input post-job-boxes"
                                                        dateFormat="yyyy-MM-dd"
                                                        // maxDate={new Date('2003-01-01')}
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        
                                                        />
                                                        <span className="input-group-addon"></span>
                                                        <i className="bx bx-calendar"></i>
                                                    </div>  
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Gender<span className="text-danger">*</span></label>
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
                                                    <label>Total Experience<span className="text-danger">*</span></label>
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        name="total_experience"
                                                        value={state.total_experience}
                                                        onChange={handleChange} 
                                                    />
                                                </div>
                                            </div>
                                            {state.role_name !== 'hr' &&
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Category<span className="text-danger">*</span></label>
                                                    <Select 
                                                        name="category" 
                                                        options={CATEGORY}
                                                        onChange={(value) => handleSelectAdditionalCat('category', value)} 
                                                        value={state.additional_information_attributes.category}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            }
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label><i className="bx bxl-linkedin-square"></i> Skype ID</label>
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        name="skype_id"
                                                        value={state.additional_information_attributes.skype_id}
                                                        onChange={handleAdditional}
                                                    />
                                                </div>
                                            </div>
                                            {/*

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Language<span className="text-danger">*</span></label>
                                                
                                                    <Select 
                                                        name="languages"
                                                        multi
                                                        options={LANGUAGES}
                                                        onChange={(value) => handleSelectLanguage('languages', value)} 
                                                        value={state.languages}
                                                        labelField="label"
                                                        valueField="value"
                                                    />
                                                </div>
                                            </div>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Country<span className="text-danger">*</span></label>
                                                    <Select 
                                                        name="country"
                                                        options={csc.getAllCountries()}
                                                        onChange={(value) => selectCurrentCountry('country', value)} 
                                                        value={state.country}
                                                        labelField="name"
                                                        valueField="name"
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>State</label>
                                                    <Select 
                                                        name="state"
                                                        options={state.stateArg}
                                                        onChange={(value) => selectCurrentState('state', value)} 
                                                        value={state.state}
                                                        labelField="name"
                                                        valueField="name"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>City</label>
                                                    <Select 
                                                        name="city"
                                                        options={state.cityArg}
                                                        onChange={(value) => selectCurrentCity('city', value)} 
                                                        value={state.city}
                                                        labelField="name"
                                                        valueField="name"
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Pincode</label>
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        name="pincode"
                                                        value={state.pincode}
                                                        onChange={handleChange}
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
                                                        value={state.address}
                                                    >
                                                    </textarea>
                                                </div>
                                            </div>

                                            */}
                                        </div>
                                    </div>
                                </div>
                                {/*
                                <h3><i className="bx bxs-graduation"></i> Career And Application Information</h3>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Current Salary - CTC (INR)<span className="text-danger">*</span></label>
                                                    <input 
                                                        className="form-control" 
                                                        type="number" 
                                                        name="presented_salary"
                                                        value={state.additional_information_attributes.presented_salary}
                                                        onChange={handleAdditional} 
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Expected Salary - CTC (INR)</label>
                                                    <input 
                                                        className="form-control" 
                                                        type="number" 
                                                        name="expected_salary"
                                                        value={state.additional_information_attributes.expected_salary}
                                                        onChange={handleAdditional}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="row">
                                            
                                            
                                            

                                            <div className="col-lg-12">
                                                <div className="form-group">
                                                    <label>Skills<span className="text-danger">*</span></label>
                                                    <Select 
                                                        name="skills" 
                                                        options={state.skillArg}
                                                        onChange={(value) => handleSelectAdditional('skills', value)} 
                                                        value={state.additional_information_attributes.skills}
                                                        required
                                                        multi
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label><i className="bx bxl-github"></i> Github Link</label>
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        name="github_link"
                                                        value={state.additional_information_attributes.github_link}
                                                        onChange={handleAdditional}
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label><i className="bx bxl-linkedin-square"></i> Linkedin Link</label>
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        name="linkedin_link"
                                                        value={state.additional_information_attributes.linkedin_link}
                                                        onChange={handleAdditional}
                                                    />
                                                </div>
                                            </div>
                                            
                                            
                                        </div>

                                    </div>
                                </div>



                                <h3><i className="bx bxs-bar-chart-square"></i> Experience Level<span className="text-danger">*</span></h3>
                                <div className="card mb-3">
                                    <div className="card-body">
                                      <div className="row">
                                                <div className="col-lg-4 col-sm-6 col-md-3" onChange={handleAdditional}>
                                                    <label className="single-check">
                                                        Fresher
                                                        <input 
                                                            type="radio" 
                                                            checked={state.additional_information_attributes.job_level === "Fresher"} 
                                                            name="job_level" 
                                                            value="Fresher" required/>
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-md-3" onChange={handleAdditional}>
                                                    <label className="single-check">
                                                        Intermediate
                                                        <input 
                                                            type="radio" 
                                                            checked={state.additional_information_attributes.job_level === "Intermediate"} 
                                                            name="job_level" 
                                                            value="Intermediate" required/>
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                                <div className="col-lg-4 col-sm-6 col-md-3" onChange={handleAdditional}>
                                                    <label className="single-check">
                                                        Expert
                                                        <input 
                                                            type="radio" 
                                                            checked={state.additional_information_attributes.job_level === "Expert"} 
                                                            name="job_level" 
                                                            value="Expert" required/>
                                                        <span className="checkmark"></span>
                                                    </label>
                                                </div>
                                            </div>
                                    </div>
                                </div>

                                <h3><i className="bx bxs-briefcase"></i> Job Type<span className="text-danger">*</span></h3>

                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-3 col-sm-6 col-md-3" onChange={handleAdditional}>
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
                                            <div className="col-lg-3 col-sm-6 col-md-3" onChange={handleAdditional}>
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
                                            <div className="col-lg-3 col-sm-6 col-md-3" onChange={handleAdditional}>
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
                                            <div className="col-lg-3 col-sm-6 col-md-3" onChange={handleAdditional}>
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
                                    </div>
                                
                                </div>



                                
                                <h3><i className="bx bxs-graduation"></i> Education</h3>
                                            
                                    
                                    {education.map((item, i) => {
                                        return (
                                        <React.Fragment>

                                            <div className="card mt-4">
                                                
                                                    {
                                                        i > 0 &&
                                                        <div className="card-header">
                                                            <div className="row">
                                                                <div className="col-lg-12 col-md-12">
                                                                    <a className="default-btn btn-danger float-right remove-record-btn" onClick={() => removeEducation(i)}>
                                                                    <i className="bx bx-trash"></i> Remove Education
                                                                    </a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    }
                                                


                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="form-group">
                                                                <label>Level of Education<span className="text-danger">*</span></label>
                                                                <Select 
                                                                    name="education_level" 
                                                                    options={education_level_options}
                                                                    onChange={(value) => handleSelectEducation('education_level', value, i)} 
                                                                    value={education[i].education_level}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="form-group">
                                                                <label>Exam / Degree Title<span className="text-danger">*</span></label>
                                                                <Select 
                                                                    name="degree_title" 
                                                                    options={DEGREE}
                                                                    onChange={(value) => handleSelectEducation('degree_title', value, i)} 
                                                                    value={education[i].degree_title}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>


                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="form-group">
                                                                <label>Institute Name<span className="text-danger">*</span></label>
                                                                <input 
                                                                    className="form-control" 
                                                                    type="text" 
                                                                    name="institute_name" 
                                                                    onChange={(e) => handleEducation(e,i)}
                                                                    required
                                                                    value={education[i].institute_name}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="form-group">
                                                                <label>Result<span className="text-danger">*</span></label>
                                                                <Select 
                                                                    name="result" 
                                                                    options={result_options}
                                                                    onChange={(value) => handleSelectEducation('result', value, i)} 
                                                                    value={education[i].result}
                                                                    required
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="form-group">
                                                                <label>Marks(%)<span className="text-danger">*</span></label>
                                                                <input 
                                                                    className="form-control" 
                                                                    type="number" 
                                                                    name="marks" 
                                                                    onChange={(e) => handleEducation(e,i)}
                                                                    required
                                                                    value={education[i].marks}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3 col-md-3">
                                                            <div className="form-group">
                                                                <label>Year of Passing</label>
                                                                <Select 
                                                                    name="year_of_passing" 
                                                                    options={year_of_passing_options}
                                                                    onChange={(value) => handleSelectEducation('year_of_passing', value, i)} 
                                                                    value={education[i].year_of_passing}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3 col-md-3">
                                                            <div className="form-group">
                                                                <label>Duration (Years)</label>
                                                                <input
                                                                    className="form-control" 
                                                                    type="number" 
                                                                    name="duration" 
                                                                    onChange={(e) => handleEducation(e,i)}
                                                                    value={education[i].duration}
                                                                />
                                                            </div>
                                                        </div>

                                                        
                                                    </div>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                        )
                                    })}

                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <a className="default-btn float-right mt-3 add-new-btn" onClick={addEducation}>
                                        <i className="bx bx-plus"></i> Add Education
                                        </a>
                                    </div>
                                </div>

                                <h3><i className="bx bxs-badge"></i> Experience</h3>

                               
                                    
                                    {experience.map((item, i) => {
                                        return (
                                        <React.Fragment>


                                            <div className="card mt-4">
                                                {
                                                    i > 0 &&
                                                <div className="card-header">
                                                    <div className="row">
                                                        <div className="col-lg-12 col-md-12">
                                                            <a className="default-btn btn-danger float-right remove-record-btn" onClick={() => removeExperience(i)}>
                                                            <i className="bx bx-trash"></i> Remove Experience
                                                            </a>
                                                        </div>
                                                    </div>    
                                                </div>
                                                }


                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="form-group">
                                                                <label>Company Name<span className="text-danger">*</span></label>
                                                                <input 
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="company_name" 
                                                                    onChange={(e) => handleExperience(e,i)} 
                                                                    required
                                                                    value={experience[i].company_name}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="form-group">
                                                                <label>Designation<span className="text-danger">*</span></label>
                                                                <input 
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="designation" 
                                                                    onChange={(e) => handleExperience(e,i)} 
                                                                    required
                                                                    value={experience[i].designation}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="form-group">
                                                                <label>Company Location<span className="text-danger">*</span></label>
                                                                <input 
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="company_location" 
                                                                    onChange={(e) => handleExperience(e,i)} 
                                                                    required
                                                                    value={experience[i].company_location}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3">
                                                            <div className="form-group">
                                                                <label>Employment Period Year</label>
                                                                <Select 
                                                                    name="employment_period_year" 
                                                                    options={employment_period_year_options}
                                                                    onChange={(value) => handleSelectExperience('employment_period_year', value, i)} 
                                                                    value={experience[i].employment_period_year}
                                                                />
                                                            </div>
                                                        </div>
                                                        
                                                        <div className="col-lg-3">
                                                            <div className="form-group">
                                                                <label>Month</label>
                                                                <Select 
                                                                    name="employment_period_month" 
                                                                    options={employment_period_month_options}
                                                                    onChange={(value) => handleSelectExperience('employment_period_month', value, i)} 
                                                                    value={experience[i].employment_period_month}
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
                                                                    value={experience[i].description}
                                                                >
                                                                </textarea>
                                                            </div>
                                                        </div>
                                                    </div>                                                    
                                                </div>
                                            </div>
                                        
                                        </React.Fragment>
                                        )
                                    })}

                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <a className="default-btn float-right mt-3 add-new-btn" onClick={addExperience}>
                                        <i className="bx bx-plus"></i> Add Experience
                                        </a>
                                    </div>
                                </div>

                                <h3><i className="bx bxs-briefcase"></i> Project</h3>

                               
                                    
                                    {project.map((item, i) => {
                                        return (
                                        <React.Fragment>

                                            <div className="card mt-4">
                                                    {
                                                        i > 0 &&
                                                    <div className="card-header">
                                                        <div className="row">
                                                            <div className="col-lg-12 col-md-12">
                                                                <a className="default-btn btn-danger float-right remove-record-btn" onClick={() => removeProject(i)}>
                                                                <i className="bx bx-trash"></i> Remove Project
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>    
                                                    }
                                                <div className="card-body">
                                                    <div className="row">


                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="form-group">
                                                                <label>Title<span className="text-danger">*</span></label>
                                                                <input 
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="title" 
                                                                    onChange={(e) => handleProject(e,i)} 
                                                                    required
                                                                    value={project[i].title}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6 col-md-6">
                                                            <div className="form-group">
                                                                <label>URL</label>
                                                                <input 
                                                                    type="text"
                                                                    className="form-control"
                                                                    name="project_link" 
                                                                    onChange={(e) => handleProject(e,i)} 
                                                                    value={project[i].project_link}
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-6">
                                                            <div className="form-group">
                                                                <label>Technologies<span className="text-danger">*</span></label>
                                                                <Select 
                                                                    name="technologies" 
                                                                    options={technology_options}
                                                                    onChange={(value) => handleSelectProject('technologies', value, i)} 
                                                                    value={project[i].technologies}
                                                                    required
                                                                    multi
                                                                    
                                                                />
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3 col-md-3">
                                                            <div className="form-group">
                                                                <label>Start Date</label>
                                                                <div className="input-group date" id="datetimepicker">
                                                                    <DatePicker
                                                                    selected={project[i].start_date !== '' ? new Date(project[i].start_date) : ''}
                                                                    onChange={(date) => handleProjectDateChange('start_date', date, i)}
                                                                    className="form-control mn_input post-job-boxes"
                                                                    dateFormat="yyyy-MM-dd"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
                                                                    />
                                                                    <span className="input-group-addon"></span>
                                                                    <i className="bx bx-calendar"></i>
                                                                </div>  
                                                            </div>
                                                        </div>

                                                        <div className="col-lg-3 col-md-3">
                                                            <div className="form-group">
                                                                <label>End Date</label>
                                                                <div className="input-group date" id="datetimepicker">
                                                                    <DatePicker
                                                                    selected={project[i].end_date !== '' ? new Date(project[i].end_date) : ''}
                                                                    onChange={(date) => handleProjectDateChange('end_date', date, i)}
                                                                    className="form-control mn_input post-job-boxes"
                                                                    dateFormat="yyyy-MM-dd"
                                                                    showMonthDropdown
                                                                    showYearDropdown
                                                                    dropdownMode="select"
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
                                                                    value={project[i].summary}
                                                                >
                                                                </textarea>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                                    
                                        </React.Fragment>
                                        )
                                    })}
                                <div className="row">
                                
                                    <div className="col-lg-12 col-md-12">
                                    <a className="default-btn float-right mt-3 add-new-btn" onClick={addProject}>
                                    <i className="bx bx-plus"></i> Add Project
                                    </a>
                                    </div>
                                </div>*/}
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                       <button className="default-btn" disabled={loader}>Save </button>
                                       {/* <button className="default-btn btn-two ml-2" onClick={clearState}>Reset </button> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
        </div>
    
    
    )
}

export default withRouter(SaveUser);