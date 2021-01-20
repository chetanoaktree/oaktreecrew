import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { withRouter } from "react-router-dom";
// import {NotificationManager} from 'react-notifications';
import _ from 'lodash';
import ReactTable from 'react-table-v6'

// import TableListingLoader from "../../components/Loader/Skelton"
import { fetchLeads } from '../../actions/hrActions';
import profileImageThumbnail from "../../assets/images/avatar-img.jpg"
// import Tabs from 'react-responsive-tabs';
import { Modal,Row,Col } from 'react-bootstrap';


function Leads(props) {

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

    const [model, setModel] = useState({
      modelShow: false,
      modelData: ''
    })

    const handleShow = (data) => {
        setModel(prevState => ({
            ...prevState,
            modelShow : true,
            modelData : data 
        }))
    }

    const handleClose = () => {
        setModel(prevState => ({
            ...prevState,
            modelShow : false,
            modelData : ''
        }))
    }

    const dispatch = useDispatch();
    
    useEffect(() => {
      // fetchData();
    }, []);

    const fetchData = (page, pageSize, sorted, filtered) => {
      console.log(page, pageSize, sorted, filtered)
      let data = `?page_number=${page+1}&per_page=${pageSize}`
      setState(prevState => ({
                ...prevState,
                page: page,
                pageSize: pageSize
              }))
      // Update the document title using the browser API
      dispatch(fetchLeads(data)).then((res)=> {
          if(res && res.status === 200) {
            // console.log("res",res)
             setState(prevState => ({
                ...prevState,
                from_data: res.data.from_data,
                to_data: res.data.to_data,
                total_count: res.data.total_count,
                total_pages: res.data.total_pages,
                users: res.data.clients
            }))
          }
      })
    }

    const loader = useSelector(state => (state.applicationIsLoading), shallowEqual)
    // console.log("state.users",loader)

    const handleDelete = (uuid) => {
    //   dispatch(deleteFreelancer(uuid)).then((res)=> {
    //       if(res && res.status === 200) {
    //         // console.log("res",res)
    //         NotificationManager.success(res.message, 'Delete');  
    //         fetchData(state.page, state.pageSize, '', '');
    //       }
    //   }) 
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
                                  <h2>Leads</h2>                    
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
                                        <a className="nav-link active" id="pills-all-tab" data-toggle="pill" href="#pills-all" role="tab" aria-controls="pills-all" aria-selected="true"><span className="tabs-counter-value">{state.total_count}</span> All Leads</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-scheduling-tab" data-toggle="pill" href="#pills-scheduling" role="tab" aria-controls="pills-scheduling" aria-selected="false"><span className="tabs-counter-value">0</span> Assign To HR</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-Interview-tab" data-toggle="pill" href="#pills-Interview" role="tab" aria-controls="pills-Interview" aria-selected="false"><span className="tabs-counter-value">0</span> Interviewer</a>
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
                                            loadingText= {'Data Loading .......'}
                                            noDataText="No Data Found !!"
                                            // filterable
                                            defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                            filtered={state.filtered}
                                            defaultPageSize={10}
                                            minRows= {state.users}
                                            className="py-3 px-3"
                                            Sorted
                                            pages={state.total_pages}
                                            showPagination={true}
                                            showPaginationTop={false}
                                            showPaginationBottom={true}
                                            pageSizeOptions={[10, 20, 50]}
                                            // manual // For server side pagination
                                            showPageJump={ true}
                                            collapseOnSortingChange={ true}
                                            columns={[
																							{  
																									Header      : 'Sr.',
																									accessor    : 'id',
																									className   : 'grid-header',
																									filterable  : false,
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
																								accessor: 'name',
																								Cell: row => {
																									return  <span>{row.original.name}</span>
																								}
																							},
																							{
																								Header: () => (
																									<span>
																										<i className="fa-tasks" /> Company Name
																									</span>
																								),
																								accessor: 'company_name',
																								Cell: row => {
																									return  <span>{row.original.company_name}</span>
																								}
																							},
																							{
																								Header: () => (
																									<span>
																										<i className="fa-tasks" /> Business Email
																									</span>
																								),
																								accessor: 'business_email',
																								Cell: row => {
																									return  <span>{row.original.business_email}</span>
																								}
                                                                                            },
                                                                                            {
																								Header: () => (
																									<span>
																										<i className="fa-tasks" /> Category
																									</span>
																								),
																								accessor: 'category',
																								Cell: row => {
																									return  <span>{row.original.category}</span>
																								}
																							},
                                                                                            {
																								Header: () => (
																									<span>
																										<i className="fa-tasks" /> Time Zone
																									</span>
																								),
																								accessor: 'timezone',
																								Cell: row => {
																									return  <span>{row.original.timezone}</span>
																								}
																							},
                                                                                            {
																								Header: () => (
																									<span>
																										<i className="fa-tasks" /> Phone
																									</span>
																								),
																								accessor: 'phone_number',
																								Cell: row => {
																									return  <span>{row.original.phone_number}</span>
																								}
																							},
																							{
																								Header: 'Status',
																								accessor: 'status',
																								Cell: row => {
																									return <span><span className="status-indicator status-indicator-draft"></span> Open</span>
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
                                            onFetchData={(state, instance) => {
                                                fetchData(state.page, state.pageSize, state.sorted, state.filtered);
                                            }}
                                        />
                                    </div>
                                    <div className="tab-pane fade" id="pills-draft" role="tabpanel" aria-labelledby="pills-draft-tab">
                                        <ReactTable
                                            data={state.users}
                                            sortable={true}
                                            multiSort={true}
                                            resizable={true}
                                            loading={loader}
                                            loadingText= {'Data Loading .......'}
                                            noDataText="No Data Found !!"
                                            // filterable
                                            defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                            filtered={state.filtered}
                                            defaultPageSize={10}
                                            minRows= {state.users}
                                            className="py-3 px-3"
                                            Sorted
                                            pages={state.total_pages}
                                            showPagination={true}
                                            showPaginationTop={false}
                                            showPaginationBottom={true}
                                            pageSizeOptions={[10, 20, 50]}
                                            // manual // For server side pagination
                                            showPageJump={ true}
                                            collapseOnSortingChange={ true}
                                            columns={[
																							{  
																									Header      : 'Sr.',
																									accessor    : 'id',
																									className   : 'grid-header',
																									filterable  : false,
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
																								accessor: 'name',
																								Cell: row => {
																									return  <span>{row.original.name}</span>
																								}
																							},
																							{
																								Header: () => (
																									<span>
																										<i className="fa-tasks" /> Company Name
																									</span>
																								),
																								accessor: 'company_name',
																								Cell: row => {
																									return  <span>{row.original.company_name}</span>
																								}
																							},
																							{
																								Header: () => (
																									<span>
																										<i className="fa-tasks" /> Business Email
																									</span>
																								),
																								accessor: 'business_email',
																								Cell: row => {
																									return  <span>{row.original.business_email}</span>
																								}
                                                                                            },
                                                                                            {
																								Header: () => (
																									<span>
																										<i className="fa-tasks" /> Category
																									</span>
																								),
																								accessor: 'category',
																								Cell: row => {
																									return  <span>{row.original.category}</span>
																								}
																							},
                                                                                            {
																								Header: () => (
																									<span>
																										<i className="fa-tasks" /> Time Zone
																									</span>
																								),
																								accessor: 'timezone',
																								Cell: row => {
																									return  <span>{row.original.timezone}</span>
																								}
																							},
                                                                                            {
																								Header: () => (
																									<span>
																										<i className="fa-tasks" /> Phone
																									</span>
																								),
																								accessor: 'phone_number',
																								Cell: row => {
																									return  <span>{row.original.phone_number}</span>
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
                                            onFetchData={(state, instance) => {
                                                fetchData(state.page, state.pageSize, state.sorted, state.filtered);
                                            }}
                                        />

                                    </div>
                                    <div className="tab-pane fade" id="pills-scheduling" role="tabpanel" aria-labelledby="pills-scheduling-tab">
                                        <ReactTable
                                            data={[]}
                                            sortable={true}
                                            multiSort={true}
                                            resizable={true}
                                            loading={loader}
                                            loadingText= {'Data Loading .......'}
                                            noDataText="No Data Found !!"
                                            // filterable
                                            defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                            filtered={state.filtered}
                                            defaultPageSize={10}
                                            minRows= {state.users}
                                            className="py-3 px-3"
                                            Sorted
                                            pages={state.total_pages}
                                            showPagination={true}
                                            showPaginationTop={false}
                                            showPaginationBottom={true}
                                            pageSizeOptions={[10, 20, 50]}
                                            // manual // For server side pagination
                                            showPageJump={ true}
                                            collapseOnSortingChange={ true}
                                            columns={[
                                                                                            {  
                                                                                                    Header      : 'Sr.',
                                                                                                    accessor    : 'id',
                                                                                                    className   : 'grid-header',
                                                                                                    filterable  : false,
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
                                                                                                                            <a className="dropdown-item" href={"#"}>Schedule Interview</a>
                                                                                                                            <a className="dropdown-item" href={"/freelancer-detail/"+row.original.uuid}>View</a>
                                                                                                                            <a className="dropdown-item" href={"/editfreelancer/"+row.original.uuid}>Edit</a>
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
                                            onFetchData={(state, instance) => {
                                                fetchData(state.page, state.pageSize, state.sorted, state.filtered);
                                            }}
                                        />
                                    </div>
                                    <div className="tab-pane fade" id="pills-Interview" role="tabpanel" aria-labelledby="pills-Interview-tab">
                                        <ReactTable
                                            data={[]}
                                            sortable={true}
                                            multiSort={true}
                                            resizable={true}
                                            loading={loader}
                                            loadingText= {'Data Loading .......'}
                                            noDataText="No Data Found !!"
                                            // filterable
                                            defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                            filtered={state.filtered}
                                            defaultPageSize={10}
                                            minRows= {state.users}
                                            className="py-3 px-3"
                                            Sorted
                                            pages={state.total_pages}
                                            showPagination={true}
                                            showPaginationTop={false}
                                            showPaginationBottom={true}
                                            pageSizeOptions={[10, 20, 50]}
                                            // manual // For server side pagination
                                            showPageJump={ true}
                                            collapseOnSortingChange={ true}
                                            columns={[
                                                                                            {  
                                                                                                    Header      : 'Sr.',
                                                                                                    accessor    : 'id',
                                                                                                    className   : 'grid-header',
                                                                                                    filterable  : false,
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
                                                                                                                            <a className="dropdown-item" href={"#"} onClick={() => handleShow(row.original)}>Schedule Interview</a>
                                                                                                                            <a className="dropdown-item" href={"/freelancer-detail/"+row.original.uuid}>View</a>
                                                                                                                            <a className="dropdown-item" href={"/editfreelancer/"+row.original.uuid}>Edit</a>
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
                                            onFetchData={(state, instance) => {
                                                fetchData(state.page, state.pageSize, state.sorted, state.filtered);
                                            }}
                                        />                                
                                    </div>
                                    <div className="tab-pane fade" id="pills-Rejected" role="tabpanel" aria-labelledby="pills-Rejected-tab">
                                        <ReactTable
                                            data={[]}
                                            sortable={true}
                                            multiSort={true}
                                            resizable={true}
                                            loading={loader}
                                            loadingText= {'Data Loading .......'}
                                            noDataText="No Data Found !!"
                                            // filterable
                                            defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                            filtered={state.filtered}
                                            defaultPageSize={10}
                                            minRows= {state.users}
                                            className="py-3 px-3"
                                            Sorted
                                            pages={state.total_pages}
                                            showPagination={true}
                                            showPaginationTop={false}
                                            showPaginationBottom={true}
                                            pageSizeOptions={[10, 20, 50]}
                                            // manual // For server side pagination
                                            showPageJump={ true}
                                            collapseOnSortingChange={ true}
                                            columns={[
                                                                                            {  
                                                                                                    Header      : 'Sr.',
                                                                                                    accessor    : 'id',
                                                                                                    className   : 'grid-header',
                                                                                                    filterable  : false,
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
                                                                                                                            <a className="dropdown-item" href={"#"}>Schedule Interview</a>
                                                                                                                            <a className="dropdown-item" href={"/freelancer-detail/"+row.original.uuid}>View</a>
                                                                                                                            <a className="dropdown-item" href={"/editfreelancer/"+row.original.uuid}>Edit</a>
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
                                            onFetchData={(state, instance) => {
                                                fetchData(state.page, state.pageSize, state.sorted, state.filtered);
                                            }}
                                        />                                
                                    </div>
                                    <div className="tab-pane fade" id="pills-Assessment" role="tabpanel" aria-labelledby="pills-Assessment-tab">
                                        <ReactTable
                                            data={[]}
                                            sortable={true}
                                            multiSort={true}
                                            resizable={true}
                                            loading={loader}
                                            loadingText= {'Data Loading .......'}
                                            noDataText="No Data Found !!"
                                            // filterable
                                            defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                            filtered={state.filtered}
                                            defaultPageSize={10}
                                            minRows= {state.users}
                                            className="py-3 px-3"
                                            Sorted
                                            pages={state.total_pages}
                                            showPagination={true}
                                            showPaginationTop={false}
                                            showPaginationBottom={true}
                                            pageSizeOptions={[10, 20, 50]}
                                            // manual // For server side pagination
                                            showPageJump={ true}
                                            collapseOnSortingChange={ true}
                                            columns={[
                                                                                            {  
                                                                                                    Header      : 'Sr.',
                                                                                                    accessor    : 'id',
                                                                                                    className   : 'grid-header',
                                                                                                    filterable  : false,
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
                                                                                                                            <a className="dropdown-item" href={"#"}>Schedule Interview</a>
                                                                                                                            <a className="dropdown-item" href={"/freelancer-detail/"+row.original.uuid}>View</a>
                                                                                                                            <a className="dropdown-item" href={"/editfreelancer/"+row.original.uuid}>Edit</a>
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
                                            onFetchData={(state, instance) => {
                                                fetchData(state.page, state.pageSize, state.sorted, state.filtered);
                                            }}
                                        />                                
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
                                        <ReactTable
                                            data={[]}
                                            sortable={true}
                                            multiSort={true}
                                            resizable={true}
                                            loading={loader}
                                            loadingText= {'Data Loading .......'}
                                            noDataText="No Data Found !!"
                                            // filterable
                                            defaultFilterMethod={(filter, row) =>String(row[filter.id]) === filter.value}
                                            filtered={state.filtered}
                                            defaultPageSize={10}
                                            minRows= {state.users}
                                            className="py-3 px-3"
                                            Sorted
                                            pages={state.total_pages}
                                            showPagination={true}
                                            showPaginationTop={false}
                                            showPaginationBottom={true}
                                            pageSizeOptions={[10, 20, 50]}
                                            // manual // For server side pagination
                                            showPageJump={ true}
                                            collapseOnSortingChange={ true}
                                            columns={[
                                                                                            {  
                                                                                                    Header      : 'Sr.',
                                                                                                    accessor    : 'id',
                                                                                                    className   : 'grid-header',
                                                                                                    filterable  : false,
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
                                                                                                                            <a className="dropdown-item" href={"#"}>Schedule Interview</a>
                                                                                                                            <a className="dropdown-item" href={"/freelancer-detail/"+row.original.uuid}>View</a>
                                                                                                                            <a className="dropdown-item" href={"/editfreelancer/"+row.original.uuid}>Edit</a>
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
                                            onFetchData={(state, instance) => {
                                                fetchData(state.page, state.pageSize, state.sorted, state.filtered);
                                            }}
                                        />                                
                                    </div>                                                                                                                                            
                                </div> 
                            </div>

                        </div>
                    </div>
                </div>    

                <Modal show={model.modelShow} onHide={() => handleClose()} className="" centered >
                    <Modal.Header closeButton>
                        <Modal.Title>Schedule Interview</Modal.Title>
                    </Modal.Header>			
                    <Modal.Body>
                        <form className="">
                            <div className="row mb-2">
                                <div className="col-lg-6 col-md-6">
                                <h6>Interview For</h6>
                                <div className="form-group">
                                    <select>
                                    <option value="1">Microsoft</option>
                                    <option value="2">Symantec</option>
                                    <option value="3">SAP</option>
                                    <option value="4">IBM</option>
                                    <option value="5">SEO</option>
                                    </select>
                                </div>                            
                                </div>
                                <div className="col-lg-6 col-md-6">
                                <h6>Category</h6>
                                <div className="form-group">
                                    <select>
                                        <option value="1">UX/UI Designer</option>
                                        <option value="2">Web Developer</option>
                                        <option value="3">Web Designer</option>
                                        <option value="4">Software Developer</option>
                                        <option value="5">SEO</option>
                                    </select>
                                </div>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-lg-6 col-md-6">
                                    <h6>Interviewer</h6>
                                    <div className="form-group">
                                        <select className="height">
                                            <option value="1">Poonam Sharma</option>
                                            <option value="2">Shaifali Jariwala</option>
                                            <option value="2">Alka Shakhala</option>
                                            <option value="2">Puja Shrivastava</option>
                                            <option value="2">Neelam Dabar</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <h6>Interview day</h6>
                                    <form className="resume-info">
                                    <div className="form-group">
                                        <div className="input-group date" id="">
                                        <input type="text" className="form-control" placeholder="12/11/2020" />
                                        </div>	
                                    </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-lg-6 col-md-6">
                                    <h6>From hours</h6>
                                    <form className="resume-info">
                                    <div className="form-group">
                                        <div className="input-group date" id="">
                                        <input type="text" className="form-control" placeholder="12:30" />
                                        </div>	
                                    </div>
                                    </form>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <h6>To hours</h6>
                                    <form className="resume-info">
                                    <div className="form-group">
                                        <div className="input-group date" id="">
                                        <input type="text" className="form-control" placeholder="14:30" />
                                        </div>	
                                    </div>
                                    </form>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <h6>Email</h6>
                                <form className="resume-info">
                                <div className="form-group">
                                    <div className="input-group date" id="">
                                    <input type="text" className="form-control" placeholder="Email Id" disabled />
                                    </div>	
                                </div>
                                </form>                          
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <h6>Phone</h6>
                                <form className="resume-info">
                                <div className="form-group">
                                    <div className="input-group date" id="">
                                    <input type="text" className="form-control" placeholder="Contact Number" disabled />
                                    </div>	
                                </div>
                                </form>                          
                            </div>                          
                            
                            </div>  

                            <div className="row">
                                <div className="col-lg-12">
                                    <h6>Note</h6>                          
                                    <div className="form-group">
                                    <textarea name="message" className="form-control" rows="4"></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="default-btn default-btn btn-two" onClick={() => handleClose()}>Close</button>
                    <button className="default-btn default-btn">Save</button>
                    </Modal.Footer>

                </Modal>









              </section>
              {/* End Freelancers List Area */}
            </div>
            // End Root Div
    )
}

export default withRouter(Leads);