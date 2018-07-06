import { combineReducers } from 'redux';
import usersReducer from './usersReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  usersData: usersReducer,
  user: userReducer
});

export default rootReducer;