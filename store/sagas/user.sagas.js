import {
  put, take, takeLatest, all,
} from 'redux-saga/effects';

export function* login({ username, password }) {
  yield put({ type: "USER_LOGIN_START" });

  yield put({
    type: 'REQUEST',
    payload: {
      url: `https://dtappdemo.wpengine.com/wp-json/jwt-auth/v1/token`,
      data: {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      },
      action: "USER_LOGIN_RESPONSE",
    },
  });

  try {
    let response = yield take('USER_LOGIN_RESPONSE');
    console.log("USER_LOGIN_RESPONSE", response)
    response = response.payload;
    const jsonData = response.data;
    if (response.status === 200) {
      yield put({ type: 'USER_LOGIN_SUCCESS', response: jsonData });
    } else {
      yield put({
        type: actions.USER_LOGIN_FAILURE,
        error: {
          code: jsonData.code,
          message: jsonData.message,
        },
      });
    }
  } catch (error) {
    console.log("error", error);
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
