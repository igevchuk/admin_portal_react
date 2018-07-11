import * as types from './actionTypes';

function userDataIsLoading(payload) {
  return {
    type: types.IS_LOADING_USER,
    payload
  }
}

function fetchUserSuccess(payload) {
  return {
    type: types.FETCH_USER_SUCCESS,
    payload
  };
};

function fetchUserFailed(payload) {
  return {
    type: types.FETCH_USERS_FAILED,
    payload
  };
};

function fetchUser(url) {

  return dispatch => {
    dispatch(userDataIsLoading(true));

    fetch(url, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json',
          "Authorization": "Basic aWdldmNodWs6Um9vdDEyMzQ="
        }
      })
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        dispatch(userDataIsLoading(false));

        return response;
      })
      .then(response => response.json())
      .then(json => dispatch(fetchUserSuccess(json)))
      .catch((err) => dispatch(fetchUserFailed(err)))
  };
};

function userDataIsUpdating(payload) {
  return {
    type: types.IS_UPDATING_USER,
    payload
  };
}

function saveUserSuccess(payload) {
  return {
    type: types.SAVE_USER_SUCCESS,
    payload
  };
}

function saveUserFailed(payload) {
  console.log(payload)
  return {
    type: types.SAVE_USER_FAILED,
    payload
  };
}

function saveUser(formData, url) {
  if (!!formData && !!url) {
    return dispatch => {
      dispatch(userDataIsUpdating(true));

      fetch(url, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json; charset=utf-8',
            'Accept': 'application/json',
            "Authorization": "Basic aWdldmNodWs6Um9vdDEyMzQ="
          },
          body: JSON.stringify(formData)
        })
        .then(response => {
          dispatch(userDataIsUpdating(false));

          return response;
        })
        .then(response => {
          if (!response.ok) {
            throw Error(response);
          }
          return response.json();
        })
        .then(json => dispatch(saveUserSuccess(json)))
        .catch(err => dispatch(saveUserFailed(err)))
    }
  }
}

function createUser(formData) {
  const baseUrl = 'http://localhost:8000/users';
  const url = `${baseUrl}/create/`;

  return dispatch => {
    return fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          "Authorization": "Basic aWdldmNodWs6Um9vdDEyMzQ="
        },
        body: JSON.stringify(formData)
      })
      .then(response => {
        if (!response || !response.status || response.status !== 200) {
          throw new Error(response.json())
        } else {

        }
        return response.json();
      })
      .then(json => {
        dispatch(saveUserSuccess(json))
      })
      .catch(err => saveUserFailed(err));
  }
}

function resetUser() {
  return {
    type: types.RESET_USER
  };
}

export {
  fetchUser,
  userDataIsLoading,
  fetchUserSuccess,
  fetchUserFailed,
  saveUser,
  saveUserSuccess,
  saveUserFailed,
  createUser,
  resetUser
}