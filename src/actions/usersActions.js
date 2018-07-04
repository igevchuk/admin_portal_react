import queryString from 'query-string';
import * as types from './actionTypes';

const baseUrl = 'http://localhost:8000/';

function fetchUsersSuccess(data) {
  return {
    type: types.FETCH_USERS_SUCCESS,
    users: data
  };
};

function fetchUsersFailed(err) {
  alert(err);
};

function fetchUsers(params) { 
  let apiUrl = `${baseUrl}users/`;
  
  if (!!params) {
    apiUrl = `${apiUrl}?${queryString.stringify(params)}`;
  }

  return dispatch => { 
    return fetch(apiUrl, {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Accept': 'application/json',
        'X-CSRFToken': '8JBL76lbPerfQbwQ06wTYhw7GrxXalk7RDKzxZe26fQtU8oxTGhoDPb1qPkQoa9g'
      }
    })
      .then(response => response.json())
      .then(json => {
        if (!!json && !!json.results) {
          dispatch(fetchUsersSuccess(json.results))
        }
      })
      .catch(err => fetchUsersFailed(err))
  };
};

// function paginateUsers() {
//   return {
//     type: 
//   }
// }

export {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailed
};