import React from 'react';
import { Modal,Row,Col } from 'react-bootstrap';
import { Multiselect } from 'multiselect-react-dropdown';
import SKILLS from "../../constants/skills";


function EditSkillFreelancer(props) {
	// console.log("props",props)
	var selectedValues = []
	var skills = props.state.additional_information_attributes.skills.split(',')
	skills.length > 0 && skills.map((row)=> {selectedValues.push({value: row}) }); // "A,B,C"

	return(
		<Modal show={props.show} onHide={() => props.handleClose('skillShow')} className="Reset-Your-Password-Popup" centered >
			<Modal.Header closeButton>
				<Modal.Title>Edit</Modal.Title>
			</Modal.Header>				
		    <Modal.Body>
		      <Row>
		        <Col xs={12} md={12}>
                    <div className="form-group">
                    	<label>Skills</label>
                        <Multiselect
						  options={SKILLS}
						  displayValue="value"
						  onSelect={props.onSelectSkill} 
						  onRemove={props.onRemoveSkill} 
						  selectedValues={selectedValues}
						/>
			        </div>
		        </Col>                                
		      </Row>
		    </Modal.Body>
		    <Modal.Footer>
		      <button className="default-btn default-btn btn-two" onClick={() => props.handleClose('skillShow')}>Close</button>
		      <button className="default-btn default-btn" onClick={() => props.handleSkillUpdate()}>Save</button>
		    </Modal.Footer>

		</Modal>
	)
}

export default EditSkillFreelancer;