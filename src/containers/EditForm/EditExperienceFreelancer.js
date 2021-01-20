import React from 'react';
import { Modal,Row,Col } from 'react-bootstrap';
import Select from 'react-select-me';
import 'react-select-me/lib/ReactSelectMe.css';


function EditExperienceFreelancer(props) {
	// console.log("props",props)
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
	return(
		<Modal show={props.show} onHide={() => props.handleClose('experienceShow')} className="Reset-Your-Password-Popup" centered >
			<Modal.Header closeButton>
				<Modal.Title>Edit</Modal.Title>
			</Modal.Header>             
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
                <Col xs={12} md={12}>
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

		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Employment Period Year</label>
                        <Select 
                            name="employment_period_year" 
                            options={employment_period_year_options}
                            onChange={(value) => props.handleSelectExperience('employment_period_year', value)} 
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
                            onChange={(value) => props.handleSelectExperience('employment_period_month', value)} 
                            value={props.state.employment_period_month}
                            required
                        />
			        </div>
		        </Col>
                      
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