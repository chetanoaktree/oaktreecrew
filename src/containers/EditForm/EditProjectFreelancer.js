import React from 'react';
import { Modal,Row,Col } from 'react-bootstrap';
import Select from 'react-select-me';
import 'react-select-me/lib/ReactSelectMe.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Multiselect } from 'multiselect-react-dropdown';


function EditProjectFreelancer(props) {
	// console.log("props",props)
    const technology_options = [
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
    var selectedValues = []
    var technologies = props.state.technologies.split(',')
    technologies.length > 0 && technologies.map((row)=> {selectedValues.push({value: row}) }); // "A,B,C"

	return(
		<Modal show={props.show} onHide={() => props.handleClose('projectShow')} className="Reset-Your-Password-Popup" centered >
			<Modal.Header closeButton>
				<Modal.Title>Edit</Modal.Title>
			</Modal.Header>             
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
                
		        <Col xs={12} md={12}>
                    <div className="form-group">
			            <label>Technologies</label>
                        <Multiselect
                          options={technology_options}
                          displayValue="value"
                          onSelect={props.onSelectProject} 
                          onRemove={props.onRemoveProject} 
                          selectedValues={selectedValues}
                        />
			        </div>
		        </Col>
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Start Date</label>
                        <div className="input-group date" id="datetimepicker">
                            <DatePicker
                            selected={new Date(props.state.start_date || '')}
                            onChange={(date) => props.handleProjectDateChange('start_date', date)}
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
                <Col xs={12} md={6}>
                    <div className="form-group">
                        <label>End Date</label>
                        <div className="input-group date" id="datetimepicker">
                            <DatePicker
                            selected={new Date(props.state.end_date  || '')}
                            onChange={(date) => props.handleProjectDateChange('end_date', date)}
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