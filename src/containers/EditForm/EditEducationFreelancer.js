import React, { useState } from 'react';
import { Button, Modal,Row,Col } from 'react-bootstrap';
import Select from 'react-select-me';
import 'react-select-me/lib/ReactSelectMe.css';


function EditEducationFreelancer(props) {
	// consoEducationog("props",props)
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
	return(
		<Modal show={props.show} onHide={() => props.handleClose('educationShow')} className="Reset-Your-Password-Popup" centered >
		    <Modal.Body>
		      
		      <Row>
		        <Col xs={12} md={6}>
		        	<div className="form-group">
			            <label>Level of Education</label>
                        <Select 
                            name="education_level" 
                            options={education_level_options}
                            onChange={(value) => props.handleSelectEducation('education_level', value)} 
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
                            onChange={(value) => props.handleSelectEducation('degree_title', value)} 
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
                            onChange={(value) => props.handleSelectEducation('result', value)} 
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
                            onChange={(value) => props.handleSelectEducation('year_of_passing', value)} 
                            value={props.state.year_of_passing}
                            required
                        />
			        </div>
		        </Col>
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