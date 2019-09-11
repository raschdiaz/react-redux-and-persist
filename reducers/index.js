// Imports: Dependencies
import { combineReducers } from 'redux';

// Imports: Reducers
import authReducer from './authReducer';
import counterReducer from './counterReducer';
import roleReducer from './roleReducer';

// Redux: Root Reducer
const rootReducer = combineReducers({
  authReducer,
  counterReducer,
  roleReducer
});

// Exports
export default rootReducer;