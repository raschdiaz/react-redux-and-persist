import { all } from 'redux-saga/effects';

import userSaga from './user.sagas';
import roleSaga from './roles.sagas';

export default function* rootSaga() {
  yield all([
    userSaga(),
    roleSaga(),
  ]);
}
