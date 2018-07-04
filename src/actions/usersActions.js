import * as types from './actionTypes';

const apiUrl = 'https://jsonplaceholder.typicode.com/users';

function fetchUsersSuccess(data) {
  return {
    type: types.FETCH_USERS_SUCCESS,
    users: data
  };
};

function fetchUsersFailed() {
  return {
    type: types.FETCH_USERS_FAILED
  };
};

function fetchUsers() { 
  return dispatch => { 
    return fetch(apiUrl, {
      method: 'GET',
        mode: 'cors',
        credentials: 'include',
        headers: {
          'Accept': 'application/json'
        }
    })
      .then(response => response.json())
      .then(json => dispatch(fetchUsersSuccess(json)))
      .catch(e => fetchUsersFailed(e))
  };
};

export {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailed
};