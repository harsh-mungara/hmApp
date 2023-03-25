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
  RefreshControl,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firebase from 'firebase/compat/app';
import {get, isEmpty} from 'lodash';
import AsyncStorage from '@react-native-async-storage/async-storage';

class ListScreen extends React.Component {
  state = {
    users: null,
    currentUserData: null,
    fetchedUsers: null,
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
    const currentUser = get(userdata, 'userId');
    this.setState({currentUserData: userdata});

    const querySanp = await firebase
      .firestore()
      .collection('users')
      .where('uid', '!=', currentUser)
      .get();
    const allUsers = querySanp.docs.map(docSnap => docSnap.data());
    this.setState({users: allUsers, fetchedUsers: allUsers});
  };

  filteredGroups = search => {
    const lowSearch = search.toLowerCase().trim();
    const groupItems = this.state.users.sort((a, b) =>
      a.email.localeCompare(b.email),
    );
    const filterData = groupItems.filter(data => {
      if (data.email.toLowerCase().includes(lowSearch)) {
        return data;
      }
    });

    if (!isEmpty(filterData) && search.length > 0) {
      this.setState({users: filterData});
    } else if (isEmpty(filterData) && search.length > 0) {
      this.setState({users: []});
    } else {
      this.setState({
        users: this.state.fetchedUsers.sort((a, b) =>
          a.email.localeCompare(b.email),
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
        <SafeAreaView>
          <StatusBar />
          <ScrollView>
            <View style={styles.inputView}>
              <TextInput
                style={styles.inputText}
                placeholder="Find your friend.."
                placeholderTextColor="#003f5c"
                onChangeText={text => this.filteredGroups(text)}
              />
            </View>
            <View style={styles.container}>
              <FlatList
                data={this.state.users}
                keyExtractor={item => item.uid}
                renderItem={({item}) => (
                  <View>
                    <TouchableOpacity
                      onPress={() =>
                        this.props.navigation.navigate('ChatScreen', {
                          name: item.email,
                          uid: item.uid,
                          currentUserName: this.state.currentUserData.email,
                          currentUserId: this.state.currentUserData.userId,
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
                          {item.email}
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
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    );
  }
}

export default ListScreen;

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
});
