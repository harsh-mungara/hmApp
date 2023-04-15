import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {LogBox} from 'react-native';
import AppNavigator from './src/AppNavigator';
import {Provider} from 'react-redux';
import {applyMiddleware, legacy_createStore as createStore} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import Reducers from './src/reducers/Reducers';
LogBox.ignoreAllLogs();

const store = createStore(Reducers, applyMiddleware(thunk, logger));
class App extends Component {
  async componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <AppNavigator />
      </Provider>
    );
  }
}

export default App;
