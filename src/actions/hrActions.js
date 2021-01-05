import axios from 'axios';
import { applicationIsLoading } from './applicationActions';
import {REACT_API_URL} from '../constants/env.js'

export function saveFreelancer(dataSend) {
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + `/api/v1/users`, dataSend)
      .then(res => {
        // dispatch(saveHunterAction(res))
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


// export function freelancerFetchSuccess(freelancer) {
//   return {
//     type: CAMPAIGN_FETCH_SUCCESS,
//     freelancer
//   }
// }

export function fetchFreelancers(data) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_API_URL + `/api/v1/users`+ data
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

export function getFreelancer(id) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_API_URL + `/api/v1/users/`+ id
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