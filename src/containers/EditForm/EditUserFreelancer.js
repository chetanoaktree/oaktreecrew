import React, { useState } from 'react';
import { Button, Modal,Row,Col } from 'react-bootstrap';

function EditUserFreelancer(props) {
	// console.log("props",props)
	return(
		<Modal show={props.show} onHide={() => props.handleClose('userShow')} className="Reset-Your-Password-Popup" centered >
		    <Modal.Body>
		      
		      <Row>
		        <Col xs={12} md={6}>
		        	<div className="form-group">
			            <label>First Name</label>
			        	<input 
	                        className="form-control" 
	                        type="text" 
	                        name="first_name"
	                        value={props.state.first_name}
	                        onChange={props.handleChange} 
	                        required
	                    />
                    </div>
		        </Col>
		        <Col xs={12} md={6}>
		        	<div className="form-group">
			            <label>Last Name</label>
	                    <input 
	                        className="form-control" 
	                        type="text" 
	                        name="last_name"
	                        value={props.state.last_name}
	                        onChange={props.handleChange} 
	                        required
	                    />
	                </div>    
		        </Col>
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Email</label>
			            <input 
	                        className="form-control" 
	                        type="email" 
	                        name="email"
	                        value={props.state.email}
	                        onChange={props.handleChange} 
	                        required
	                    />
			        </div>
		        </Col>
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Title</label>
			            <input 
			                className="form-control" 
			                type="text" 
			                name="title"
			                value={props.state.additional_information_attributes.title}
			                onChange={props.handleAdditional} 
			                required
			            />
			        </div>
		        </Col>                                
		      </Row>
		    </Modal.Body>
		    <Modal.Footer>
		      <button className="default-btn default-btn btn-two" onClick={() => props.handleClose('userShow')}>Close</button>
		      <button className="default-btn default-btn" onClick={() => props.handleUserUpdate()}>Save</button>
		    </Modal.Footer>

		</Modal>
	)
}

export default EditUserFreelancer;