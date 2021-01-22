import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { withRouter } from "react-router-dom";
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';
import ReactTable from 'react-table-v6'
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from 'react-select-me';
import 'react-select-me/lib/ReactSelectMe.css';
import { fetchFreelancers, deleteFreelancer, fetchInterviewerByCategory, interviewSchedule, getInterviewSchedule } from '../../actions/hrActions';
import profileImageThumbnail from "../../assets/images/avatar-img.jpg"
import { Modal } from 'react-bootstrap';


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
        pageSize: '',
        tab: 'all' 
    })

    const initialModelState = {
        modelShow: false,
        interviewerList: '',
        interviewer_id: "",
        interview_date: '',
        interview_from_time: '',
        interview_to_time: '',
        interview_uuid: '',
        interview_email: '',
        interview_phone: '',
        interview_category: '',
        interview_note: ''
    }
    const [model, setModel] = useState(initialModelState)

    const handleShow = (data) => {
        // console.log("data",data)
        setModel(prevState => ({
            ...prevState,
            modelShow : true,
            interview_uuid: data.id,
            interview_email: data.email,
            interview_phone: data.phone,
            interview_category: data.additional_information.category,
        }))

        dispatch(fetchInterviewerByCategory(data.additional_information.category)).then((res)=> {
            if(res && res.status === 200) {
            //   console.log("res",res)
              setModel(prevState => ({
                  ...prevState,
                  interviewerList: res.interviewer
              }))
            }
        })

    }

    const handleClose = () => {
        setModel({ ...initialModelState });
    }
    
    const handleChange = (e) => {
        // console.log("time",time)
        const {name , value} = e.target   
        setModel(prevState => ({
            ...prevState,
            [name] : value
        }))
    }

    const selectInterviewer = (name, value) => {
        // console.log(name,"----",value) 
          setModel(prevState => ({
              ...prevState,
              [name] : value.value
          }))
      }
    
    const handleDateChange = (name, time) => {
        // console.log("time",time)
        setModel(prevState => ({
            ...prevState,
            [name] : time
        }))
    }

    const handleInterviewSchedule = (e) => {
        e.preventDefault();
        let data = { 
            interviewer_id: model.interviewer_id,
            interview_date: model.interview_date,
            from_hours: model.interview_from_time,
            to_hours: model.interview_to_time,
            freelancer_id: model.interview_uuid,
            category: model.interview_category,
            note: model.interview_note
        }

        dispatch(interviewSchedule({interview_schedule: data})).then((res)=> {
            if(res && res.data.status === 200) {
                NotificationManager.success("Successfully Interview Schedule", 'Success');
                handleClose()
                fetchData(state.page, state.pageSize, '', '');
            }else{
                NotificationManager.error(res.data.messages, 'Error');  
            }
        }) 
    }

    const dispatch = useDispatch();
    
    useEffect(() => {
      // fetchData();
    }, []);

    const activeTab = (tab) => {
        setState(prevState => ({
            ...prevState,
            tab: tab,
            total_count: ""
        }))
        fetchData(0, 10, '', '', tab);
    }

    const fetchData = (page, pageSize, sorted, filtered, tab) => {
      //   console.log(page, pageSize, sorted, filtered)

      let data = `?page_number=${page+1}&per_page=${pageSize}&role_name=freelancer`
      if(tab !== 'all'){
          data = `${data}&status=${tab}`
      }
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
            fetchData(state.page, state.pageSize, '', '', state.tab);
          }
      }) 
    }
    // console.log("interView",model.interviewerList)
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
                                {localStorage.role === 'hr' &&
                                    <a href="/addfreelancer" className="default-btn float-right">
                                        Add New Freelancer
                                    </a>
                                }
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
                                        <a className="nav-link active" onClick={() => activeTab('all')} id="pills-all-tab" data-toggle="pill" href="#pills-all" role="tab" aria-controls="pills-all" aria-selected="true"><span className="tabs-counter-value">{state.tab === 'all' ? state.total_count : ""}</span> All Freelancers</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => activeTab('draft')} id="pills-draft-tab" data-toggle="pill" href="#pills-draft" role="tab" aria-controls="pills-draft" aria-selected="false"><span className="tabs-counter-value">{state.tab === 'draft' ? state.total_count : ""}</span> Draft</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => activeTab('scheduled')} id="pills-scheduled-tab" data-toggle="pill" href="#pills-scheduling" role="tab" aria-controls="pills-scheduling" aria-selected="false"><span className="tabs-counter-value">{state.tab === 'scheduled' ? state.total_count : ""}</span> Interview Scheduled</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => activeTab('accepted')} id="pills-Accepted-tab" data-toggle="pill" href="#pills-Accepted" role="tab" aria-controls="pills-Interview" aria-selected="false"><span className="tabs-counter-value">{state.tab === 'accepted' ? state.total_count : ""}</span> Accepted</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => activeTab('rejected')} id="pills-Rejected-tab" data-toggle="pill" href="#pills-Rejected" role="tab" aria-controls="pills-Rejected" aria-selected="false"><span className="tabs-counter-value">{state.tab === 'rejected' ? state.total_count : ""}</span> Rejected</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => activeTab('jobOffer')} id="pills-Job-offer-and-contract-tab" data-toggle="pill" href="#pills-Job-offer-and-contract" role="tab" aria-controls="pills-Job-offer-and-contract" aria-selected="false"><span className="tabs-counter-value">{state.tab === 'jobOffer' ? state.total_count : ""}</span> Job offer & contract</a>
                                    </li>                                                                                                             
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className={`tab-pane fade  ${(state.tab === 'all') && "show active"}`} id="pills-all" role="tabpanel" aria-labelledby="pills-all-tab">
                                      
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
                                                            Cell: row => {
                                                                return(<span>{row.viewIndex+1}</span>)
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
                                                            return <span className="all-status"><span className="status-indicator status-indicator-draft"></span> {row.original.status}</span>
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
                                                                    
                                                                     
                                                                    {localStorage.role === 'hr' && <a className="dropdown-item" href={"#"} onClick={() => {handleShow(row.original)}}>Schedule Interview</a>}
                                                                        <a className="dropdown-item" href={"/freelancer-detail/"+row.original.uuid}>View</a>
                                                                    {localStorage.role === 'hr' && <a className="dropdown-item" href={"/editfreelancer/"+row.original.uuid}>Edit</a>}
                                                                        <a className="dropdown-item" href="" onClick={() => handleDelete(row.original.uuid)}>Delete</a>
                                                                    
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
                                            id={state.tab}    																					
                                            onFetchData={(state, instance) => {
                                                if(state.id === 'all'){
                                                    fetchData(state.page, state.pageSize, state.sorted, state.filtered, state.id);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className={`tab-pane fade  ${(state.tab === 'draft') && "show active"}`} id="pills-draft" role="tabpanel" aria-labelledby="pills-draft-tab">
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
                                                        Cell: row => {
                                                            return(<span>{row.viewIndex+1}</span>)
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
                                                            return <span className="all-status"><span className="status-indicator status-indicator-draft"></span> {row.original.status}</span>
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
                                                                                    {localStorage.role === 'hr' && <a className="dropdown-item" href={"#"} onClick={() => {handleShow(row.original)}}>Schedule Interview</a>}
                                                                                    <a className="dropdown-item" href={"/freelancer-detail/"+row.original.uuid}>View</a>
                                                                                    {localStorage.role === 'hr' && <a className="dropdown-item" href={"/editfreelancer/"+row.original.uuid}>Edit</a>}
                                                                                    <a className="dropdown-item" href="" onClick={() => handleDelete(row.original.uuid)}>Delete</a>
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
                                            id={state.tab}    																					
                                            onFetchData={(state, instance) => {
                                                if(state.id === 'draft'){
                                                    fetchData(state.page, state.pageSize, state.sorted, state.filtered, state.id);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className={`tab-pane fade  ${(state.tab === 'scheduled') && "show active"}`} id="pills-scheduled" role="tabpanel" aria-labelledby="pills-scheduled-tab">
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
                                                        Cell: row => {
                                                            return(<span>{row.viewIndex+1}</span>)
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
                                                            return <span className="all-status"><span className="status-indicator status-indicator-draft"></span> {row.original.status}</span>
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
                                                                                    {localStorage.role === 'hr' && <a className="dropdown-item" href={"#"} onClick={() => {handleShow(row.original)}}>Reschedule Interview</a>}
                                                                                    <a className="dropdown-item" href={"/freelancer-detail/"+row.original.uuid}>View</a>
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
                                            id={state.tab}    																					
                                            onFetchData={(state, instance) => {
                                                if(state.id === 'scheduled'){
                                                    fetchData(state.page, state.pageSize, state.sorted, state.filtered, state.id);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className={`tab-pane fade  ${(state.tab === 'accepted') && "show active"}`} id="pills-Accepted" role="tabpanel" aria-labelledby="pills-Accepted-tab">
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
                                                            return <span className="all-status"><span className="status-indicator status-indicator-draft"></span> {row.original.status}</span>
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
                                            id={state.tab}    																					
                                            onFetchData={(state, instance) => {
                                                if(state.id === 'accepted'){
                                                    fetchData(state.page, state.pageSize, state.sorted, state.filtered, state.id);
                                                }
                                            }}
                                        />                                
                                    </div>
                                    <div className={`tab-pane fade  ${(state.tab === 'rejected') && "show active"}`} id="pills-Rejected" role="tabpanel" aria-labelledby="pills-Rejected-tab">
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
                                                            return <span className="all-status"><span className="status-indicator status-indicator-draft"></span> {row.original.status}</span>
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
                                            id={state.tab}    																					
                                            onFetchData={(state, instance) => {
                                                if(state.id === 'rejected'){
                                                    fetchData(state.page, state.pageSize, state.sorted, state.filtered, state.id);
                                                }
                                            }}
                                        />                                
                                    </div>
                                    <div className={`tab-pane fade  ${(state.tab === 'jobOffer') && "show active"}`} id="pills-Job-offer-and-contract" role="tabpanel" aria-labelledby="pills-Job-offer-and-contract-tab">
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
                                                            return <span className="all-status"><span className="status-indicator status-indicator-draft"></span> {row.original.status}</span>
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
                                            id={state.tab}    																					
                                            onFetchData={(state, instance) => {
                                                if(state.id === 'jobOffer'){
                                                    fetchData(state.page, state.pageSize, state.sorted, state.filtered, state.id);
                                                }
                                            }}
                                        />                                
                                    </div>                                                                                                                                            
                                </div> 
                            </div>

                        </div>
                    </div>
                </div>    

                <Modal show={model.modelShow} onHide={() => handleClose()} className="" centered >
                    <form className="resume-info" onSubmit={handleInterviewSchedule}>
                    <Modal.Header closeButton>
                        <Modal.Title>Schedule Interview</Modal.Title>
                    </Modal.Header>			
                    <Modal.Body>
                        <form className="">
                            <div className="row mb-2">
                                <div className="col-lg-6 col-md-6">
                                    <h6>Category</h6>
                                    <form className="resume-info">
                                    <div className="form-group">
                                        <div className="input-group date" id="">
                                        <input type="text" className="form-control" placeholder="Contact Number" disabled value={model.interview_category}/>
                                        </div>	
                                    </div>
                                    </form>                          
                                </div>
                            </div>
                            <div className="row mb-2">
                                <div className="col-lg-6 col-md-6">
                                    <h6>Interviewer</h6>
                                    <div className="form-group">
                                        <Select 
                                            placeholder="Select"
                                            name="interviewer_id"
                                            options={model.interviewerList}
                                            onChange={(value) => selectInterviewer('interviewer_id', value)} 
                                            value={model.interviewer_id}
                                            required
                                        />
                                    </div>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <h6>Interview day</h6>
                                    <form className="resume-info">
                                    <div className="form-group">
                                        <div className="input-group date" id="">
                                        <DatePicker
                                            selected={model.interview_date !== '' ? new Date(model.interview_date) : ''}
                                            onChange={(date) => handleDateChange('interview_date', date)}
                                            className="form-control mn_input post-job-boxes"
                                            dateFormat="yyyy-MM-dd"
                                            minDate={new Date()}
                                            dropdownMode="select"
                                            required
                                        />
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
                                        <DatePicker
                                            selected={model.interview_from_time}
                                            onChange={(date) => handleDateChange('interview_from_time', date)}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                            className="form-control"
                                            placeholder="12:30"
                                            required
                                        />
                                        </div>	
                                    </div>
                                    </form>
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <h6>To hours</h6>
                                    <form className="resume-info">
                                    <div className="form-group">
                                        <div className="input-group date" id="">
                                        <DatePicker
                                            selected={model.interview_to_time}
                                            minDate={model.interview_from_time}
                                            onChange={(date) => handleDateChange('interview_to_time', date)}
                                            showTimeSelect
                                            showTimeSelectOnly
                                            timeIntervals={15}
                                            timeCaption="Time"
                                            dateFormat="h:mm aa"
                                            className="form-control"
                                            placeholder="14:30"
                                            required
                                        />
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
                                    <input type="text" className="form-control" placeholder="Email Id" disabled value={model.interview_email} />
                                    </div>	
                                </div>
                                </form>                          
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <h6>Phone</h6>
                                <form className="resume-info">
                                <div className="form-group">
                                    <div className="input-group date" id="">
                                    <input type="text" className="form-control" placeholder="Contact Number" disabled value={model.interview_phone}/>
                                    </div>	
                                </div>
                                </form>                          
                            </div>                          
                            
                            </div>  

                            <div className="row">
                                <div className="col-lg-12">
                                    <h6>Note</h6>                          
                                    <div className="form-group">
                                    <textarea name="interview_note" onChange={handleChange} className="form-control" rows="4"></textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <button className="default-btn default-btn btn-two" onClick={() => handleClose()}>Close</button>
                    <button className="default-btn default-btn" disabled={loader}>Save</button>
                    </Modal.Footer>
                    </form>
                </Modal>
              </section>
              {/* End Freelancers List Area */}
            </div>
            // End Root Div
    )
}

export default withRouter(Freelancer);