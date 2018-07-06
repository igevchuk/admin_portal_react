import * as types from './actionTypes';

function fetchUserSuccess(payload) {
  return {
    type: types.FETCH_USER_SUCCESS,
    payload
  };
};

function fetchUserFailed(err) {
  alert(err);
};

function fetchUser(url) {

  return dispatch => {
    return fetch(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          "Authorization": "Basic aWdldmNodWs6Um9vdDEyMzQ="
        }
      })
      .then(response => response.json())
      .then(json => {
        if (!!json) {
          dispatch(fetchUserSuccess(json));
        }
      })
      .catch(err => fetchUserFailed(err))
  };
};

export {
  fetchUser,
  fetchUserSuccess,
  fetchUserFailed
};