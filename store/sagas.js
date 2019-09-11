import { all } from 'redux-saga/effects';

import userSaga from './sagas/user.sagas';
import roleSaga from './sagas/roles.sagas';
import requestSaga from './sagas/request.sagas';

export default function* rootSaga() {
  yield all([
    requestSaga(),
    userSaga(),
    roleSaga(),
  ]);
}
