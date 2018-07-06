import { combineReducers } from 'redux';
import usersReducer from './usersReducer';

const rootReducer = combineReducers({
  usersData: usersReducer
});

export default rootReducer;