// Imports: Dependencies
import React from 'react';

import { NetInfo } from 'react-native';

// Imports: Screens
import Counter from './screens/Counter';

// Imports: Redux Persist Persister
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './store/store';

import Reactotron from 'reactotron-react-native';

// React Native: App
class App extends React.Component {
  
  componentDidMount() {

    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
    NetInfo.isConnected.fetch().then((isConnected) => {
      console.log("isConnected", isConnected);
      store.dispatch({
        type: isConnected ? 'ONLINE' : 'OFFLINE'
      });
    });

    if (__DEV__) {
      // Reactotron can be used to see AsyncStorage data and API requests
      // If Reactotron gets no connection, this is the solution that worked for me (cairocoder01: 2019-08-15)
      // https://github.com/expo/expo-cli/issues/153#issuecomment-358925525
      // May need to then run this before `npm start`: `adb reverse tcp:9090 tcp:9090`
      Reactotron
        .configure() // controls connection & communication settings
        .useReactNative() // add all built-in react native plugins
        .connect(); // let's connect!
    }
  }

  componentWillUnmount() {
    // remove network connectivity handler
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = (isConnected) => {
    console.log("isConnected", isConnected);
    // dispatch network connectivity action
    store.dispatch({
      type: isConnected ? 'ONLINE' : 'OFFLINE'
    });
  }

  render() {
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
  }

}

export default App;