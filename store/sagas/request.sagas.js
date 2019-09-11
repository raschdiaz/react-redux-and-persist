import {
  take, fork, call, put, race, delay, actionChannel, select,
} from 'redux-saga/effects';

const REQUEST_TIMEOUT_MILLIS = 4000;

function* sendRequest(url, data) {
  const request = yield fetch(url, data)
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response;
      }
      throw response;
    })
    .then(response => response.json())
    .then(response => ({
      status: 200,
      data: response,
    }))
    .catch((error) => {
      if (typeof error.json === 'function') {
        return error.json().then(errorJSON => ({
          status: errorJSON.data.status,
          data: {
            code: errorJSON.code,
            message: errorJSON.message,
          },
        }));
      }
      return {
        status: 400,
        data: {
          code: 400,
          message: error.toString(),
        },
      };
    });
  return request;
}

function* processRequest(request) {
  const { response, timeout } = yield race({
    response: call(sendRequest, request.url, request.data),
    timeout: delay(REQUEST_TIMEOUT_MILLIS),
  });
  if (response) {
    if (request.action) {
      yield put({ type: request.action, payload: response });
    }
    // Dispatch action 'RESPONSE' to remove request from queue
    yield put({ type: 'RESPONSE', payload: request });
  } else if (timeout) {
    yield put({ type: 'OFFLINE' });
  }
}

export default function* requestSaga() {
  // buffer all incoming requests
  const requestChannel = yield actionChannel('REQUEST');
  // const offlineChannel = yield actionChannel('OFFLINE');
  while (true) {
    const { request } = yield race({
      request: take(requestChannel),
    });
    const queue = yield select(state => state.requestReducer.queue);
      for (const action of queue) {
        if (action === request.payload) {
          // process the request
          yield fork(processRequest, request.payload);
        }
      }

  }
}
