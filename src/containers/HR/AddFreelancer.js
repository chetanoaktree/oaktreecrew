import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { saveFreelancer } from '../../actions/hrActions';
import {NotificationManager} from 'react-notifications';


function AddFreelancer(props) {
    
    const [state , setState] = useState({
        avatar: "",
        email:"",
        password:"",
        first_name: "",
        last_name: "",
        phone: "",
        dob: "2003-01-01",
        nationality: "",
        gender: "",
        marital_status: "",
        address: "",
        role_ids:[7],
        skip_password_validation: true,
        additional_information_attributes: {
            notes:"", 
            presented_salary:"",
            expected_salary:"", 
            category:"",
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
                employment_period: ""
            }
        ],
        education_information_attributes:[
            {
                education_level: "", 
                degree_title: "", 
                group: "", 
                institute_name: "", 
                result: "", 
                marks: "",
                year_of_passing: "", 
                duration: "" 
            }
        ]
    })

    const dispatch = useDispatch();

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
                duration: "" 
            }
        setState({...state,  
            education_information_attributes: [...state.education_information_attributes, edu]
        })
    }
    const handleEducation = (e, index) => {
        // console.log(index,"----",e.target)

        let newState = Object.assign(state);
        let education = newState.education_information_attributes[index]
        education[e.target.name] = e.target.value

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
                employment_period: ""
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

    const handleSave = () => {
        var form_data = new FormData();
        for ( var key in state ) {
            console.log("form_data",key)
            form_data.append(`user[${key}]`, state[key])          
        }
        dispatch(saveFreelancer(form_data)).then((res)=> {
            if(res && res.status === 200) {
               // props.history.push('/');
            }else{
               NotificationManager.error(res.message, 'Error');  
            }
        })
    }
    console.log("state",state)
    return(
        <section className="candidates-resume-area ptb-100">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="candidates-resume-content">
                            <form className="resume-info">
                                <h3>Personal Details</h3>

                                <div className="row">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>First Name</label>
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name="first_name"
                                                value={state.first_name}
                                                onChange={handleChange} 
                                            />
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
                                            />
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
                                            />
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
                                            />
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
                                                />
                                                <span className="input-group-addon"></span>
                                                <i className="bx bx-calendar"></i>
                                            </div>  
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Gender</label>
                                            <select className="height" name="gender" onChange={handleChange} value={state.gender}>
                                                <option value="">Select</option>
                                                <option value="male">Male</option>
                                                <option value="female">Female</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Marital status</label>
                                            <select className="height" name="marital_status" onChange={handleChange} value={state.marital_status}>
                                                <option value="">Select</option>
                                                <option value="married">Married</option>
                                                <option value="unmarried">Unmarried</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Nationality</label>
                                            <select name="nationality" onChange={handleChange} value={state.nationality}>
                                                <option value="">Select</option>
                                                <option value="uk">United Kingdom</option>
                                                <option value="austria">Austria</option>
                                                <option value="bahrain">Bahrain</option>
                                                <option value="canada">Canada</option>
                                                <option value="denmark">Denmark</option>
                                                <option value="germany">Germany</option>
                                                <option value="indian">India</option>
                                            </select>
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
                                            >
                                                {state.address}
                                            </textarea>
                                        </div>
                                    </div>
                                </div>

                                <h3>Career And Application Information</h3>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Notes</label>
                                            <textarea 
                                                className="form-control" 
                                                rows="4"
                                                name="notes" 
                                                onChange={handleAdditional}
                                            >
                                                {state.additional_information_attributes.notes}
                                            </textarea>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Present Salary</label>
                                            <input 
                                                className="form-control" 
                                                type="text" 
                                                name="presented_salary"
                                                value={state.additional_information_attributes.presented_salary}
                                                onChange={handleAdditional} 
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
                                            />
                                        </div>
                                    </div>
                                </div>

                                <h4>Job Level</h4>
                                
                                <div className="row mb-30">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Category</label>
                                            <select name="category" onChange={handleAdditional} value={state.additional_information_attributes.category}>
                                                <option value="ui_ux_designer">UX/UI Designer</option>
                                                <option value="web_dev">Web Developer</option>
                                                <option value="web_designer">Web Designer</option>
                                                <option value="soft_dev">Software Developer</option>
                                                <option value="seo">SEO</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="choose-img">
                                            <p>Upload (Resume)</p>
                                            <input type="file" id="attachment" name="attachment" onChange={onFileUpload}/>
                                            <p>Maximum file size: 2 MB</p>
                                        </div>
                                    </div>


                                </div>

                                <div className="row mb-30">
                                    <div className="col-lg-4 col-sm-6 col-md-3" onChange={handleAdditional}>
                                        <label className="single-check">
                                            Entry Level
                                            <input 
                                                type="radio" 
                                                checked={state.additional_information_attributes.job_level === "Entry Level"} 
                                                name="job_level" 
                                                value="Entry Level" />
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
                                                value="Mid Level" />
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
                                                value="Top Level" />
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
                                                value="Full Time" />
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
                                                value="Part Time" />
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
                                                value="Contract" />
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
                                                value="Internship" />
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
                                                value="Freelance" />
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
                                                value="Office" />
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
                                    {state.education_information_attributes.map((item, i) => {
                                        return (
                                        <React.Fragment>
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Level of Education</label>
                                                    <select name="education_level" onChange={(e)=>handleEducation(e,i)} value={state.education_information_attributes[i].education_level}>
                                                        <option value="">Select</option>
                                                        <option value="Massachusetts">Massachusetts</option>
                                                        <option value="Maryland">Maryland</option>
                                                        <option value="Colorado">Colorado</option>
                                                        <option value="Vermont">Vermont</option>
                                                        <option value="Virginia">Virginia</option>
                                                        <option value="Washington">Washington</option>
                                                    </select>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Exam / Degree Title</label>
                                                    <select name="degree_title" onChange={(e)=>handleEducation(e,i)} value={state.education_information_attributes[i].degree_title}>
                                                        <option value="">Select</option>
                                                        <option value="engineer">Engineer of CSE</option>
                                                        <option value="master">Master</option>
                                                        <option value="associate">Associate</option>
                                                        <option value="graduate">Graduate</option>
                                                        <option value="post_graduate">Post Graduate</option>
                                                    </select>
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
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Result</label>
                                                    <select className="height" name="result" onChange={(e)=>handleEducation(e,i)} value={state.education_information_attributes[i].result}>
                                                        <option value="first_class">First Class</option>
                                                        <option value="second_class">Second Class</option>
                                                        <option value="third_class">Third Class</option>
                                                    </select>
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
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Year of Passing</label>
                                                    <select className="height" name="year_of_passing" onChange={(e)=>handleEducation(e,i)} value={state.education_information_attributes[i].year_of_passing}>
                                                        <option value="2001">2001</option>
                                                        <option value="2002">2002</option>
                                                        <option value="2003">2003</option>
                                                        <option value="2004">2004</option>
                                                        <option value="2005">2005</option>
                                                        <option value="2006">2006</option>
                                                        <option value="2007">2007</option>
                                                        <option value="2008">2008</option>
                                                        <option value="2009">2009</option>
                                                        <option value="2010">2010</option>
                                                        <option value="2011">2011</option>
                                                        <option value="2012">2012</option>
                                                        <option value="2013">2013</option>
                                                        <option value="2014">2014</option>
                                                        <option value="2015">2015</option>
                                                        <option value="2016">2016</option>
                                                        <option value="2017">2017</option>
                                                        <option value="2018">2018</option>
                                                        <option value="2019">2019</option>
                                                        <option value="2020">2020</option>
                                                    </select>
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
                                                    />
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
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>Employment Period Year</label>
                                                    <select className="height" name="employment_period_year" onChange={(e)=>handleEducation(e,i)} value={state.education_information_attributes[i].employment_period_year}>
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                        <option value="11">11</option>
                                                        <option value="12">12</option>
                                                        <option value="13">13</option>
                                                        <option value="14">14</option>
                                                        <option value="15">15</option>
                                                        <option value="16">16</option>
                                                        <option value="17">17</option>
                                                        <option value="18">18</option>
                                                        <option value="19">19</option>
                                                        <option value="20">20</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-lg-6">
                                                <div className="form-group">
                                                    <label>Month</label>
                                                    <select className="height" name="employment_period_month" onChange={(e)=>handleEducation(e,i)} value={state.education_information_attributes[i].employment_period_month}>
                                                        <option value="0">0</option>
                                                        <option value="1">1</option>
                                                        <option value="2">2</option>
                                                        <option value="3">3</option>
                                                        <option value="4">4</option>
                                                        <option value="5">5</option>
                                                        <option value="6">6</option>
                                                        <option value="7">7</option>
                                                        <option value="8">8</option>
                                                        <option value="9">9</option>
                                                        <option value="10">10</option>
                                                        <option value="11">11</option>
                                                        <option value="12">12</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </React.Fragment>
                                        )
                                    })}
                                    <div className="col-lg-12">
                                        <a href="#" className="default-btn" onClick={handleSave}>Save</a>
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