import React, { useState } from 'react';
import { useDispatch } from 'react-redux'
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function AddFreelancer(props) {
    
    const [state , setState] = useState({
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
        additional_information_attributes: {
            notes:"", 
            presented_salary:"",
            expected_salary:"", 
            category:"",
            job_nature:"", 
            job_level: ""
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

    const handleDateChange = (date) => {
        setState(prevState => ({
            ...prevState,
            dob : date
        }))
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
                                            <input type="file" id="img" name="img" accept="image/*" />
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
                                        <a href="#" className="default-btn float-right">
                                            Add
                                        </a>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Level of Education</label>
                                            <select>
                                                <option value="1">Massachusetts</option>
                                                <option value="2">Maryland</option>
                                                <option value="3">Colorado</option>
                                                <option value="4">Vermont</option>
                                                <option value="5">Virginia</option>
                                                <option value="6">Washington</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Exam / Degree Title</label>
                                            <select>
                                                <option value="1">SEE</option>
                                                <option value="2">M.A.</option>
                                                <option value="3">Enginery of CSE</option>
                                                <option value="4">Master</option>
                                                <option value="5">Associate</option>
                                                <option value="6">Graduate</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Major/Group</label>
                                            <input className="form-control" type="text" name="Major" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Institute Name</label>
                                            <input className="form-control" type="text" name="Institute" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Result</label>
                                            <select className="height">
                                                <option value="1">First Class</option>
                                                <option value="2">Second Class</option>
                                                <option value="3">Thread Class</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Marks(%)</label>
                                            <input className="form-control" type="text" name="Marks" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Year of Passing</label>
                                            <select>
                                                <option value="1">2020</option>
                                                <option value="2">2021</option>
                                                <option value="3">2022</option>
                                                <option value="4">2023</option>
                                                <option value="5">2024</option>
                                                <option value="6">2025</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Duration (Years)</label>
                                            <input className="form-control" type="text" name="Duration" />
                                        </div>
                                    </div>
                                </div>

                                <h3>Experience</h3>

                                <div className="row">
                                    <div className="col-lg-12 col-md-12">
                                        <a href="#" className="default-btn float-right">
                                            Add
                                        </a>
                                    </div>
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Company Name</label>
                                            <input className="form-control" type="text" name="Company" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Company Business </label>
                                            <input className="form-control" type="text" name="Business" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Designation</label>
                                            <input className="form-control" type="text" name="Designation" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Department</label>
                                            <input className="form-control" type="text" name="Department" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Responsibilities</label>
                                            <input className="form-control" type="text" name="Responsibilities" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Company Location</label>
                                            <input className="form-control" type="text" name="Location" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6">
                                        <div className="form-group">
                                            <label>Employment Period</label>
                                            <select>
                                                <option value="1">2020</option>
                                                <option value="2">2021</option>
                                                <option value="3">2022</option>
                                                <option value="4">2023</option>
                                                <option value="5">2024</option>
                                                <option value="6">2025</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <a href="#" className="default-btn">Save</a>
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