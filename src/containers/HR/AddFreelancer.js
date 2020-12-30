import React from 'react';
import { withRouter } from "react-router-dom";


function AddFreelancer(props) {
    
    
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
                                            <input className="form-control" type="text" name="First-Name" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Last Name</label>
                                            <input className="form-control" type="text" name="Last-Name" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Email</label>
                                            <input className="form-control" type="email" name="Email" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Phone</label>
                                            <input className="form-control" type="text" name="Phone" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Date Of Barth</label>
                                            <div className="input-group date" id="datetimepicker">
                                                <input type="text" className="form-control" placeholder="12/11/2020" />
                                                <span className="input-group-addon"></span>
                                                <i className="bx bx-calendar"></i>
                                            </div>  
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Gender</label>
                                            <select className="height">
                                                <option value="1">Male</option>
                                                <option value="2">Female</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Marital status</label>
                                            <select className="height">
                                                <option value="1">Married</option>
                                                <option value="2">Unmarried</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Nationality</label>
                                            <select>
                                                <option value="1">United Kingdom</option>
                                                <option value="2">Austria</option>
                                                <option value="3">Bahrain</option>
                                                <option value="4">Canada</option>
                                                <option value="5">Denmark</option>
                                                <option value="6">Germany</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Address Details</label>
                                            <textarea name="message" className="form-control" rows="4"></textarea>
                                        </div>
                                    </div>
                                </div>

                                <h3>Career And Application Information</h3>

                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Notes</label>
                                            <textarea name="message" className="form-control" rows="4"></textarea>
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Present Salary</label>
                                            <input className="form-control" type="text" name="Salary" />
                                        </div>
                                    </div>

                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Expected Salary</label>
                                            <input className="form-control" type="email" name="Salary" />
                                        </div>
                                    </div>
                                </div>

                                <h4>Job Level</h4>
                                
                                <div className="row mb-30">
                                    <div className="col-lg-6 col-md-6">
                                        <div className="form-group">
                                            <label>Category</label>
                                            <select>
                                                <option value="1">UX/UI Designer</option>
                                                <option value="2">Web Developer</option>
                                                <option value="3">Web Designer</option>
                                                <option value="4">Software Developer</option>
                                                <option value="5">SEO</option>
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
                                    <div className="col-lg-4 col-sm-6 col-md-3">
                                        <label className="single-check">
                                            Entry Level
                                            <input type="radio" checked="checked" name="radio-1" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-lg-4 col-sm-6 col-md-3">
                                        <label className="single-check">
                                            Mid Level
                                            <input type="radio" name="radio-1" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-lg-4 col-sm-6 col-md-3">
                                        <label className="single-check">
                                            Top Level
                                            <input type="radio" name="radio-1" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>

                                <h4>Job Nature</h4>

                                <div className="row mb-30">
                                    <div className="col-lg-2 col-sm-6 col-md-3">
                                        <label className="single-check">
                                            Full Time 
                                            <input type="radio" checked="checked" name="radio-2" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-lg-2 col-sm-6 col-md-3">
                                        <label className="single-check">
                                            Part Time   
                                            <input type="radio" name="radio-2" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-lg-2 col-sm-6 col-md-3">
                                        <label className="single-check">
                                            Contract
                                            <input type="radio" name="radio-2" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                    <div className="col-lg-2 col-sm-6 col-md-3">
                                        <label className="single-check">
                                            Internship
                                            <input type="radio" name="radio-2" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>

                                    <div className="col-lg-2 col-sm-6 col-md-3">
                                        <label className="single-check">
                                            Freelance
                                            <input type="radio" name="radio-2" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>

                                    <div className="col-lg-2 col-sm-6 col-md-3">
                                        <label className="single-check">
                                            Office
                                            <input type="radio" name="radio-2" />
                                            <span className="checkmark"></span>
                                        </label>
                                    </div>
                                </div>

                                <h3>Education</h3>

                                <div className="row">
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