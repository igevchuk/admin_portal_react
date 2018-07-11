import initialState from './initialState';
import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAILED,
  IS_LOADING_USER,
  IS_UPDATING_USER,
  SAVE_USER_FAILED
} from '../actions/actionTypes';

export function user(state = initialState.user, action) {
  switch (action.type) {
    case FETCH_USER_SUCCESS:
      console.log('FETCH_USER_SUCCESS action');      
      return action.payload;
    default:
      return state;
  }
}

export function isLoading(state = initialState.userIsLoading, action) {
  switch (action.type) {
    case IS_LOADING_USER:
      console.log('IS_LOADING_USER action');
      return action.payload;
    default:
      return state;
  }
}

export function errors(state = initialState.userErrors, action) {
  switch (action.type) {
    case FETCH_USER_FAILED:
      console.log('FETCH_USER_FAILED action');      
      return action.payload;
    default:
      return state;
  }
}

export function isUpdating(state = initialState.userIsSaving, action) {
   switch (action.type) {
     case IS_UPDATING_USER:
       console.log('IS_UPDATING_USER action');
       return action.payload;
     default:
       return state;
   }
}

export function saveErrors(state = initialState.saveUserErrors, action) {
  switch (action.type) {
    case SAVE_USER_FAILED:
      console.log('SAVE_USER_FAILED action');
      return action.payload;
    default:
      return state;
  }
}