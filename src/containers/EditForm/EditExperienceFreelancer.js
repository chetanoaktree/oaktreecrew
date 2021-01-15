import React, { useState } from 'react';
import { Button, Modal,Row,Col } from 'react-bootstrap';



function EditExperienceFreelancer(props) {
	// console.log("props",props)
	return(
		<Modal show={props.show} onHide={() => props.handleClose('experienceShow')} className="Reset-Your-Password-Popup" centered >
		    <Modal.Body>
		      
		      <Row>
		        <Col xs={12} md={6}>
		        	<div className="form-group">
			            <label>Company Name</label>
                        <input 
                            type="text"
                            className="form-control"
                            name="company_name" 
                            onChange={(e) => props.handleExperience(e)} 
                            required
                            value={props.state.company_name}
                        />
                    </div>
		        </Col>
		        
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Designation</label>
                        <input 
                            type="text"
                            className="form-control"
                            name="designation" 
                            onChange={(e) => props.handleExperience(e)} 
                            required
                            value={props.state.designation}
                        />
			        </div>
		        </Col>
                <Col xs={12} md={6}>
                    <div className="form-group">
                        <label>Company Location</label>
                        <input 
                            type="text"
                            className="form-control"
                            name="company_location" 
                            onChange={(e) => props.handleExperience(e)} 
                            required
                            value={props.state.company_location}
                        />
                    </div>
                </Col>
                <Col xs={12} md={12}>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea 
                            className="form-control" 
                            rows="4"
                            name="description" 
                            onChange={(e) => props.handleExperience(e)}
                            required
                            value={props.state.description}
                        >
                        </textarea>
                    </div>
                </Col>
                {/*
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Employment Period Year</label>
                        <Select 
                            name="employment_period_year" 
                            options={employment_period_year_options}
                            onChange={(value) => handleSelectExperience('employment_period_year', value, i)} 
                            value={props.state.employment_period_year}
                            required
                        />
			        </div>
		        </Col>
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Month</label>
                        <Select 
                            name="employment_period_month" 
                            options={employment_period_month_options}
                            onChange={(value) => handleSelectExperience('employment_period_month', value, i)} 
                            value={props.state.employment_period_month}
                            required
                        />
			        </div>
		        </Col>
		        */}                             
		      </Row>
		    </Modal.Body>
		    <Modal.Footer>
		      <button className="default-btn default-btn btn-two" onClick={() => props.handleClose('experienceShow')}>Close</button>
		      <button className="default-btn default-btn" onClick={() => props.handleExperienceSave(props.state.new)}>Save</button>
		    </Modal.Footer>
    
		</Modal>
	)
}

export default EditExperienceFreelancer;