import queryString from 'query-string';
import * as types from './actionTypes';

const baseUrl = 'http://localhost:8000/';

function fetchUsersSuccess({ list, pagination }) {
  return {
    type: types.FETCH_USERS_SUCCESS,
    list,
    pagination
  };
};

function fetchPaginatedUsersSuccess({ list, pagination }) {
  return {
    type: types.FETCH_PAGINATED_USERS_SUCCESS,
    list,
    pagination
  };
}

function fetchUsersFailed(err) {
  alert(err);
};

function fetchUsers(params) { 
  let apiUrl = `${baseUrl}users/`;
  
  if (!!params && Object) {
    let stringified = queryString.stringify(params);
    apiUrl = !!stringified ? `${apiUrl}?${stringified}` : apiUrl;
  }

  return dispatch => { 
    return fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Accept': 'application/json',
        "Authorization": "Basic aWdldmNodWs6Um9vdDEyMzQ="
      }
    })
      .then(response => response.json())
      .then(json => {
        if (!!json && !!json.results) {
          const payload = normalizeUsersData(json);

          if (!!params.page) {
            dispatch(fetchPaginatedUsersSuccess(payload))
          } else {
            dispatch(fetchUsersSuccess(payload));
          }
        }
      })
      .catch(err => fetchUsersFailed(err))
  };
};

function normalizeUsersData(data) {
  const { results, ...pagination } = data;
  return { list: results, pagination };
}

export {
  fetchUsers,
  fetchUsersSuccess,
  fetchUsersFailed
};