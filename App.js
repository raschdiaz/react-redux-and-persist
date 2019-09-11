// Imports: Dependencies
import React from 'react';

// Imports: Screens
import Counter from './screens/Counter';

// Imports: Redux Persist Persister
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './store/store';

// React Native: App
export default App = () => {
  return (
    // Redux: Global Store
    <Provider store={store}>
      <PersistGate 
        loading={null}
        persistor={persistor}
      >
        <Counter />
      </PersistGate>
    </Provider>
  );
};