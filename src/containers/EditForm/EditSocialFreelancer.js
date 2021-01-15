import React, { useState } from 'react';
import { Button, Modal,Row,Col } from 'react-bootstrap';

function EditSocialFreelancer(props) {
	// console.log("props",props)
	return(
		<Modal show={props.show} onHide={() => props.handleClose('socialShow')} className="Reset-Your-Password-Popup" centered >
		    <Modal.Body>
		      
		      <Row>
		        <Col xs={12} md={12}>
                    <div className="form-group">
                    	<label><i class="bx bxl-github"></i> Github Link</label>
                        <input 
                            className="form-control" 
                            type="text" 
                            name="github_link"
                            value={props.state.additional_information_attributes.github_link}
                            onChange={props.handleAdditional} 
                            required
                        />
			        </div>
		        </Col>
		        <Col xs={12} md={12}>
                    <div className="form-group">
			            <label><i class="bx bxl-linkedin-square"></i> Linkedin Link</label>
			            <input 
                            className="form-control" 
                            type="text" 
                            name="linkedin_link"
                            value={props.state.additional_information_attributes.linkedin_link}
                            onChange={props.handleAdditional} 
                            required
                        />
			        </div>
		        </Col>                                
		      </Row>
		    </Modal.Body>
		    <Modal.Footer>
		      <button className="default-btn default-btn btn-two" onClick={() => props.handleClose('socialShow')}>Close</button>
		      <button className="default-btn default-btn" onClick={() => props.handleSocialUpdate()}>Save</button>
		    </Modal.Footer>

		</Modal>
	)
}

export default EditSocialFreelancer;