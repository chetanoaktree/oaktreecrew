import React, { useState, useEffect } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux'
import { withRouter } from "react-router-dom";
import {NotificationManager} from 'react-notifications';
import _ from 'lodash';
import ReactTable from 'react-table-v6'
// import TableListingLoader from "../../components/Loader/Skelton"
import { fetchFreelancers, deleteFreelancer } from '../../actions/hrActions';
import profileImageThumbnail from "../../assets/images/profile.png"
// import Tabs from 'react-responsive-tabs';
// import { Modal } from 'react-bootstrap';


function Users(props) {

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
        role_name: 'hr',
        tab: 'hr'
    })

    const dispatch = useDispatch();
    
    useEffect(() => {
      // fetchData();
    }, []);

    const fetchData = (page, pageSize, sorted, filtered, tab) => {
    //   console.log(page, pageSize, sorted, filtered)
      let data = `?page_number=${page+1}&per_page=${pageSize}&role_name=${tab}`
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

    const activeTab = (tab) => {
        setState(prevState => ({
            ...prevState,
            tab: tab,
            total_count: ""
        }))
        fetchData(0, 10, '', '', tab);
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
                                  <h2>Users</h2>                    
                              </div>
                              <div className="col-md-6">
                                <a href="/adduser" className="default-btn float-right">
                                        Add New
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
                                        <a className="nav-link active" onClick={() => activeTab('hr')} id="pills-hr-tab" data-toggle="pill" href="#pills-hr" role="tab" aria-controls="pills-hr" aria-selected="false"><i class="bx bxs-user"></i> HR <span className="tabs-counter-value">{state.tab === 'hr' ? "("+state.total_count+")" : ""}</span> </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-interviewer-tab" onClick={() => activeTab('interviewer')} data-toggle="pill" href="#pills-interviewer" role="tab" aria-controls="pills-interviewer" aria-selected="false"><i class="bx bxs-microphone"></i> Interviewer <span className="tabs-counter-value">{state.tab === 'interviewer' ? "("+state.total_count+")" : ""}</span> </a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" id="pills-maker-tab" onClick={() => activeTab('matchmaker')} data-toggle="pill" href="#pills-maker" role="tab" aria-controls="pills-maker" aria-selected="false"><i class="bx bx-transfer"></i> Match Maker <span className="tabs-counter-value">{state.tab === 'matchmaker' ? "("+state.total_count+")" : ""}</span> </a>
                                    </li>                                                                                                             
                                </ul>
                                <div className="tab-content" id="pills-tabContent">
                                    <div className="tab-pane fade show active" id="pills-hr" role="tabpanel" aria-labelledby="pills-hr-tab">
                                      
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
                                                                <i className="fa-tasks" /> First Name
                                                            </span>
                                                        ),
                                                        accessor: 'first_name',
                                                        Cell: row => {
                                                            return <a><img src={row.original.user_image ? row.original.user_image : profileImageThumbnail} className="freelancers-list-profile-thumbnail" /> {row.original.first_name}</a>
                                                        }
                                                    },
                                                    {
                                                        Header: () => (
                                                            <span>
                                                                <i className="fa-tasks" /> Last Name
                                                            </span>
                                                        ),
                                                        accessor: 'last_name',
                                                        Cell: row => {
                                                            return <a> {row.original.last_name}</a>
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
                                                                                    <a className="dropdown-item" href={"/edituser/"+row.original.uuid}>Edit</a>
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
                                                if(state.id === 'hr'){
                                                    fetchData(state.page, state.pageSize, state.sorted, state.filtered, state.id);
                                                }
                                            }}
                                        />
                                    </div>
                                    <div className="tab-pane fade" id="pills-interviewer" role="tabpanel" aria-labelledby="pills-interviewer-tab">
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
                                                            <i className="fa-tasks" /> First Name
                                                        </span>
                                                    ),
                                                    accessor: 'first_name',
                                                    Cell: row => {
                                                        return <a><img src={row.original.user_image ? row.original.user_image : profileImageThumbnail} className="freelancers-list-profile-thumbnail" /> {row.original.first_name}</a>
                                                    }
                                                },
                                                {
                                                    Header: () => (
                                                        <span>
                                                            <i className="fa-tasks" /> Last Name
                                                        </span>
                                                    ),
                                                    accessor: 'last_name',
                                                    Cell: row => {
                                                        return <a> {row.original.last_name}</a>
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
                                                        return <a>{_.get(row.original.additional_information, 'category', [''])} </a>
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
                                                                                <a className="dropdown-item" href={"/edituser/"+row.original.uuid}>Edit</a>
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
                                                if(state.id === 'interviewer'){
                                                    fetchData(state.page, state.pageSize, state.sorted, state.filtered, state.id);
                                                }
                                            }}

                                        />
                                    </div> 
                                    <div className="tab-pane fade" id="pills-maker" role="tabpanel" aria-labelledby="pills-maker-tab">
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
                                                            <i className="fa-tasks" /> First Name
                                                        </span>
                                                    ),
                                                    accessor: 'first_name',
                                                    Cell: row => {
                                                        return <a><img src={row.original.user_image ? row.original.user_image : profileImageThumbnail} className="freelancers-list-profile-thumbnail" /> {row.original.first_name}</a>
                                                    }
                                                },
                                                {
                                                    Header: () => (
                                                        <span>
                                                            <i className="fa-tasks" /> Last Name
                                                        </span>
                                                    ),
                                                    accessor: 'last_name',
                                                    Cell: row => {
                                                        return <a> {row.original.last_name}</a>
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
                                                        return <a> {_.get(row.original.additional_information, 'category', [''])}</a>
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
                                                                                <a className="dropdown-item" href={"/edituser/"+row.original.uuid}>Edit</a>
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
                                                if(state.id === 'matchmaker'){
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

export default withRouter(Users);