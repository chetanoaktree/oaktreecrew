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

