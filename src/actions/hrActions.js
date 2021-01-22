import axios from 'axios';
import { applicationIsLoading } from './applicationActions';
import {REACT_API_URL} from '../constants/env.js'

export function saveFreelancer(dataSend) {
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + `/api/v1/users`, dataSend)
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

export function updateFreelancer(dataSend, id) {
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.put(REACT_API_URL + `/api/v1/users/${id}`, dataSend)
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

export function getFreelancer(uuid) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_API_URL + `/api/v1/users/`+ uuid
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


export function fetchFreelancerByCategory(data) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "post",
      url: REACT_API_URL + `/api/v1/users/search_by_category`,
      data: data 
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


export function deleteFreelancer(uuid) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "delete",
      url: REACT_API_URL + `/api/v1/users/`+ uuid
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

export function removeFromFreelancer(url) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "delete",
      url: REACT_API_URL + url
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


export function saveLeads(dataSend) {
  return dispatch => {
    dispatch(applicationIsLoading(true));
    return axios.post(REACT_API_URL + `/api/v1/clients`, dataSend)
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

export function fetchLeads(data) {
  return (dispatch) => {
    dispatch(applicationIsLoading(true));
    return axios({
      method: "get",
      url: REACT_API_URL + `/api/v1/clients`+ data
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
