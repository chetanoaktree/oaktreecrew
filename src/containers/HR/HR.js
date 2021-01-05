import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { withRouter } from "react-router-dom";
import { fetchFreelancers } from '../../actions/hrActions';
import profileImageThumbnail from "../../assets/images/avatar-img.jpg"


function HR(props) {

    const [state , setState] = useState({
        from_data: "",
        to_data:"",
        total_count: "",
        total_pages: "",
        users: []
      })
    const dispatch = useDispatch();
    
    useEffect(() => {
      fetchData();
    }, []);

    const fetchData = () => {
      let data = '?page_number=1&per_page=10&role_name=freelancer'
      
      // Update the document title using the browser API
      dispatch(fetchFreelancers(data)).then((res)=> {
          if(res && res.status === 200) {
            console.log("res",res.data)
             setState(prevState => ({
                ...prevState,
                from_data: res.data.from_data,
                to_data: res.data.to_data,
                total_count: res.data.total_count,
                total_pages: res.data.total_pages,
                users: res.data.users
            }))
          }
      })
    }

    // console.log("state.users",state.users)


    return(
            // Start Root Div
            <div>
                {/* Start Page Title Area */}
                <div className="page-title-area">
                  <div className="container-fluid">
                      <div className="page-title-content">
                          <div className="row">
                              <div className="col-md-7">
                                  <h2>Freelancers</h2>                    
                              </div>
                              <div className="col-md-5">
                                  <div className="row">
                                      <div className="col-md-4">
                                          <a href="/addfreelacner" className="default-btn">
                                              Create New
                                          </a>
                                      </div>

                                      <div className="col-md-6">
                                          <form className="search-form">
                                              <input className="form-control search-box-input" name="search" placeholder="Search..." type="text" />
                                          </form>
                                      </div>
                                      <div className="col-md-2">
                                          <a className="default-btn filter-button" href="#" role="button"  data-toggle="modal" data-target="#freelancermorefilter"><i className='bx bx-dots-vertical-rounded'></i></a>
                                      </div>
                                  </div>                            
                              </div>                    
                          </div>
                      </div>
                  </div>
              </div>
              {/* End Page Title Area */}
              {/* Start Freelancers List Area */}
              <section className="mt-5">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="">
                                <ul className="nav nav-tabs nav-justified freelancers-list-tabs" id="pills-tab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="pills-all-tab" data-toggle="pill" href="#pills-all" role="tab" aria-controls="pills-all" aria-selected="true"><span className="tabs-counter-value">{state.total_count}</span> All Freelancers</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-draft-tab" data-toggle="pill" href="#pills-draft" role="tab" aria-controls="pills-draft" aria-selected="false"><span className="tabs-counter-value">820</span> Draft</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-scheduling-tab" data-toggle="pill" href="#pills-scheduling" role="tab" aria-controls="pills-scheduling" aria-selected="false"><span className="tabs-counter-value">420</span> Scheduling</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-Interview-tab" data-toggle="pill" href="#pills-Interview" role="tab" aria-controls="pills-Interview" aria-selected="false"><span className="tabs-counter-value">0</span> Interview</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-Assessment-tab" data-toggle="pill" href="#pills-Assessment" role="tab" aria-controls="pills-Assessment" aria-selected="false"><span className="tabs-counter-value">0</span> Assessment</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-References-tab" data-toggle="pill" href="#pills-References" role="tab" aria-controls="pills-References" aria-selected="false"><span className="tabs-counter-value">0</span> References</a>
                                    </li>     
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-Decision-tab" data-toggle="pill" href="#pills-Decision" role="tab" aria-controls="pills-Decision" aria-selected="false"><span className="tabs-counter-value">0</span> Decision</a>
                                    </li>    
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-Job-offer-and-contract-tab" data-toggle="pill" href="#pills-Job-offer-and-contract" role="tab" aria-controls="pills-Job-offer-and-contract" aria-selected="false"><span className="tabs-counter-value">0</span> Job offer & contract</a>
                                    </li>                                                                                                             
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
                                        <div className="table-responsive">
                                            <table className="freelancers-list-table table table-striped">
                                                <thead>
                                                <tr>
                                                    <th scope="col">
                                                        <div className="checkboxs">
                                                            <input type="checkbox" id="chb2" />
                                                        </div>
                                                    </th>
                                                    <th scope="col">APPLICATION # <i className='bx bx-sort'></i></th>
                                                    <th scope="col">APPLICANT <i className='bx bx-sort'></i></th>
                                                    <th scope="col">STATUS <i className='bx bx-sort'></i></th>
                                                    <th scope="col">PROGRESS <i className='bx bx-sort'></i></th>
                                                    <th scope="col">Date <i className='bx bx-sort'></i></th>
                                                    <th scope="col"></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                {state.users.length > 0 ? state.users.map((row,i) => {
                                                  return (
                                                    <tr key={i}>
                                                        <td>
                                                            <div className="checkboxs">
                                                                <input type="checkbox" id="chb2" />
                                                            </div>
                                                        </td>
                                                        <td scope="row">{row.id}</td>
                                                        <td><img src={profileImageThumbnail} className="freelancers-list-profile-thumbnail" /> {row.first_name +' '+row.last_name } </td>
                                                        <td><span className="status-indicator status-indicator-draft"></span> Draft</td>
                                                        <td>20% Complete</td>
                                                        <td><i className='bx bx-calendar' ></i> {new Date(row.created_at).toLocaleDateString()}</td>
                                                        <td className="do-action-button-container">
                                                            <div className="dropdown">
                                                                <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                    <i className='bx bx-dots-horizontal-rounded'></i>
                                                                </button>
                                                                <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                  <a className="dropdown-item" href={"/freelancer-detail/"+row.id}>View</a>
                                                                  <a className="dropdown-item" href="#">Edit</a>
                                                                  <a className="dropdown-item" href="#">Delete</a>
                                                                </div>
                                                            </div>                                                
                                                        </td>
                                                    </tr>
                                                    )
                                                  })
                                                  : 
                                                  (<tr></tr>)
                                                }                                                                                                     
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-draft" role="tabpanel" aria-labelledby="pills-draft-tab">
                                        <div className="table-responsive">
                                            <table className="freelancers-list-table table table-striped">
                                                <thead>
                                                <tr>
                                                    <th scope="col">
                                                        <div className="checkboxs">
                                                            <input type="checkbox" id="chb2" />
                                                        </div>
                                                    </th>
                                                    <th scope="col">APPLICATION # <i className='bx bx-sort'></i></th>
                                                    <th scope="col">APPLICANT <i className='bx bx-sort'></i></th>
                                                    <th scope="col">STATUS <i className='bx bx-sort'></i></th>
                                                    <th scope="col">PROGRESS <i className='bx bx-sort'></i></th>
                                                    <th scope="col">Date <i className='bx bx-sort'></i></th>
                                                    <th scope="col"></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="checkboxs">
                                                            <input type="checkbox" id="chb2" />
                                                        </div>
                                                    </td>
                                                    <td scope="row">1039</td>
                                                    <td><img src={profileImageThumbnail} className="freelancers-list-profile-thumbnail" /> Clark Davidson </td>
                                                    <td><span className="status-indicator status-indicator-draft"></span> Draft</td>
                                                    <td>20% Complete</td>
                                                    <td><i className='bx bx-calendar' ></i> Oct 2</td>
                                                    <td className="do-action-button-container">
                                                        <div className="dropdown">
                                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className='bx bx-dots-horizontal-rounded'></i>
                                                            </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                              <a className="dropdown-item" href="#">View</a>
                                                              <a className="dropdown-item" href="#">Edit</a>
                                                              <a className="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>                                                
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="checkboxs">
                                                            <input type="checkbox" id="chb2" />
                                                        </div>
                                                    </td>                                            
                                                    <td scope="row">1038</td>
                                                    <td><img src={profileImageThumbnail} className="freelancers-list-profile-thumbnail" /> Vanessa Thomas </td>
                                                    <td><span className="status-indicator status-indicator-draft"></span> Draft</td>
                                                    <td>30% Complete</td>
                                                    <td><i className='bx bx-calendar' ></i> Oct 2</td>
                                                    <td className="do-action-button-container">
                                                        <div className="dropdown">
                                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className='bx bx-dots-horizontal-rounded'></i>
                                                            </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                              <a className="dropdown-item" href="#">View</a>
                                                              <a className="dropdown-item" href="#">Edit</a>
                                                              <a className="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>                                                
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="checkboxs">
                                                            <input type="checkbox" id="chb2" />
                                                        </div>
                                                    </td>                                            
                                                    <td scope="row">1037</td>
                                                    <td><img src={profileImageThumbnail} className="freelancers-list-profile-thumbnail" /> Joe Birdland </td>
                                                    <td><span className="status-indicator status-indicator-draft"></span> Draft</td>
                                                    <td>20% Complete</td>
                                                    <td><i className='bx bx-calendar' ></i> Oct 1</td>
                                                    <td className="do-action-button-container">
                                                        <div className="dropdown">
                                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className='bx bx-dots-horizontal-rounded'></i>
                                                            </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                              <a className="dropdown-item" href="#">View</a>
                                                              <a className="dropdown-item" href="#">Edit</a>
                                                              <a className="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>                                                
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="checkboxs">
                                                            <input type="checkbox" id="chb2" />
                                                        </div>
                                                    </td>                                            
                                                    <td scope="row">1036</td>
                                                    <td><img src={profileImageThumbnail} className="freelancers-list-profile-thumbnail" /> Kiki Sidwali </td>
                                                    <td><span className="status-indicator status-indicator-draft"></span> Draft</td>
                                                    <td>50% Complete</td>
                                                    <td><i className='bx bx-calendar' ></i> sep 30</td>
                                                    <td className="do-action-button-container">
                                                        <div className="dropdown">
                                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className='bx bx-dots-horizontal-rounded'></i>
                                                            </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                              <a className="dropdown-item" href="#">View</a>
                                                              <a className="dropdown-item" href="#">Edit</a>
                                                              <a className="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>                                                
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <td>
                                                        <div className="checkboxs">
                                                            <input type="checkbox" id="chb2" />
                                                        </div>
                                                    </td>                                            
                                                    <td scope="row">1035</td>
                                                    <td><img src={profileImageThumbnail} className="freelancers-list-profile-thumbnail" /> Vanessa Thomas </td>
                                                    <td><span className="status-indicator status-indicator-draft"></span> Draft</td>
                                                    <td>20% Complete</td>
                                                    <td><i className='bx bx-calendar' ></i> Aug 15</td>
                                                    <td className="do-action-button-container">
                                                        <div className="dropdown">
                                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className='bx bx-dots-horizontal-rounded'></i>
                                                            </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                              <a className="dropdown-item" href="#">View</a>
                                                              <a className="dropdown-item" href="#">Edit</a>
                                                              <a className="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>                                                
                                                    </td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>

                                    </div>
                                    <div className="tab-pane fade" id="pills-scheduling" role="tabpanel" aria-labelledby="pills-scheduling-tab">
                                        <div className="table-responsive">
                                            <table className="freelancers-list-table table table-striped">
                                                <thead>
                                                <tr>
                                                    <th scope="col">
                                                        <div className="checkboxs">
                                                            <input type="checkbox" id="chb2" />
                                                        </div>
                                                    </th>
                                                    <th scope="col">APPLICATION # <i className='bx bx-sort'></i></th>
                                                    <th scope="col">APPLICANT <i className='bx bx-sort'></i></th>
                                                    <th scope="col">STATUS <i className='bx bx-sort'></i></th>
                                                    <th scope="col">PROGRESS <i className='bx bx-sort'></i></th>
                                                    <th scope="col">Date <i className='bx bx-sort'></i></th>
                                                    <th scope="col"></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td>
                                                        <div className="checkboxs">
                                                            <input type="checkbox" id="chb2" />
                                                        </div>
                                                    </td>                                            
                                                    <td scope="row">1034</td>
                                                    <td><img src={profileImageThumbnail} className="freelancers-list-profile-thumbnail" /> Joe Birdland </td>
                                                    <td><span className="status-indicator status-indicator-in-scheduling"></span> In Scheduling</td>
                                                    <td>Interview Not Started</td>
                                                    <td><i className='bx bx-calendar' ></i> Aug 13</td>
                                                    <td className="do-action-button-container">
                                                        <div className="dropdown">
                                                            <button className="dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                <i className='bx bx-dots-horizontal-rounded'></i>
                                                            </button>
                                                            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                              <a className="dropdown-item" href="#">View</a>
                                                              <a className="dropdown-item" href="#">Edit</a>
                                                              <a className="dropdown-item" href="#">Delete</a>
                                                            </div>
                                                        </div>                                                
                                                    </td>
                                                </tr>                                                                                                                  
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="tab-pane fade" id="pills-Interview" role="tabpanel" aria-labelledby="pills-Interview-tab">
                                        <div className="table-responsive">
                                            <table className="freelancers-list-table table table-striped">
                                                <thead>
                                                <tr>
                                                    <th scope="col">
                                                        <div className="checkboxs">
                                                            <input type="checkbox" id="chb2" />
                                                        </div>
                                                    </th>
                                                    <th scope="col">APPLICATION # <i className='bx bx-sort'></i></th>
                                                    <th scope="col">APPLICANT <i className='bx bx-sort'></i></th>
                                                    <th scope="col">STATUS <i className='bx bx-sort'></i></th>
                                                    <th scope="col">PROGRESS <i className='bx bx-sort'></i></th>
                                                    <th scope="col">Date <i className='bx bx-sort'></i></th>
                                                    <th scope="col"></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td colSpan="7">
                                                        <div className="text-center"><h6>No Data Found</h6></div>
                                                    </td>
                                                </tr>                                                                                                                  
                                                </tbody>
                                            </table>
                                        </div>                                
                                    </div>
                                    <div className="tab-pane fade" id="pills-Assessment" role="tabpanel" aria-labelledby="pills-Assessment-tab">
                                        <div className="table-responsive">
                                            <table className="freelancers-list-table table table-striped">
                                                <thead>
                                                <tr>
                                                    <th scope="col">
                                                        <div className="checkboxs">
                                                            <input type="checkbox" id="chb2" />
                                                        </div>
                                                    </th>
                                                    <th scope="col">APPLICATION # <i className='bx bx-sort'></i></th>
                                                    <th scope="col">APPLICANT <i className='bx bx-sort'></i></th>
                                                    <th scope="col">STATUS <i className='bx bx-sort'></i></th>
                                                    <th scope="col">PROGRESS <i className='bx bx-sort'></i></th>
                                                    <th scope="col">Date <i className='bx bx-sort'></i></th>
                                                    <th scope="col"></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td colSpan="7">
                                                        <div className="text-center"><h6>No Data Found</h6></div>
                                                    </td>
                                                </tr>                                                                                                                  
                                                </tbody>
                                            </table>
                                        </div>                                
                                    </div>
                                    <div className="tab-pane fade" id="pills-References" role="tabpanel" aria-labelledby="pills-References-tab">
                                        <div className="table-responsive">
                                            <table className="freelancers-list-table table table-striped">
                                                <thead>
                                                <tr>
                                                    <th scope="col">
                                                        <div className="checkboxs">
                                                            <input type="checkbox" id="chb2" />
                                                        </div>
                                                    </th>
                                                    <th scope="col">APPLICATION # <i className='bx bx-sort'></i></th>
                                                    <th scope="col">APPLICANT <i className='bx bx-sort'></i></th>
                                                    <th scope="col">STATUS <i className='bx bx-sort'></i></th>
                                                    <th scope="col">PROGRESS <i className='bx bx-sort'></i></th>
                                                    <th scope="col">Date <i className='bx bx-sort'></i></th>
                                                    <th scope="col"></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td colSpan="7">
                                                        <div className="text-center"><h6>No Data Found</h6></div>
                                                    </td>
                                                </tr>                                                                                                                  
                                                </tbody>
                                            </table>
                                        </div>                                
                                    </div>
                                    <div className="tab-pane fade" id="pills-Decision" role="tabpanel" aria-labelledby="pills-Decision-tab">
                                        <div className="table-responsive">
                                            <table className="freelancers-list-table table table-striped">
                                                <thead>
                                                <tr>
                                                    <th scope="col">
                                                        <div className="checkboxs">
                                                            <input type="checkbox" id="chb2" />
                                                        </div>
                                                    </th>
                                                    <th scope="col">APPLICATION # <i className='bx bx-sort'></i></th>
                                                    <th scope="col">APPLICANT <i className='bx bx-sort'></i></th>
                                                    <th scope="col">STATUS <i className='bx bx-sort'></i></th>
                                                    <th scope="col">PROGRESS <i className='bx bx-sort'></i></th>
                                                    <th scope="col">Date <i className='bx bx-sort'></i></th>
                                                    <th scope="col"></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td colSpan="7">
                                                        <div className="text-center"><h6>No Data Found</h6></div>
                                                    </td>
                                                </tr>                                                                                                                  
                                                </tbody>
                                            </table>
                                        </div>                                
                                    </div>
                                    <div className="tab-pane fade" id="pills-Job-offer-and-contract" role="tabpanel" aria-labelledby="pills-Job-offer-and-contract-tab">
                                        <div className="table-responsive">
                                            <table className="freelancers-list-table table table-striped">
                                                <thead>
                                                <tr>
                                                    <th scope="col">
                                                        <div className="checkboxs">
                                                            <input type="checkbox" id="chb2" />
                                                        </div>
                                                    </th>
                                                    <th scope="col">APPLICATION # <i className='bx bx-sort'></i></th>
                                                    <th scope="col">APPLICANT <i className='bx bx-sort'></i></th>
                                                    <th scope="col">STATUS <i className='bx bx-sort'></i></th>
                                                    <th scope="col">PROGRESS <i className='bx bx-sort'></i></th>
                                                    <th scope="col">Date <i className='bx bx-sort'></i></th>
                                                    <th scope="col"></th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td colSpan="7">
                                                        <div className="text-center"><h6>No Data Found</h6></div>
                                                    </td>
                                                </tr>                                                                                                                  
                                                </tbody>
                                            </table>
                                        </div>                                
                                    </div>                                                                                                                                            
                                </div> 
                            </div>

                        </div>
                    </div>
                </div>      
              </section>
              {/* End Freelancers List Area */}
            </div>
            // End Root Div
    )
}

export default withRouter(HR);