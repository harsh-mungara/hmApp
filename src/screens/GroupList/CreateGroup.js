import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  SafeAreaView,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firebase from 'firebase/compat/app';
import {get} from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Header} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import CheckBox from 'react-native-check-box';
import PushNotification from 'react-native-push-notification';

class CreateGroup extends React.Component {
  state = {
    users: null,
    currentUserData: null,
    isChecked: false,
    header: [],
    firstId: '',
    groupName: '',
  };

  componentDidMount() {
    this.getUsers();
  }

  getUsers = async () => {
    const storeData = await AsyncStorage.getItem('userData');
    let userdata = JSON.parse(storeData);
    const currentUser = get(userdata, 'userId');
    this.setState({currentUserData: userdata});

    const querySanp = await firebase
      .firestore()
      .collection('users')
      .where('uid', '!=', currentUser)
      .get();
    const allUsers = querySanp.docs.map(docSnap => docSnap.data());
    console.log('AUTH::', allUsers);
    this.setState({users: allUsers});
  };

  handleItemClick = async nameId => {
    let newheader = [...this.state.header];
    console.log('PRESS');
    if (newheader.includes(nameId)) {
      newheader = newheader.filter(_id => _id !== nameId);
    } else if (this.state.header === nameId) {
      newheader.pop(this.state.header);
    } else {
      newheader.push(nameId);
    }
    this.setState({header: newheader});

    const chatIDpre = [];
    for (let i = 0; i <= newheader.length - 1; i++) {
      const newItem = newheader[i].substring(0, 3);
      chatIDpre.push(newItem);
      chatIDpre.sort();
      const roomId = chatIDpre.join('_');
      this.setState({firstId: roomId});
    }
  };

  onSave = async () => {
    const admindata = [];
    const storeData = await AsyncStorage.getItem('userData');
    let userdata = await JSON.parse(storeData);
    admindata.push(userdata);
    const chatIDpre = [];
    chatIDpre.push(this.state.firstId);
    chatIDpre.push(userdata.userId.substring(0, 3));
    chatIDpre.push(new Date().getTime());
    chatIDpre.sort();
    const roomId = chatIDpre.join('_');

    const newHeader = [...this.state.header];
    const resInner = [];
    newHeader.map(async item => {
      this.state.users.forEach(singleUser => {
        if (singleUser.uid === item) {
          resInner.push(singleUser);
        }
      });
      resInner.push(userdata);
      const unique = [
        ...new Map(resInner.map(itemData => [itemData.uid, itemData])).values(),
      ];

      firebase
        .firestore()
        .collection('groups')
        .doc(roomId)
        .set({
          users: unique,
          groupName: this.state.groupName,
          admin: admindata,
          groupId: roomId,
        })
        .then(res => {
          this.props.navigation.goBack();
          this.getNotification();
        })
        .catch(e => console.log({e}));
    });
  };

  getNotification = async index => {
    PushNotification.localNotification({
      autoCancel: true,
      bigText: 'Congratulations, Your group has been created.',
      subText: 'Local Notification Demo',
      title:
        "You are all set to go with your group. Voila, You've unlimited chat access.",
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
        <SafeAreaView>
          <StatusBar />
          <ScrollView>
            <Header
              containerStyle={styles.headerContainer}
              leftComponent={
                <TouchableOpacity
                  onPress={() => {
                    this.props.navigation.goBack();
                  }}
                  style={{width: wp(8), height: hp(3)}}>
                  <Image
                    style={styles.headerImg}
                    source={require('../../assets/images/ic_back.png')}
                  />
                </TouchableOpacity>
              }
              rightComponent={
                <TouchableOpacity
                  onPress={() => {
                    this.onSave();
                  }}
                  style={{
                    width: wp(8),
                    height: hp(3),
                    marginHorizontal: wp(2),
                  }}>
                  <Text>Save</Text>
                </TouchableOpacity>
              }
              centerComponent={{
                text: 'Create Group',
                style: {
                  color: 'gray',
                  fontSize: RFValue(16),
                },
              }}
            />
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Enter Group Name"
                placeholderTextColor="#003f5c"
                onChangeText={text => this.setState({groupName: text})}
              />
            </View>
            <View style={styles.container}>
              <FlatList
                data={this.state.users}
                keyExtractor={item => item.uid}
                renderItem={({item}) => (
                  <View>
                    <TouchableOpacity
                      onPress={() => this.handleItemClick(item.uid)}
                      style={styles.listContainer}>
                      <View>
                        <CheckBox
                          style={styles.cbView}
                          isChecked={this.state.header.includes(item.uid)}
                          onClick={() => {
                            this.handleItemClick(item.uid);
                          }}
                          leftText={'test'}
                        />
                      </View>
                      <View style={styles.listView}>
                        <Text style={styles.listTxt} numberOfLines={1}>
                          {item.email}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.deviderView} />
                  </View>
                )}
              />
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  ParentView: {
    width: wp(45),
    height: hp(30),
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: hp(5),
    marginHorizontal: wp(1),
    padding: wp(2),
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp(2),
    height: hp(6),
  },
  listImg: {
    width: wp(15),
    height: wp(15),
    borderRadius: wp(10),
    resizeMode: 'contain',
  },
  listView: {
    width: '100%',
    marginLeft: wp(5),
  },
  listTxt: {
    maxWidth: '70%',
    color: 'black',
  },
  deviderView: {
    width: '100%',
    height: hp(0.1),
    backgroundColor: 'black',
    marginVertical: hp(1),
  },
  inputView: {
    width: '80%',
    backgroundColor: 'white',
    borderRadius: wp(5),
    height: hp(6),
    marginVertical: hp(5),
    justifyContent: 'center',
    padding: wp(5),
    borderWidth: wp(0.2),
    alignSelf: 'center',
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  headerImg: {
    width: wp('5%'),
    height: wp('5%'),
    tintColor: 'gray',
    alignSelf: 'center',
  },
  headerContainer: {
    backgroundColor: 'white',
    justifyContent: 'space-around',
    borderBottomColor: 'transparent',
  },
  cbView: {
    height: hp(3),
    backgroundColor: 'white',
  },
});
