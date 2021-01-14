import React, { useState } from 'react';
import { Button, Modal,Row,Col } from 'react-bootstrap';

function EditContactFreelancer(props) {
	// console.log("props",props)
	return(
		<Modal show={props.show} onHide={() => props.handleClose('contactShow')} className="Reset-Your-Password-Popup" centered >
		    <Modal.Body>
		      
		      <Row>
		        <Col xs={12} md={12}>
                    <div className="form-group">
			            <label>Contact</label>
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
		        <Col xs={12} md={12}>
                    <div className="form-group">
			            <label>Address</label>
			            <textarea 
                            className="form-control" 
                            rows="4"
                            name="address" 
                            onChange={props.handleChange}
                            required
                            value={props.state.address}
                        >
                        </textarea>
			        </div>
		        </Col>                                
		      </Row>
		    </Modal.Body>
		    <Modal.Footer>
		      <button className="default-btn default-btn btn-two" onClick={() => props.handleClose('contactShow')}>Close</button>
		      <button className="default-btn default-btn" onClick={() => props.handleContactUpdate()}>Save</button>
		    </Modal.Footer>

		</Modal>
	)
}

export default EditContactFreelancer;