import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import * as userReducer from './userReducer';

const rootReducer = combineReducers({
  usersData: usersReducer,
  user: userReducer.user,
  userIsLoading: userReducer.isLoading,
  userErrors: userReducer.errors,
  userIsUpdating: userReducer.isUpdating,
  saveUserErrors: userReducer.saveErrors
});

export default rootReducer;