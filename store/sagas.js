import { all/*, fork*/ } from 'redux-saga/effects';

import userSaga from './sagas/user.sagas';
import roleSaga from './sagas/roles.sagas';
import requestSaga from './sagas/request.sagas';
//import networkConnectivitySaga from './sagas/networkConnectivity.sagas';

export default function* rootSaga() {
  //yield fork(networkConnectivitySaga);
  yield all([
    requestSaga(),
    userSaga(),
    roleSaga(),
  ]);
}
