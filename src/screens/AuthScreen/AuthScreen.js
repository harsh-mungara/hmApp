import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from 'react-native';
import Firebase from '../../config/Firebase';
import firebase from 'firebase/compat/app';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PushNotification from 'react-native-push-notification';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../utils/colors';

export default class AuthScreen extends React.Component {
  state = {
    email: '',
    password: '',
    isLoading: false,
  };

  handleLogin = () => {
    this.setState({isLoading: true});
    Firebase.auth()
      .signInWithEmailAndPassword(this.state.email, this.state.password)
      .then(async res => {
        let userId = res.user.uid;
        const auth = firebase.auth().currentUser;
        // firebase.firestore().collection('users').doc(userId).set({
        //   email: this.state.email,
        //   uid: userId
        // })
        console.log('current user : ', auth);
        const user = {
          ['email']: res.user.email,
          ['userId']: res.user.uid,
        };
        AsyncStorage.setItem('userData', JSON.stringify(user));
        const storeData = await AsyncStorage.getItem('userData');
        const getItem = JSON.parse(storeData);
        this.props.navigation.reset({
          index: 0,
          routes: [{name: 'DrawerScreen'}],
        });
        this.getNotification();
      })
      .catch(error => {
        console.log({error});
        Alert.alert('Please Sign Up');
      });
  };

  getNotification = async index => {
    PushNotification.localNotification({
      autoCancel: true,
      bigText: 'Congratulations, Your signin has been done.',
      subText: 'Local Notification Demo',
      title: 'Welcome on board again dude! You are all set to go now.',
      message: 'Expand me to see more',
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
      actions: '["Yes", "No"]',
      channelId: '123',
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi3BmGBVk6AshoiBA4TrUUIEoSyTGj4iY9MA&usqp=CAU',
          }}
          style={styles.sideMenuProfileIcon}
        />
        <Text style={styles.logo}>{'H&M App'}</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({email: text})}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({password: text})}
          />
        </View>
        <TouchableOpacity
          onPress={() =>
            Alert.alert('Contact app admin for account related service!')
          }>
          <Text style={styles.forgot}>{'Forgot Password?'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.handleLogin()}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>{'LOGIN'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('SignUpScreen')}>
          <Text style={styles.loginText}>{'Signup'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.black,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: wp(11),
    color: '#fb5b5a',
    marginBottom: hp(5),
  },
  inputView: {
    width: '80%',
    backgroundColor: colors.themBlueColor1,
    borderRadius: wp(10),
    height: hp(6),
    marginBottom: hp(3),
    justifyContent: 'center',
    padding: wp(5),
  },
  inputText: {
    height: hp(6),
    color: colors.black,
  },
  forgot: {
    color: 'white',
    fontSize: wp(4),
    marginBottom: hp(8),
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: wp(10),
    height: hp(6),
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: hp(5),
    marginBottom: hp(2),
  },
  loginText: {
    color: 'white',
  },
  sideMenuProfileIcon: {
    resizeMode: 'contain',
    width: wp(50),
    height: hp(15),
    borderRadius: 15,
    alignSelf: 'center',
    marginVertical: hp(2),
  },
});
