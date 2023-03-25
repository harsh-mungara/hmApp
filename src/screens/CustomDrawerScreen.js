import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
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

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi3BmGBVk6AshoiBA4TrUUIEoSyTGj4iY9MA&usqp=CAU',
        }}
        style={styles.sideMenuProfileIcon}
      />
      <DrawerContentScrollView {...props}>
        <Text style={styles.emailView}>{username}</Text>

        <DrawerItemList {...props} />
        <TouchableOpacity
          onPress={async () => {
            await AsyncStorage.removeItem('userData');
            navigation.reset({
              index: 0,
              routes: [{name: 'AuthStack'}],
            });
          }}
          style={styles.customItem}>
          <Text style={styles.footerView}>Log out</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    resizeMode: 'contain',
    width: wp(50),
    height: hp(15),
    borderRadius: 15,
    alignSelf: 'center',
    marginVertical: hp(2),
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
    color: 'gray',
    marginHorizontal: wp(5),
    marginVertical: hp(2),
  },
  container: {
    flex: 1,
  },
  footerView: {
    color: 'gray',
  },
});

export default CustomDrawerScreen;
