import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { withRouter } from "react-router-dom";
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';
import ReactTable from 'react-table-v6'
import 'react-table-v6/react-table.css'

import TableListingLoader from "../../components/Loader/Skelton"
import { fetchFreelancers, deleteFreelancer } from '../../actions/hrActions';
import profileImageThumbnail from "../../assets/images/avatar-img.jpg"
import Tabs from 'react-responsive-tabs';



function Freelancer(props) {

    const [state , setState] = useState({
        from_data: "",
        to_data:"",
        total_count: "",
        total_pages: "",
        users: [],
        page_number: 1,
        per_page: 10,
        pages  : 0,
        filtered: [],
        filterAll: '',
        page: '',
        pageSize: ''  
      })
    const dispatch = useDispatch();
    
    useEffect(() => {
      // fetchData();
    }, []);

    const fetchData = (page, pageSize, sorted, filtered) => {
      let data = `?page_number=${page+1}&per_page=${pageSize}&role_name=freelancer`
      setState(prevState => ({
                ...prevState,
                page: page,
                pageSize: pageSize
              }))
      // Update the document title using the browser API
      dispatch(fetchFreelancers(data)).then((res)=> {
          if(res && res.status === 200) {
            // console.log("res",res.data)
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

    const loader = useSelector(state => (state.applicationIsLoading), shallowEqual)
    // console.log("state.users",loader)

    const handleDelete = (uuid) => {
      dispatch(deleteFreelancer(uuid)).then((res)=> {
          if(res && res.status === 200) {
            // console.log("res",res)
            NotificationManager.success(res.message, 'Delete');  
            fetchData(state.page, state.pageSize, '', '');
          }
      }) 
    }

    return(
            // Start Root Div
            <div>
                {/* Start Page Title Area */}
                <div className="page-title-area">
                  <div className="container">
                      <div className="page-title-content">
                          <div className="row">
                              <div className="col-md-6">
                                  <h2>Freelancers</h2>                    
                              </div>
                              <div className="col-md-6">
																<a href="/addfreelancer" className="default-btn float-right">
																		Create New
																</a>
																{/* <a className="default-btn filter-button" href="#" role="button"  data-toggle="modal" data-target="#freelancermorefilter">
																		<i className='bx bx-dots-vertical-rounded'></i>
																</a> */}
                              </div>                    
                          </div>
                      </div>
                  </div>
              </div>
              {/* End Page Title Area */}
              {/* Start Freelancers List Area */}
              <section className="mt-5">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="">
                                <ul className="nav nav-tabs nav-justified freelancers-list-tabs" id="pills-tab" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active" id="pills-all-tab" data-toggle="pill" href="#pills-all" role="tab" aria-controls="pills-all" aria-selected="true"><span className="tabs-counter-value">{state.total_count}</span> All Freelancers</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-draft-tab" data-toggle="pill" href="#pills-draft" role="tab" aria-controls="pills-draft" aria-selected="false"><span className="tabs-counter-value">0</span> Draft</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-scheduling-tab" data-toggle="pill" href="#pills-scheduling" role="tab" aria-controls="pills-scheduling" aria-selected="false"><span className="tabs-counter-value">0</span> Scheduling</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-Interview-tab" data-toggle="pill" href="#pills-Interview" role="tab" aria-controls="pills-Interview" aria-selected="false"><span className="tabs-counter-value">0</span> Interview</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-Rejected-tab" data-toggle="pill" href="#pills-Rejected" role="tab" aria-controls="pills-Rejected" aria-selected="false"><span className="tabs-counter-value">0</span> Rejected</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-Job-offer-and-contract-tab" data-toggle="pill" href="#pills-Job-offer-and-contract" role="tab" aria-controls="pills-Job-offer-and-contract" aria-selected="false"><span className="tabs-counter-value">0</span> Job offer & contract</a>
                                    </li>                                                                                                             
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
                                      
                                        <ReactTable
                                            data={state.users}
																						sortable={true}
																						multiSort={true}
                                            resizable={true}
                                            loading={loader}
                                            loadingText= {'loading.......'}
                                            noDataText="No Data Found !!"
                                            filterable 
                                            defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                            filtered={state.filtered}
                                            columns={[
                                                {  
                                                    Header      : 'Sr.',
                                                    accessor    : 'id',
                                                    className   : 'grid-header',
                                                    filterable  : true,
                                                    filterMethod: (filter, row) => {
                                                        return row[filter.id].includes(filter.value);
                                                    }
                                                    
                                                },
                                                {
                                                  Header: () => (
                                                    <span>
                                                      <i className="fa-tasks" /> Name
                                                    </span>
                                                  ),
                                                  accessor: 'first_name',
                                                  Cell: row => {
                                                    return <a href={"/freelancer-detail/"+row.original.uuid}><img src={row.original.user_image ? row.original.user_image : profileImageThumbnail} className="freelancers-list-profile-thumbnail" /> {row.original.first_name +' '+row.original.last_name}</a>
                                                  }
                                                },
                                                {
                                                  Header: () => (
                                                    <span>
                                                      <i className="fa-tasks" /> Title
                                                    </span>
                                                  ),
                                                  accessor: 'title',
                                                  Cell: row => {
                                                    return <a href={"/freelancer-detail/"+row.original.uuid}>{_.get(row.original.additional_information, 'title', [profileImageThumbnail])}</a>
                                                  }
                                                },
                                                {
                                                  Header: 'Status',
                                                  accessor: 'status',
                                                  Cell: row => {
                                                    return <span><span className="status-indicator status-indicator-draft"></span> Draft</span>
                                                  }
                                                },
                                                {
                                                  Header: 'Created Date',
                                                  accessor: 'created_at',
                                                  Cell: row => {
                                                    return <span><i className='bx bx-calendar' ></i> {new Date(row.original.created_at).toLocaleDateString()}</span>
                                                  }
                                                },
                                                {
                                                  Header: 'Action',
                                                  accessor: 'uuid',
                                                  Cell: row => {
                                                    return <div className="">
                                                              <div className="" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                                  <i className='bx bx-dots-horizontal-rounded'></i>
                                                              </div>
                                                              <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                                                <a className="dropdown-item" href={"/freelancer-detail/"+row.original.uuid}>View</a>
                                                                <a className="dropdown-item" href="#">Edit</a>
                                                                <a className="dropdown-item" onClick={() => handleDelete(row.original.uuid)}>Delete</a>
                                                              </div>
                                                            </div>
                                                  }
                                                }
                                            ]}
                                            defaultSorted={[
                                                {
                                                    id: 'first_name',
                                                    desc: false
                                                } 
                                            ]}
                                            defaultPageSize={10}
                                            minRows= {state.users}
                                            className="table table-bordered responsive striped hover highlight py-3 px-3"
                                            Sorted
                                            pages={state.total_pages}
                                            showPagination={true}
                                            showPaginationTop={false}
                                            showPaginationBottom={true}
                                            pageSizeOptions={[10, 20, 50]}
                                            manual // For server side pagination
                                            showPageJump={ true}
                                            collapseOnSortingChange={ true}

                                            onFetchData={(state, instance) => {
                                                fetchData(state.page, state.pageSize, state.sorted, state.filtered);
                                            }}
                                        />
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
                                    <div className="tab-pane fade" id="pills-Rejected" role="tabpanel" aria-labelledby="pills-Rejected-tab">
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

export default withRouter(Freelancer);