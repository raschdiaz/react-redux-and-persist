import {
    put, take, takeLatest, all,
  } from 'redux-saga/effects';
  
  export function* getRole() {
    yield put({ type: "ROLE_GET_START" });
  
    try {
      let response = {
        status: 200,
        payload: {
          id: 1,
          name: "Role 1",
        }
      };
      yield put({ type: "ROLE_GET_SUCCESS", response });
    } catch (error) {
      yield put({
        type: "ROLE_GET_FAILURE",
        error: {
          code: '400',
          message: 'Unable to process the request. Please try again later.',
        },
      });
    }
  }
  
  export default function* rolesSaga() {
    yield all([takeLatest("ROLE_GET", getRole)]);
  }
  