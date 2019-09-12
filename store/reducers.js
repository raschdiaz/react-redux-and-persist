// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import authReducer from './reducers/authReducer';
import counterReducer from './reducers/counterReducer';
import roleReducer from './reducers/roleReducer';
import requestReducer from './reducers/requestReducer';
import networkConnectivityReducer from './reducers/networkConnectivityReducer'

// Redux: Root Reducer
const rootReducer = combineReducers({
  networkConnectivityReducer,
  requestReducer,
  authReducer,
  counterReducer,
  roleReducer
});

// Exports
export default rootReducer;