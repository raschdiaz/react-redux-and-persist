import {
  put, take, takeLatest, all,
} from 'redux-saga/effects';

export function* login({ username, password }) {
  console.log("username", username);
  console.log("password", password);
  yield put({ type: "USER_LOGIN_START" });

  try {
    let response = {
      status: 200,
      payload: {
        user: username,
        password
      }
    };
    yield put({ type: "USER_LOGIN_SUCCESS", response });
  } catch (error) {
    yield put({
      type: "USER_LOGIN_FAILURE",
      error: {
        code: '400',
        message: 'Unable to process the request. Please try again later.',
      },
    });
  }
}

export default function* userSaga() {
  yield all([takeLatest("USER_LOGIN", login)]);
}
