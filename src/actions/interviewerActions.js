import axios from 'axios';
import { applicationIsLoading } from './applicationActions';
import {REACT_API_URL} from '../constants/env.js'


export function fetchInterviewerByCategory(data) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_API_URL + `/api/v1/users/interviewer_list?category=${data}`  
    })
    .then((response) => {
        if((response.status !== 200) || (response.data.status === 404)) {
          // throw Error(response.statusText);
          return response.data;
        } else {
          return response.data
        }
      }
    )
    .then(freelancer => {
      dispatch(applicationIsLoading(false));
      // dispatch(freelancerFetchSuccess(freelancer));
      return freelancer
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}


export function interviewSchedule(dataSend) {
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + `/api/v1/interview_schedules`, dataSend)
      .then(res => {
        dispatch(applicationIsLoading(false));
        if (res.status === 200) {
          return res;
        }
      }).catch((err) => {
        dispatch(applicationIsLoading(false));
        return err.response
      });
  } 
}


export function getInterviewSchedule(data) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_API_URL + `/api/v1/interview_schedules${data}`  
    })
    .then((response) => {
        if((response.status !== 200) || (response.data.status === 404)) {
          // throw Error(response.statusText);
          return response.data;
        } else {
          return response.data
        }
      }
    )
    .then(freelancer => {
      dispatch(applicationIsLoading(false));
      // dispatch(freelancerFetchSuccess(freelancer));
      return freelancer
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}

export function getInterviewScheduleDetail(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_API_URL + `/api/v1/interview_schedules/${id}`  
    })
    .then((response) => {
        if((response.status !== 200) || (response.data.status === 404)) {
          // throw Error(response.statusText);
          return response.data;
        } else {
          return response.data
        }
      }
    )
    .then(freelancer => {
      dispatch(applicationIsLoading(false));
      // dispatch(freelancerFetchSuccess(freelancer));
      return freelancer
    })
    .catch((error) => {
      dispatch(applicationIsLoading(false));
      console.log(error)
      return error
    })
  }
}