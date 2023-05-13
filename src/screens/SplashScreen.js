import React, {useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import colors from '../utils/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const SplashScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(async () => {
      const storeData = await AsyncStorage.getItem('userData');
      let userdata = JSON.parse(storeData);
      if (userdata !== null) {
        navigation.reset({
          index: 0,
          routes: [{name: 'DrawerScreen'}],
        });
      } else {
        navigation.reset({
          index: 0,
          routes: [{name: 'SignUpScreen'}],
        });
      }
    }, 200);
  }, []);

  return (
    <View style={styles.flexContainer}>
      <LinearGradient
        colors={[colors.themebg, colors.lightBlue]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}
        style={styles.linearGradient}>
        <View>
          <Image
            source={require('../assets/images/appLogo-512.png')}
            style={styles.sideMenuProfileIcon}
          />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
  },
  splashFont: {
    fontSize: RFValue(30),
    color: colors.white,
    fontFamily: 'Comfortaa-Bold',
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
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
export default SplashScreen;
