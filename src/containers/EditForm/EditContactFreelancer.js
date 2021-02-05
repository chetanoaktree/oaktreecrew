import React from 'react';
import { Modal,Row,Col } from 'react-bootstrap';
import csc from "country-state-city";


function EditContactFreelancer(props) {
	// console.log("props",props)
	return(
		<Modal show={props.show} onHide={() => props.handleClose('contactShow')} className="Reset-Your-Password-Popup" centered >
			<form className="resume-info" onSubmit={props.handleContactUpdate}>	
			<Modal.Header closeButton>
				<Modal.Title>Edit</Modal.Title>
			</Modal.Header>				
		    <Modal.Body>
		      <Row>
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Contact<span className="text-danger">*</span></label>
			            <input 
	                        className="form-control" 
	                        type="text" 
	                        name="phone"
	                        value={props.state.phone}
	                        onChange={props.handleChange} 
	                        required
	                    />
			        </div>
		        </Col>
		        <Col xs={12} md={6}>
                    <div className="form-group">
			            <label>Skype Id</label>
			            <input 
	                        className="form-control" 
	                        type="text" 
	                        name="skype_id"
	                        value={props.state.additional_information_attributes.skype_id}
	                        onChange={props.handleAdditional} 
	                    />
			        </div>
		        </Col>
		        <Col xs={12} md={12}>
                    <div className="form-group">
			            <label>Address</label>
			            <textarea 
                            className="form-control" 
                            rows="4"
                            name="address" 
                            onChange={props.handleChange}
                            value={props.state.address}
                        >
                        </textarea>
			        </div>
		        </Col>                                
		      </Row>
		    </Modal.Body>
		    <Modal.Footer>
		      <button className="default-btn default-btn btn-two" onClick={() => props.handleClose('contactShow')}>Close</button>
		      <button className="default-btn default-btn">Save </button> 	
			</Modal.Footer>
			</form>
		</Modal>
	)
}

export default EditContactFreelancer;