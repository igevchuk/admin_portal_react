import initialState from './initialState';
import {
  FETCH_USERS,
  FETCH_USERS_SUCCESS,
  FETCH_PAGINATED_USERS_SUCCESS,
  FETCH_USERS_FAILED,
  PAGINATE_USERS
} from '../actions/actionTypes';

export default function usersReducer(state = initialState.users, action) {
  switch (action.type) {
    case FETCH_USERS:
      console.log('FETCH_USERS action');
      return action;
    case FETCH_USERS_SUCCESS:
      console.log('FETCH_USERS_SUCCESS action');
      const {
        type,
        ...rest
      } = action;

      return rest;
    case FETCH_PAGINATED_USERS_SUCCESS:
      console.log('FETCH_PAGINATED_USERS_SUCCESS action');
      return {
        list: [ ...state.list, ...action.list ],
        pagination: action.pagination
      }
    case FETCH_USERS_FAILED:
      console.log('FETCH_USERS_FAILED action');
      return action;
    default:
      return state;
  };
};