import initialState from './initialState';
import {
  FETCH_USER,
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED
} from '../actions/actionTypes';

export default function usersReducer(state = initialState.user, action) {
  switch (action.type) {
    case FETCH_USER:
      console.log('FETCH_USER action');
      return action;
    case FETCH_USER_SUCCESS:
      console.log('FETCH_USER_SUCCESS action');
      return action.payload;
    case FETCH_USER_FAILED:
      console.log('FETCH_USER_FAILED action');
      return action;
    default:
      return state;
  };
};