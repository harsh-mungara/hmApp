import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Alert,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {useNavigation} from '@react-navigation/native';
import {get} from 'lodash';
import colors from '@utils/colors';

const CustomDrawerScreen = props => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const storeData = await AsyncStorage.getItem('userData');
      let userdata = JSON.parse(storeData);
      const username = get(userdata, 'email');
      setUsername(username);
    };

    fetchData();
  }, [username]);

  const onLogout = () => {
    Alert.alert(
      'Logout!',
      'Your all saved item will be removed!.',
      [
        {
          text: 'Ok',
          onPress: async () => {
            await AsyncStorage.removeItem('userData');
            navigation.reset({
              index: 0,
              routes: [{name: 'AuthStack'}],
            });
          },
        },
        {
          text: 'Cancle',
          onPress: () => {},
        },
      ],
      {cancelable: false},
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerView}>
        <Image
          source={require('../assets/images/appLogo-512.png')}
          style={styles.sideMenuProfileIcon}
        />
      </View>
      <DrawerContentScrollView {...props}>
        <Text style={styles.emailView}>{username}</Text>

        <DrawerItemList {...props} />
        <TouchableOpacity
          onPress={async () => onLogout()}
          style={styles.customItem}>
          <Text style={styles.footerView}>{'Log out'}</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'contain',
    width: wp(50),
    height: wp(30),
    borderRadius: 15,
    alignSelf: 'center',
    marginVertical: hp(2),
    backgroundColor: colors.themebg,
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  emailView: {
    color: colors.black,
    marginHorizontal: wp(5),
    marginVertical: hp(2),
  },
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  footerView: {
    color: colors.black,
  },
  headerView: {
    backgroundColor: colors.themebg,
  },
});

export default CustomDrawerScreen;
