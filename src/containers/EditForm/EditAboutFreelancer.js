import React from 'react';
import { Modal,Row,Col } from 'react-bootstrap';

function EditAboutFreelancer(props) {
	// console.log("props",props)
	return(
		<Modal show={props.show} onHide={() => props.handleClose('aboutShow')} className="Reset-Your-Password-Popup" centered >
			<Modal.Header closeButton>
				<Modal.Title>Edit</Modal.Title>
			</Modal.Header>			
		    <Modal.Body>
		      <Row>
		        <Col xs={12} md={12}>
		        	<div className="form-group">
			            <label>About</label>
	                    <textarea 
                            className="form-control" 
                            rows="4"
                            name="about_me" 
                            onChange={props.handleAdditional}
                            required
                            value = {props.state.additional_information_attributes.about_me}
                        >
                        </textarea>
                    </div>
		        </Col>                              
		      </Row>
		    </Modal.Body>
		    <Modal.Footer>
		      <button className="default-btn default-btn btn-two" onClick={() => props.handleClose('aboutShow')}>Close</button>
		      <button className="default-btn default-btn" onClick={() => props.handleAboutUpdate()}>Save</button>
		    </Modal.Footer>

		</Modal>
	)
}

export default EditAboutFreelancer;