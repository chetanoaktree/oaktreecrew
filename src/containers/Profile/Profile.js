import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { withRouter } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select-me';
import 'react-select-me/lib/ReactSelectMe.css';
import {NotificationManager} from 'react-notifications';
import { getFreelancer, updateFreelancer } from '../../actions/hrActions';
import CATEGORY from "../../constants/category";

function Profile(props) {

    const initialState = {
                        avatar: "",
                        email:"",
                        first_name: "",
                        middle_name: "",
                        last_name: "",
                        phone: "",
                        dob: "",
                        gender: "",
                        languages: "",
                        total_experience: "",
                        role_name: "",
                        skip_password_validation: true,
                        country: '',
                        state: '',
                        city: '',
                        pincode: '',
                        additional_information_attributes: {
                            category:"",
                            skype_id: "",
                        }
                    };
    const [state , setState] = useState(initialState)


    const [errors , setError] = useState({
        email: "",
        first_name: "",
        last_name: "",
        phone: ""
    })

    const dispatch = useDispatch();

    const handleChange = (e) => {
      // console.log("----",e.target)
        const {name , value} = e.target   
        setState(prevState => ({
            ...prevState,
            [name] : value
        }))

        let valid = { 
                    // avatar: state.avatar,
                    [name]: value
                  }
        checkEmpty(valid)           
    }

    const handleSelect = (name, value) => {
        setState(prevState => ({
            ...prevState,
            [name] : value.value
        }))
    }

    const onPhotoUpload = (event) => { 
    
        const {name , value} = event.target   
        setState(prevState => ({
            ...prevState,
            [name] : event.target.files[0]
        }))
    }; 

    const handleAdditional = (e) => {
      // console.log("----",e.target)
        const {name , value} = e.target   
        setState({...state,  
            additional_information_attributes: {
                ...state.additional_information_attributes,
                [name] : value
            }
        })
    }

    const handleSelectAdditionalCat = (name, value) => {

        setState({...state,  
            additional_information_attributes: {
                ...state.additional_information_attributes,
                [name] : value.value
            }
        })
        
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = () => {
          // Update the document title using the browser API
          dispatch(getFreelancer(localStorage.uuid)).then((res)=> {
              if(res && res.status === 200) {
                // console.log("res",res.data)
                let data = res.data.user    
                setState(prevState => ({
                    ...prevState,
                    detail: res.data.user,
                    avatar: "",
                    email: data.email,
                    first_name: data.first_name,
                    middle_name: data.middle_name,
                    last_name: data.last_name,
                    phone: data.phone,
                    dob: data.dob,
                    gender: data.gender,
                    total_experience: data.total_experience,
                    role_name: data.current_role,
                    additional_information_attributes: {
                        category: data.additional_information.category,
                        skype_id: data.additional_information.skype_id,
                    }
                }))
              }
          })
    }

    
    const handleDateChange = (date) => {
        setState(prevState => ({
            ...prevState,
            dob : date
        }))
    }


    const checkEmpty = (dataToCheck) => {
      let stopApicall = false

      for (var key in dataToCheck) {
          if(dataToCheck && dataToCheck[key].length === 0){
              errors[key] = "Field can't be blank"
              setError(errors)
              stopApicall = true
          }
          else{
            errors[key] = ""
            setError(errors)
          }
        }

     return stopApicall
    }

    
    const handleUpdate = (e) => {
        e.preventDefault(); 
        let data = { 
                    email: state.email,
                    first_name: state.first_name,
                    last_name: state.last_name,
                    phone: state.phone,
                    dob: state.dob,
                    gender: state.gender,
                    total_experience: state.total_experience,
                }
        var form_data = new FormData();
        for ( var key in data ) {
            form_data.append(`user[${key}]`, data[key])          
        }
        form_data.append("user[additional_information_attributes[id]]",state.detail.additional_information.id)
        form_data.append("user[additional_information_attributes[category]]",state.additional_information_attributes.category)
        form_data.append("user[additional_information_attributes[skype_id]]",state.additional_information_attributes.skype_id)
        
        dispatch(updateFreelancer(form_data, localStorage.uuid)).then((res)=> {
            // console.log("res",res)
            if(res && res.data.status === 200) {
               NotificationManager.success("Successfully update", 'Success');
            //    props.history.push('/profil');
            }else{
               NotificationManager.error(res.data.messages, 'Error');  
            }
        })
    }

    const gender_options =  [
                            //   { value: '', label: 'Select' },
                              { value: 'Male', label: 'Male' },
                              { value: 'Female', label: 'Female' }
                            ]
    const role_name_options =  [
                            //   { value: '', label: 'Select' },
                              { value: 'hr', label: 'HR' },
                              { value: 'interviewer', label: 'Interviewer' },
                              { value: 'matchmaker', label: 'Match Maker' }
                            ]
    const loader = useSelector(state => (state.applicationIsLoading), shallowEqual)
    return(

        <div>
        {/* Start Page Title Area */}
        <div className="page-title-area">
            <div className="container">
                <div className="page-title-content">
                    <div className="row">
                        <div className="col-md-12">
                            <h2>Edit Profile</h2>                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {/* End Page Title Area */}




        <section className="candidates-resume-area mt-5">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="candidates-resume-content">
                            <form className="resume-info" onSubmit={handleUpdate}>
                                <h3><i className="bx bxs-user"></i> Personal Details</h3>
                                <div className="card mb-3">
                                    <div className="card-body">
                                        <div className="row">
                                            <div className="col-lg-6 col-md-6">
                                                <div className="choose-img">
                                                    <p>Upload (Profile)</p>
                                                    <input type="file" id="avatar" name="avatar" accept="image/*" onChange={onPhotoUpload}/>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Role<span className="text-danger">*</span></label>
                                                    <Select 
                                                        name="role_name" 
                                                        options={role_name_options}
                                                        onChange={(value) => handleSelect('role_name', value)} 
                                                        value={state.role_name}
                                                        required
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label> First Name<span className="text-danger">*</span></label>
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        name="first_name"
                                                        value={state.first_name}
                                                        onChange={handleChange} 
                                                        required
                                                    />
                                                    <span className="error text-danger">{errors.first_name && "Enter First Name "}</span>
                                                </div>
                                            </div>
                                            

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label> Last Name<span className="text-danger">*</span></label>
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        name="last_name"
                                                        value={state.last_name}
                                                        onChange={handleChange} 
                                                        required
                                                    />
                                                    <span className="error text-danger">{errors.last_name && "Enter Last Name "}</span>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Email<span className="text-danger">*</span></label>
                                                    <input 
                                                        className="form-control" 
                                                        type="email" 
                                                        name="email"
                                                        value={state.email}
                                                        onChange={handleChange} 
                                                        required
                                                    />
                                                    <span className="error text-danger">{errors.email && "Enter email address"}</span>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label> Phone<span className="text-danger">*</span></label>
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        name="phone"
                                                        value={state.phone}
                                                        onChange={handleChange}
                                                        required 
                                                    />
                                                    <span className="error text-danger">{errors.phone && "Enter phone number "}</span>
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Date Of Birth</label>
                                                    <div className="input-group date" id="datetimepicker">
                                                        <DatePicker
                                                        selected={state.dob !== '' ? new Date(state.dob) : ''}
                                                        onChange={handleDateChange}
                                                        className="form-control mn_input post-job-boxes"
                                                        dateFormat="yyyy-MM-dd"
                                                        // maxDate={new Date('2003-01-01')}
                                                        showMonthDropdown
                                                        showYearDropdown
                                                        dropdownMode="select"
                                                        
                                                        />
                                                        <span className="input-group-addon"></span>
                                                        <i className="bx bx-calendar"></i>
                                                    </div>  
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Gender<span className="text-danger">*</span></label>
                                                    <Select 
                                                        name="gender" 
                                                        options={gender_options}
                                                        onChange={(value) => handleSelect('gender', value)} 
                                                        value={state.gender}
                                                        required
                                                    />
                                                </div>
                                            </div>

                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Total Experience<span className="text-danger">*</span></label>
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        name="total_experience"
                                                        value={state.total_experience}
                                                        onChange={handleChange} 
                                                    />
                                                </div>
                                            </div>
                                            {state.role_name !== 'hr' &&
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label>Category<span className="text-danger">*</span></label>
                                                    <Select 
                                                        name="category" 
                                                        options={CATEGORY}
                                                        onChange={(value) => handleSelectAdditionalCat('category', value)} 
                                                        value={state.additional_information_attributes.category}
                                                        required
                                                    />
                                                </div>
                                            </div>
                                            }
                                            <div className="col-lg-6 col-md-6">
                                                <div className="form-group">
                                                    <label><i className="bx bxl-linkedin-square"></i> Skype ID</label>
                                                    <input 
                                                        className="form-control" 
                                                        type="text" 
                                                        name="skype_id"
                                                        value={state.additional_information_attributes.skype_id}
                                                        onChange={handleAdditional}
                                                    />
                                                </div>
                                            </div>
                                           
                                        </div>
                                    </div>
                                </div>
                               
                                <div className="row">
                                    <div className="col-lg-12 text-center">
                                       <button className="default-btn" disabled={loader}>Save </button>
                                       {/* <button className="default-btn btn-two ml-2" onClick={clearState}>Reset </button> */}
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    
        </div>
    
    
    )
}

export default withRouter(Profile);