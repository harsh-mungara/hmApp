import 'react-native-gesture-handler';
import React from 'react';
import {View, TouchableOpacity, Image, StyleSheet, Text} from 'react-native';
import SplashScreen from './screens/SplashScreen';
import AuthScreen from './screens/AuthScreen/AuthScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import SignUpScreen from './screens/AuthScreen/SignUpScreen';
import CustomDrawerScreen from './screens/CustomDrawerScreen';
import Dashboard from '@dashboard';
import ChatScreen from '@chatScreen';
import GroupListScreen from '@groupListScreen';
import CreateGroup from '@groupListScreen/CreateGroup';
import GroupChatScreen from '@groupChatScreen';
import HomeScreen from '@homeScreen';
import MovieScreen from '@movieScreen';
import FavouriteScreen from '@favouriteScreen';

import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const Stack = createNativeStackNavigator();
const AuthStack = createNativeStackNavigator();

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const NavigationDrawerStructure = props => {
  const toggleDrawer = () => {
    props.navigationProps.toggleDrawer();
  };

  return (
    <View style={styles.drawerHeader}>
      <TouchableOpacity onPress={() => toggleDrawer()}>
        <Image
          source={require('./assets/images/ic_bubblePop.png')}
          style={styles.headerIcon}
        />
      </TouchableOpacity>
      <Text style={styles.headerTxt}>{'H&M App'}</Text>
      <View>
        <Image
          source={require('./assets/images/notification.png')}
          style={styles.notiIcon}
        />
      </View>
    </View>
  );
};

const tabIcon = route => {
  if (route.name === 'Home') {
    return (
      <Image
        style={styles.tabImg}
        source={require('./assets/images/video-vertical.png')}
      />
    );
  } else if (route.name === 'FavouriteScreen') {
    return (
      <Image
        style={styles.tabImg}
        source={require('./assets/images/user-octagon.png')}
      />
    );
  } else if (route.name === 'Dashboard') {
    return (
      <Image
        style={styles.tabImg}
        source={require('./assets/images/ic_chat.png')}
      />
    );
  } else if (route.name === 'Group') {
    return (
      <Image
        style={styles.tabImg}
        source={require('./assets/images/ic_copy.png')}
      />
    );
  }
};

const BottomTabStack = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({route}) => ({
        tabBarIcon: ({}) => tabIcon(route),
      })}
      tabBarOptions={{
        activeTintColor: 'tomato',
        inactiveTintColor: 'gray',
        style: {
          backgroundColor: '#e0e0e0',
        },
        labelStyle: {
          textAlign: 'center',
          fontSize: wp(4),
        },
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: 'Home',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="FavouriteScreen"
        component={FavouriteScreen}
        options={{
          tabBarLabel: 'Favourite',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          tabBarLabel: 'Chat',
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Group"
        component={GroupListScreen}
        options={{
          tabBarLabel: 'Group',
          headerShown: false,
        }}
      />
    </Tab.Navigator>
  );
};

const HomeScreenStack = ({navigation}) => {
  return (
    <Stack.Navigator initialRouteName="HomeScreen">
      <Stack.Screen
        name=" "
        component={BottomTabStack}
        options={({route}) => ({
          headerLeft: () => (
            <NavigationDrawerStructure navigationProps={navigation} />
          ),
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        })}
      />
    </Stack.Navigator>
  );
};

const DrawerStack = () => {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerScreen {...props} />}
      drawerContentOptions={{
        activeTintColor: '#e91e63',
        itemStyle: {marginVertical: 5},
      }}>
      <Drawer.Screen
        name="HomeScreenStack"
        options={{drawerLabel: 'Home Screen', headerShown: false}}
        component={HomeScreenStack}
      />
    </Drawer.Navigator>
  );
};

const AuthStackNavigator = () => (
  <AuthStack.Navigator headerMode="none" initialRouteName={'SplashScreen'}>
    <AuthStack.Screen
      name="SplashScreen"
      component={SplashScreen}
      options={{headerShown: false, gestureEnabled: false}}
    />
    <AuthStack.Screen
      name="AuthScreen"
      component={AuthScreen}
      options={{gestureEnabled: false, headerShown: false}}
    />
    <AuthStack.Screen
      name="SignUpScreen"
      component={SignUpScreen}
      options={{gestureEnabled: false, headerShown: false}}
    />
    <AuthStack.Screen
      name="DrawerScreen"
      component={DrawerStack}
      options={{gestureEnabled: false, headerShown: false}}
    />
    <AuthStack.Screen
      name="ChatScreen"
      component={ChatScreen}
      options={{gestureEnabled: false, headerShown: false}}
    />
    <AuthStack.Screen
      name="GroupListScreen"
      component={GroupListScreen}
      options={{gestureEnabled: false, headerShown: false}}
    />
    <AuthStack.Screen
      name="CreateGroup"
      component={CreateGroup}
      options={{gestureEnabled: false, headerShown: false}}
    />
    <AuthStack.Screen
      name="GroupChatScreen"
      component={GroupChatScreen}
      options={{gestureEnabled: false, headerShown: false}}
    />
    <AuthStack.Screen
      name="MovieScreen"
      component={MovieScreen}
      options={{gestureEnabled: false, headerShown: false}}
    />
  </AuthStack.Navigator>
);

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="AuthStack" headerMode={'none'}>
        <Stack.Screen
          name="AuthStack"
          component={AuthStackNavigator}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  tabImg: {
    width: wp(6),
    height: wp(6),
    alignSelf: 'center',
    tintColor: 'black',
  },
  notiIcon: {
    width: wp(6),
    height: wp(6),
    marginLeft: 5,
    tintColor: 'black',
    resizeMode: 'contain',
  },
  drawerHeader: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
  },
  headerIcon: {
    width: wp(6),
    height: wp(6),
    tintColor: 'black',
    resizeMode: 'contain',
  },
  headerTxt: {
    fontSize: wp(5),
    color: 'black',
    marginHorizontal: wp(3),
  },
});
export default AppNavigator;
