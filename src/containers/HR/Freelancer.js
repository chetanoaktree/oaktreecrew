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
import { fetchFreelancers, deleteFreelancer } from '../../actions/hrActions';
import { fetchInterviewerByCategory, interviewSchedule, getInterviewSchedule, getInterviewScheduleDetail, interviewSchedulePut } from '../../actions/interviewerActions';
import profileImageThumbnail from "../../assets/images/profile.png"
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
        id: '',
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

    const reschedulehandleShow = (data) => {
        // console.log("data",data)

        dispatch(getInterviewScheduleDetail(data.id)).then((res)=> {
            if(res && res.status === 200) {
            //   console.log("res",res.interview_schedule)
              setModel(prevState => ({
                    ...prevState,
                    modelShow : true,
                    id: res.interview_schedule.id,
                    interviewer_id: res.interview_schedule.interviewer_id,
                    interview_date: res.interview_schedule.interview_date,
                    interview_from_time: res.interview_schedule.from_hours,
                    interview_to_time: res.interview_schedule.to_hours,
                    interview_uuid: res.interview_schedule.freelancer_id,
                    interview_email: res.interview_schedule.freelancer_email,
                    interview_phone: res.interview_schedule.freelancer_phone,
                    interview_category: res.interview_schedule.category,
                    interview_note: res.interview_schedule.note
              }))
            }
        })

        dispatch(fetchInterviewerByCategory(data.category)).then((res)=> {
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
        
        if(model.id){
            let data = { 
                interviewer_id: model.interviewer_id,
                interview_date: model.interview_date,
                from_hours: model.interview_from_time,
                to_hours: model.interview_to_time,
                freelancer_id: model.interview_uuid,
                category: model.interview_category,
                note: model.interview_note
            }
            dispatch(interviewSchedulePut(data, model.id)).then((res)=> {
                if(res && res.data.status === 200) {
                    NotificationManager.success("Successfully Reschedule interview", 'Success');
                    handleClose()
                    fetchDataInterview(state.page, state.pageSize, '', '', state.tab);
                }else{
                    NotificationManager.error(res.data.messages, 'Error');  
                }
            }) 
            
        }else{
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
                    fetchData(state.page, state.pageSize, '', '', state.tab);
                }else{
                    NotificationManager.error(res.data.messages, 'Error');  
                }
            }) 
        }
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
        if(tab === 'scheduled'){
            fetchDataInterview(0, 10, '', '', tab);
        }else{
            fetchData(0, 10, '', '', tab);
        }
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
    const fetchDataInterview = (page, pageSize, sorted, filtered, tab) => {
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
      dispatch(getInterviewSchedule(data)).then((res)=> {
          if(res && res.status === 200) {
            // console.log("res",res.data)
             setState(prevState => ({
                ...prevState,
                from_data: res.data.from_data,
                to_data: res.data.to_data,
                total_count: res.data.total_count,
                total_pages: res.data.total_pages,
                users: res.data.interview_schedules
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
    // console.log("interView",model)
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
                                        <a className="nav-link active" onClick={() => activeTab('all')} id="pills-all-tab" data-toggle="pill" href="#pills-all" role="tab" aria-controls="pills-all" aria-selected="true"><i class="bx bx-user"></i> All Freelancers <span className="tabs-counter-value">{state.tab === 'all' ? "("+state.total_count+")" : ""}</span> </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => activeTab('draft')} id="pills-draft-tab" data-toggle="pill" href="#pills-draft" role="tab" aria-controls="pills-draft" aria-selected="false"><i class="bx bx-edit"></i> Draft <span className="tabs-counter-value">{state.tab === 'draft' ? "("+state.total_count+")" : ""}</span> </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => activeTab('scheduled')} id="pills-scheduled-tab" data-toggle="pill" href="#pills-scheduling" role="tab" aria-controls="pills-scheduling" aria-selected="false"><i class="bx bx-calendar"></i> Interview Scheduled <span className="tabs-counter-value">{state.tab === 'scheduled' ? "("+state.total_count+")" : ""}</span> </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => activeTab('accepted')} id="pills-Accepted-tab" data-toggle="pill" href="#pills-Accepted" role="tab" aria-controls="pills-Interview" aria-selected="false"><i class="bx bx-like"></i> Ready To Work <span className="tabs-counter-value">{state.tab === 'accepted' ? "("+state.total_count+")" : ""}</span> </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => activeTab('rejected')} id="pills-Rejected-tab" data-toggle="pill" href="#pills-Rejected" role="tab" aria-controls="pills-Rejected" aria-selected="false"><i class="bx bx-block"></i> Rejected <span className="tabs-counter-value">{state.tab === 'rejected' ? "("+state.total_count+")" : ""}</span> </a>
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
                                                            return <span className="all-status"><span className={`status-indicator status-indicator-${row.original.status}`}></span> {row.original.status}</span>
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
                                                        Header: 'Created By',
                                                        accessor: 'created_at_name',
                                                        Cell: row => {
                                                            return <span>{row.original.created_by_name}</span>
                                                        }
                                                    },
                                                    {
                                                        Header: 'Last Updated By',
                                                        accessor: 'last_modefied_by_name',
                                                        Cell: row => {
                                                            return <span>{row.original.last_modified_by_name}</span>
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
                                                                    
                                                                    { row.original.status === 'draft' &&
                                                                        <>{localStorage.role === 'hr' && <a className="dropdown-item" href={"#"} onClick={() => {handleShow(row.original)}}>Schedule Interview</a>}</>
                                                                    }{/*
                                                                        <>{localStorage.role === 'hr' && <a className="dropdown-item" href={"#"} onClick={() => {reschedulehandleShow(row.original)}}>Reschedule Interview</a>}</>
                                                                    */} 
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
                                                        Header: 'Created By',
                                                        accessor: 'created_at_name',
                                                        Cell: row => {
                                                            return <span>{row.original.created_by_name}</span>
                                                        }
                                                    },
                                                    {
                                                        Header: 'Last Updated By',
                                                        accessor: 'last_modefied_by_name',
                                                        Cell: row => {
                                                            return <span>{row.original.last_modified_by_name}</span>
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
                                                        Header: () => (
                                                            <span>
                                                                <i className="fa-tasks" /> Freelancer Name
                                                            </span>
                                                        ),
                                                        accessor: 'freelancer_name',
                                                        Cell: row => {
                                                            return <>{row.original.freelancer_name}</>
                                                        }
                                                    },
                                                    {
                                                        Header: () => (
                                                            <span>
                                                                <i className="fa-tasks" /> Interviewer Name
                                                            </span>
                                                        ),
                                                        accessor: 'interviewer_name',
                                                        Cell: row => {
                                                            return <>{row.original.interviewer_name}</>
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
                                                            return <>{row.original.category}</>
                                                        }
                                                    },
                                                    {
                                                        Header: 'Interview Date',
                                                        accessor: 'interview_date',
                                                        Cell: row => {
                                                            return <span>{row.original.interview_date}</span>
                                                        }
                                                    },
                                                    {
                                                        Header: 'Interview Time',
                                                        accessor: 'created_at',
                                                        Cell: row => {
                                                            return <span>{row.original.interview_time}</span>
                                                        }
                                                    },
                                                    {
                                                        Header: 'Note',
                                                        accessor: 'created_at',
                                                        Cell: row => {
                                                            return <span>{row.original.note}</span>
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
                                                                                    {localStorage.role === 'hr' && <a className="dropdown-item" href={"#"} onClick={() => {reschedulehandleShow(row.original)}}>Reschedule Interview</a>}
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
                                                if(state.id === 'accepted'){
                                                    fetchData(state.page, state.pageSize, state.sorted, state.filtered, state.id);
                                                }
                                            }}
                                        />                                
                                    </div>
                                    <div className={`tab-pane fade  ${(state.tab === 'rejected') && "show active"}`} id="pills-Rejected" role="tabpanel" aria-labelledby="pills-Rejected-tab">
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
                                                if(state.id === 'rejected'){
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
                        <Modal.Title>{model.id ? "Reschedule Interview" : "Schedule Interview"}</Modal.Title>
                    </Modal.Header>			
                    <Modal.Body>
                        <form className="">
                        <div className="row">
                            <div className="col-lg-6 col-md-6">
                                <h6><i class="bx bxs-envelope"></i> Email</h6>
                                
                                <div className="form-group">
                                    <div className="input-group date" id="">
                                    <input type="text" className="form-control" placeholder="Email Id" disabled value={model.interview_email} />
                                    </div>	
                                </div>
                                                        
                            </div>
                            <div className="col-lg-6 col-md-6">
                                <h6><i class="bx bxs-phone"></i> Phone</h6>
                                <div className="form-group">
                                    <div className="input-group date" id="">
                                    <input type="text" className="form-control" placeholder="Contact Number" disabled value={model.interview_phone}/>
                                    </div>	
                                </div>
                                                        
                            </div>                          
                            
                            </div> 

                            <div className="row mb-2">
                                <div className="col-lg-6 col-md-6">
                                    <h6><i class="bx bxs-graduation"></i> Category</h6>
                                    
                                    <div className="form-group">
                                        <div className="input-group date" id="">
                                        <input type="text" className="form-control" placeholder="Contact Number" disabled value={model.interview_category}/>
                                        </div>	
                                    </div>                          
                                </div>
                                <div className="col-lg-6 col-md-6">
                                    <h6><i class="bx bxs-user"></i> Interviewer</h6>
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

                            </div>
                            <div className="row mb-2">
                                <div className="col-lg-4 col-md-4">
                                    <h6><i class="bx bxs-calendar"></i> Interview day</h6>
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
                                    
                                </div>
                                
                                <div className="col-lg-4 col-md-4">
                                    <h6><i class="bx bxs-watch"></i> From hours</h6>
                                    <div className="form-group">
                                        <div className="input-group date" id="">
                                        <DatePicker
                                            selected={model.interview_from_time !== '' ? new Date(model.interview_from_time) : ''}
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
                                </div>
                                
                                <div className="col-lg-4 col-md-4">
                                    <h6><i class="bx bxs-watch"></i> To hours</h6>
                                    <div className="form-group">
                                        <div className="input-group date" id="">
                                        <DatePicker
                                            selected={model.interview_to_time !== '' ? new Date(model.interview_to_time) : ''}
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
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-lg-12">
                                    <h6><i class="bx bxs-pencil"></i> Note</h6>                          
                                    <div className="form-group">
                                    <textarea name="interview_note" onChange={handleChange} className="form-control" rows="4">{model.interview_note}</textarea>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </Modal.Body>
                    <Modal.Footer>
                    <div className="default-btn default-btn btn-two" onClick={() => handleClose()}>Close</div>
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