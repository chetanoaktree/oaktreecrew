import React, { useState } from 'react';
import { Button, Modal,Row,Col } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function EditProjectFreelancer(props) {
	// console.log("props",props)
	return(
		<Modal show={props.show} onHide={() => props.handleClose('projectShow')} className="Reset-Your-Password-Popup" centered >
		    <Modal.Body>
		      
		      <Row>
		        <Col xs={12} md={6}>
		        	<div className="form-group">
			            <label>Title</label>
                        <input 
                            type="text"
                            className="form-control"
                            name="title" 
                            onChange={(e) => props.handleProject(e)} 
                            required
                            value={props.state.title}
                        />
                    </div>
		        </Col>
		        
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>URL</label>
                        <input 
                            type="text"
                            className="form-control"
                            name="project_link" 
                            onChange={(e) => props.handleProject(e)} 
                            value={props.state.project_link}
                        />
			        </div>
		        </Col>
                <Col xs={12} md={12}>
                    <div className="form-group">
                        <label>Summary</label>
                        <textarea 
                            className="form-control" 
                            rows="4"
                            name="summary" 
                            onChange={(e) => props.handleProject(e)}
                            required
                            value={props.state.summary}
                        >
                        </textarea>
                    </div>
                </Col>
                {/*
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Technologies</label>
                        <Select 
                            name="technologies" 
                            options={technology_options}
                            onChange={(value) => handleSelectProject('technologies', value, i)} 
                            value={project[i].technologies}
                            required
                            multi
                            
                        />
			        </div>
		        </Col>
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Duration</label>
                        <div className="input-group date" id="datetimepicker">
                            <DatePicker
                            selected={new Date(project[i].start_date || '')}
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
		        </Col>
		        */}                             
		      </Row>
		    </Modal.Body>
		    <Modal.Footer>
		      <button className="default-btn default-btn btn-two" onClick={() => props.handleClose('projectShow')}>Close</button>
		      <button className="default-btn default-btn" onClick={() => props.handleProjectSave(props.state.new)}>Save</button>
		    </Modal.Footer>
    
		</Modal>
	)
}

export default EditProjectFreelancer;