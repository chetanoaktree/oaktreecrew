import React, { useState } from 'react';
import { Button, Modal,Row,Col } from 'react-bootstrap';

function EditEducationFreelancer(props) {
	// consoEducationog("props",props)
	return(
		<Modal show={props.show} onHide={() => props.handleClose('educationShow')} className="Reset-Your-Password-Popup" centered >
		    <Modal.Body>
		      
		      <Row>
		      	{/*
		        <Col xs={12} md={6}>
		        	<div className="form-group">
			            <label>Level of Education</label>
                        <Select 
                            name="education_level" 
                            options={education_level_options}
                            onChange={(value) => handleSelectEducation('education_level', value, i)} 
                            value={props.state.education_level}
                            required
                        />
                    </div>
		        </Col>
		        
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Exam / Degree Title</label>
                        <Select 
                            name="degree_title" 
                            options={degree_title_options}
                            onChange={(value) => handleSelectEducation('degree_title', value, i)} 
                            value={props.state.degree_title}
                            required
                        />
			        </div>
		        </Col>
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Result</label>
                        <Select 
                            name="result" 
                            options={result_options}
                            onChange={(value) => handleSelectEducation('result', value, i)} 
                            value={props.state.result}
                            required
                        />
			        </div>
		        </Col>
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Year of Passing</label>
                        <Select 
                            name="year_of_passing" 
                            options={year_of_passing_options}
                            onChange={(value) => handleSelectEducation('year_of_passing', value, i)} 
                            value={props.state.year_of_passing}
                            required
                        />
			        </div>
		        </Col>
		        */}
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Major/Group</label>
                        <input 
                            type="text"
                            className="form-control"
                            name="group" 
                            onChange={(e) => props.handleEducation(e)} 
                            required
                            value={props.state.group}
                        />
			        </div>
		        </Col>
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Institute Name</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="institute_name" 
                            onChange={(e) => props.handleEducation(e)}
                            required
                            value={props.state.institute_name}
                        />
			        </div>
		        </Col>
		        
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Marks(%)</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="marks" 
                            onChange={(e) => props.handleEducation(e)}
                            required
                            value={props.state.marks}
                        />
			        </div>
		        </Col>

		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Duration (Years)</label>
                        <input
                            className="form-control" 
                            type="text" 
                            name="duration" 
                            onChange={(e) => props.handleEducation(e)}
                            required
                            value={props.state.duration}
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
                            onChange={(e) => props.handleEducation(e)}
                            required
                            value={props.state.description}
                        >
                        </textarea>
			        </div>
		        </Col>                                
		      </Row>
		    </Modal.Body>
		    <Modal.Footer>
		      <button className="default-btn default-btn btn-two" onClick={() => props.handleClose('educationShow')}>Close</button>
		      <button className="default-btn default-btn" onClick={() => props.handleEducationSave(props.state.new)}>Save</button>
		    </Modal.Footer>

		</Modal>
	)
}

export default EditEducationFreelancer;