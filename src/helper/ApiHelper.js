import {Alert} from 'react-native';
import Axios from 'axios';

export async function get(url, headers, callback) {
  console.log('Get Call = ' + url);
  try {
    const response = await Axios.get(url, {headers: headers});
    console.log('response from get method = ', response);
    return callback(response);
  } catch (error) {
    if (error.message === 'Network Error') {
      Alert.alert(
        'Try Again !!!',
        'Check your internet connection !!!',
        [{text: 'OK'}],
        {cancelable: false},
      );
    } else {
      Alert.alert('Failure', error.message);
    }
    return callback(error.response);
  }
}

export async function post(url, params, headers, callback) {
  console.log('Post Call = ' + url, {headers: headers});
  console.log('Post Params = ', params);
  try {
    const response = await Axios.post(url, params, {headers: headers});
    console.log('response from post method = ', response);
    return callback(response);
  } catch (error) {
    if (error.message === 'Network Error') {
      Alert.alert(
        'Try Again !!!',
        'Check your internet connection !!!',
        [{text: 'OK'}],
        {cancelable: false},
      );
    } else {
      Alert.alert('Failure', error.message);
    }
    return callback(error.response);
  }
}
