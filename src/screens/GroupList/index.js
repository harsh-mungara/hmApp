import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firebase from 'firebase/compat/app';
import {get, isEmpty} from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

class GroupListScreen extends React.Component {
  state = {
    users: null,
    currentUserData: null,
    groupData: [],
    fetchedGroups: null,
    onRefresh: false,
  };

  componentDidMount() {
    this.getUsers();
    this.props.navigation.addListener('focus', payload => {
      this.getUsers();
    });
  }

  getUsers = async () => {
    const storeData = await AsyncStorage.getItem('userData');
    let userdata = JSON.parse(storeData);
    this.setState({currentUserData: userdata});

    const getTrimmedAuthId = get(userdata, 'userId').substring(0, 3);

    const querySanp = await firebase.firestore().collection('groups').get();
    const allUsers = querySanp.docs.map(docSnap => docSnap.data());
    const myGroups = [];
    allUsers.map(item => {
      if (item.groupId.includes(getTrimmedAuthId)) {
        myGroups.push(item);
      }
    });
    this.setState({groupData: myGroups, fetchedGroups: myGroups});
  };

  filteredGroups = search => {
    const lowSearch = search.toLowerCase().trim();
    const groupItems = this.state.groupData.sort((a, b) =>
      a.groupName.localeCompare(b.groupName),
    );
    const filterData = groupItems.filter(data => {
      if (data.groupName.toLowerCase().includes(lowSearch)) {
        return data;
      }
    });

    if (!isEmpty(filterData) && search.length > 0) {
      this.setState({groupData: filterData});
    } else if (isEmpty(filterData) && search.length > 0) {
      this.setState({groupData: []});
    } else {
      this.setState({
        groupData: this.state.fetchedGroups.sort((a, b) =>
          a.groupName.localeCompare(b.groupName),
        ),
      });
    }
  };

  _onRefresh = async () => {
    this.setState({onRefresh: true});
    await this.getUsers();
    this.setState({onRefresh: false});
  };

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.headerView}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Find group.."
                placeholderTextColor="#003f5c"
                onChangeText={text => this.filteredGroups(text)}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('CreateGroup');
              }}
              style={styles.headerImgView}>
              <Image
                style={styles.headerImg}
                source={require('../../assets/images/addNew.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.container}>
            {this.state.groupData.length === 0 ? (
              <View style={styles.emptyListView}>
                <Text style={styles.emptyListTxt}>
                  {'Create a group to enjoy chatting with your friends.'}
                </Text>
              </View>
            ) : (
              <FlatList
                data={this.state.groupData}
                // ListHeaderComponent={() => {
                //   return <View style={styles.deviderView} />;
                // }}
                renderItem={({item}) => (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('GroupChatScreen', {
                          groupName: item.groupName,
                          currentUserName: this.state.currentUserData.email,
                          currentUserId: this.state.currentUserData.userId,
                          groupId: item.groupId,
                        })
                      }
                      style={styles.listContainer}>
                      <Image
                        style={styles.listImg}
                        source={{
                          uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSi3BmGBVk6AshoiBA4TrUUIEoSyTGj4iY9MA&usqp=CAU',
                        }}
                      />
                      <View style={styles.listView}>
                        <Text style={styles.listTxt} numberOfLines={1}>
                          {item.groupName}
                        </Text>
                      </View>
                    </TouchableOpacity>
                    <View style={styles.deviderView} />
                  </View>
                )}
                refreshControl={
                  <RefreshControl
                    refreshing={this.state.onRefresh}
                    onRefresh={() => this._onRefresh()}
                  />
                }
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default GroupListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    marginVertical: hp(2),
    justifyContent: 'center',
    padding: wp(5),
    borderWidth: wp(0.2),
    alignSelf: 'center',
    marginHorizontal: wp(2),
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  headerImgView: {
    width: wp(8),
    height: hp(3),
    marginHorizontal: wp(5),
    alignSelf: 'center',
  },
  headerImg: {
    width: wp('5%'),
    height: wp('5%'),
    tintColor: 'black',
    alignSelf: 'center',
  },
  emptyListView: {
    width: '100%',
    marginLeft: wp(5),
    alignItems: 'center',
  },
  emptyListTxt: {
    maxWidth: '90%',
    color: 'black',
  },
});
