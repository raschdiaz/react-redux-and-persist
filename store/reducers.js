// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import authReducer from './reducers/authReducer';
import counterReducer from './reducers/counterReducer';
import roleReducer from './reducers/roleReducer';
import requestReducer from './reducers/requestReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  requestReducer,
  authReducer,
  counterReducer,
  roleReducer
});

// Exports
export default rootReducer;