import { combineReducers } from 'redux';

import { applicationIsLoading, userData } from './reducers/applicationReducer';
import { actionData } from './reducers/settingReducer';
import {auth} from './reducers/auth';

export default combineReducers({
  applicationIsLoading,
  auth,
  userData,
  actionData
});
