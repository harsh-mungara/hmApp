import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {LogBox} from 'react-native';
import AppNavigator from './src/AppNavigator';
LogBox.ignoreAllLogs();
class App extends Component {
  async componentDidMount() {}

  render() {
    return <AppNavigator />;
  }
}

export default App;
