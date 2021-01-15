import React, { useState } from 'react';
import { Button, Modal,Row,Col } from 'react-bootstrap';
// import Select from "react-dropdown-select";
import Select from 'react-select-me';
import 'react-select-me/lib/ReactSelectMe.css';
import LANGUAGES from "../../constants/languages";
import CATEGORY from "../../constants/category";
// import SKILLS from "../../constants/skills";



function EditOverviewFreelancer(props) {
	// console.log("props",props)
	const gender_options =  [
                              { value: '', label: 'Select' },
                              { value: 'Male', label: 'Male' },
                              { value: 'Female', label: 'Female' }
                            ]

	const nationality_options =  [
                              { value: '', label: 'Select' },
                              { value: 'Austria', label: 'Austria' },
                              { value: 'Canada', label: 'Canada' },
                              { value: 'India', label: 'India' },
                              { value: 'United Kingdom', label: 'United Kingdom' },
                              { value: 'United State', label: 'United State' },
                            ]

	return(
		<Modal show={props.show} onHide={() => props.handleClose('overviewShow')} className="Reset-Your-Password-Popup" centered >
		    <Modal.Body>
		      
		      <Row>
		        <Col xs={12} md={12}>
                    <div className="form-group">
                    	<label>Category</label>
                        <Select 
                            name="category" 
                            options={CATEGORY}
                            onChange={(value) => props.handleSelectAdditional('category', value)} 
                            value={props.state.additional_information_attributes.category}
                            required
                        />
			        </div>
		        </Col>
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Nationality</label>
                        <Select 
                            name="nationality" 
                            options={nationality_options}
                            onChange={(value) => props.handleSelect('nationality', value)} 
                            value={props.state.nationality}
                            required
                        />
			        </div>
		        </Col>
		        
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Gender</label>
                        <Select 
                            name="gender" 
                            options={gender_options}
                            onChange={(value) => props.handleSelect('gender', value)} 
                            value={props.state.gender}
                            required
                        />
			        </div>
		        </Col> 
		        
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Total Experience</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="total_experience"
                            value={props.state.total_experience}
                            onChange={props.handleChange} 
                            required
                        />
			        </div>
		        </Col>
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Expected Salary</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="expected_salary"
                            value={props.state.additional_information_attributes.expected_salary}
                            onChange={props.handleAdditional} 
                            required
                        />
			        </div>
		        </Col>

		        <Col xs={12} md={12}>
                    <div className="form-group">
			            <label>Language</label>                      
                        <Select 
                            name="languages"
                            // multiple
                            options={LANGUAGES}
                            onChange={(value) => props.handleSelectLanguage('languages', value)} 
                            value={props.state.languages}
                            required
                        />
			        </div>
		        </Col>
		        <Col xs={12} md={12}>
		        	<Col xs={12} md={3} onChange={props.handleAdditional}>
                        <label className="single-check">
                            Full Time 
                            <input 
                                type="radio" 
                                checked={props.state.additional_information_attributes.job_nature === "Full Time"} 
                                name="job_nature" 
                                value="Full Time" required/>
                            <span className="checkmark"></span>
                        </label>
                    </Col>
                    <Col xs={12} md={3} onChange={props.handleAdditional}>
                        <label className="single-check">
                            Part Time   
                            <input 
                                type="radio" 
                                checked={props.state.additional_information_attributes.job_nature === "Part Time"} 
                                name="job_nature" 
                                value="Part Time" required/>
                            <span className="checkmark"></span>
                        </label>
                    </Col>
                    <Col xs={12} md={3} onChange={props.handleAdditional}>
                        <label className="single-check">
                            Contract
                            <input 
                                type="radio" 
                                checked={props.state.additional_information_attributes.job_nature === "Contract"} 
                                name="job_nature" 
                                value="Contract" required/>
                            <span className="checkmark"></span>
                        </label>
                    </Col>
                    <Col xs={12} md={3} onChange={props.handleAdditional}>
                        <label className="single-check">
                            Office
                            <input 
                                type="radio" 
                                checked={props.state.additional_information_attributes.job_nature === "Office"} 
                                name="job_nature" 
                                value="Office" required/>
                            <span className="checkmark"></span>
                        </label>
                    </Col>
                </Col>                       
		      </Row>
		    </Modal.Body>
		    <Modal.Footer>
		      <button className="default-btn default-btn btn-two" onClick={() => props.handleClose('overviewShow')}>Close</button>
		      <button className="default-btn default-btn" onClick={() => props.handleOverViewUpdate()}>Save</button>
		    </Modal.Footer>

		</Modal>
	)
}

export default EditOverviewFreelancer;