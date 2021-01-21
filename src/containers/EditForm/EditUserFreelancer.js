import React from 'react';
import { Modal,Row,Col } from 'react-bootstrap';

function EditUserFreelancer(props) {
	// console.log("props",props)
	return(
		<Modal show={props.show} onHide={() => props.handleClose('userShow')} className="Reset-Your-Password-Popup" centered >
			<form className="resume-info" onSubmit={props.handleUserUpdate}>
			<Modal.Header closeButton>
				<Modal.Title>Edit</Modal.Title>
			</Modal.Header>
		    <Modal.Body>
		      <Row>
		        <Col xs={12} md={6}>
		        	<div className="form-group">
			            <label>First Name<span className="text-danger">*</span></label>
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
			            <label>Middle Name</label>
	                    <input 
	                        className="form-control" 
	                        type="text" 
	                        name="middle_name"
	                        value={props.state.middle_name}
	                        onChange={props.handleChange} 
	                    />
	                </div>    
		        </Col>
		        <Col xs={12} md={6}>
		        	<div className="form-group">
			            <label>Last Name<span className="text-danger">*</span></label>
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
			            <label>Email<span className="text-danger">*</span></label>
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
			            <label>Title<span className="text-danger">*</span></label>
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
			  <button className="default-btn default-btn">Save </button>
		    </Modal.Footer>
			</form>
		</Modal>
	)
}

export default EditUserFreelancer;