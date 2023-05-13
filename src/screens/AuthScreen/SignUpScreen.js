import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
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
import {Image} from 'react-native';

export default class SignUpScreen extends React.Component {
  state = {
    email: '',
    password: '',
    cPassword: '',
    isLoading: false,
  };

  componentDidMount() {
    PushNotification.createChannel(
      {
        channelId: '123',
        channelName: 'Harsh Demo',
        channelDescription: 'A channel to categorise your notifications',
        playSound: false,
        soundName: 'default',
        importance: 4,
        vibrate: true,
      },
      created => console.log(`createChannel returned '${created}'`),
    );
  }

  handleSignUp = () => {
    this.setState({isLoading: true});
    if (this.state.password !== this.state.cPassword) {
      Alert.alert('Failue', "Password Didn't match");
    } else {
      Firebase.auth()
        .createUserWithEmailAndPassword(this.state.email, this.state.password)
        .then(async res => {
          this.setState({isLoading: false});
          let userId = res.user.uid;
          const user = {
            ['email']: res.user.email,
            ['userId']: res.user.uid,
          };
          firebase.firestore().collection('users').doc(userId).set({
            email: this.state.email,
            uid: userId,
          });
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
          this.setState({isLoading: false});
          Alert.alert('Failure', error.message);
        });
    }
  };

  getNotification = async index => {
    PushNotification.localNotification({
      autoCancel: true,
      bigText: 'Congratulations, Your signup has been done.',
      subText: 'Local Notification Demo',
      title: 'Welcome on board dude! You are all set to go now.',
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
          source={require('../../assets/images/appLogo-512.png')}
          style={styles.sideMenuProfileIcon}
        />
        <Text style={styles.logo}>{'Loan Against Securities'}</Text>
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
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Confirm Password..."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.setState({cPassword: text})}
          />
        </View>

        <TouchableOpacity
          onPress={() => this.handleSignUp()}
          style={styles.loginBtn}>
          {this.state.isLoading ? (
            <ActivityIndicator size="small" color={colors.white} />
          ) : (
            <Text style={styles.loginText}>{'Signup'}</Text>
          )}
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => this.props.navigation.navigate('AuthScreen')}>
          <Text style={styles.loginText}>{'Login'}</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themebg,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  logo: {
    fontSize: wp(6),
    color: colors.lightBlue,
    marginBottom: hp(5),
    fontFamily: 'Inter-Bold',
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
