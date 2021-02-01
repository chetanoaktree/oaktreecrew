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
import { getInterviews } from '../../actions/interviewerActions';
import profileImageThumbnail from "../../assets/images/profile.png"
import { Modal } from 'react-bootstrap';


function Interview(props) {

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
        tab: 'scheduled' 
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
      dispatch(getInterviews(data)).then((res)=> {
          if(res && res.status === 200) {
            // console.log("res",res.data)
             setState(prevState => ({
                ...prevState,
                from_data: res.data.from_data,
                to_data: res.data.to_data,
                total_count: res.data.total_count,
                total_pages: res.data.total_pages,
                users: res.data.interviews
            }))
          }
      })
    }

    const loader = useSelector(state => (state.applicationIsLoading), shallowEqual)
    // console.log("state.users",loader)

    
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
                                  <h2>Interviews</h2>                    
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
                                        <a className="nav-link active" onClick={() => activeTab('scheduled')} id="pills-scheduled-tab" data-toggle="pill" href="#pills-scheduling" role="tab" aria-controls="pills-scheduling" aria-selected="false"><i class="bx bx-calendar"></i> Interview Scheduled <span className="tabs-counter-value">{state.tab === 'scheduled' ? "("+state.total_count+")" : ""}</span> </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => activeTab('accepted')} id="pills-Accepted-tab" data-toggle="pill" href="#pills-Accepted" role="tab" aria-controls="pills-Interview" aria-selected="false"><i class="bx bx-like"></i> Accepted <span className="tabs-counter-value">{state.tab === 'accepted' ? "("+state.total_count+")" : ""}</span> </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" onClick={() => activeTab('rejected')} id="pills-Rejected-tab" data-toggle="pill" href="#pills-Rejected" role="tab" aria-controls="pills-Rejected" aria-selected="false"><i class="bx bx-block"></i> Rejected <span className="tabs-counter-value">{state.tab === 'rejected' ? "("+state.total_count+")" : ""}</span> </a>
                                    </li>                                                                                                             
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                   
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
                                                            return (<a href={`/freelancer-interview/${row.original.freelancer_uuid}`}> {row.original.freelancer_name}</a>)
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
                                                            return (<a href={`/freelancer-interview/${row.original.freelancer_uuid}`}> {row.original.freelancer_name}</a>)
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
                                                                <i className="fa-tasks" /> Freelancer Name
                                                            </span>
                                                        ),
                                                        accessor: 'freelancer_name',
                                                        Cell: row => {
                                                            return (<a href={`/freelancer-interview/${row.original.freelancer_uuid}`}> {row.original.freelancer_name}</a>)
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

               
              </section>
              {/* End Freelancers List Area */}
            </div>
            // End Root Div
    )
}

export default withRouter(Interview);