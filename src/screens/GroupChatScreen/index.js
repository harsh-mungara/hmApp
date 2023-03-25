import React, {useCallback, useState, useEffect} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Image,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import firebase from 'firebase/compat/app';
import {get} from 'lodash';
import {Header} from 'react-native-elements';
import {RFValue} from 'react-native-responsive-fontsize';
import {GiftedChat} from 'react-native-gifted-chat';
import {useNavigation, useRoute} from '@react-navigation/native';

const GroupChatScreen = ({user, route}) => {
  const navigation = useNavigation();
  const Data = useRoute();
  const [messages, setMessages] = useState([]);
  const [currentUserName, setCurrentUserName] = useState(
    get(Data, 'params.currentUserName'),
  );
  const [currentUserId, setCurrentUserId] = useState(
    get(Data, 'params.currentUserId'),
  );
  const [groupName, setGroupName] = useState(get(Data, 'params.groupName'));

  const roomId = get(Data, 'params.groupId');

  useEffect(() => {
    loadMessages(message => {
      setMessages(previousMessages => {
        return GiftedChat.append(previousMessages, message);
      });
    });
  }, []);

  const onSend = useCallback(async (messages = []) => {
    for (let i = 0; i < messages.length; i++) {
      const {user} = messages[i];
      const text = messages[i].text;

      const start = new Date().getTime();
      const message = {
        text,
        user,
        createdAt: start,
        messageType: 'text',
      };

      firebase
        .firestore()
        .collection('Messages')
        .doc(roomId)
        .collection('chats')
        .add(message);
    }
  }, []);

  const loadMessages = callback => {
    try {
      firebase
        .firestore()
        .collection('Messages')
        .doc(roomId.toString())
        .collection('chats')
        .orderBy('createdAt', 'asc')
        .onSnapshot(function (doc) {
          doc.docChanges().forEach(chat => {
            var id = chat.doc.id;
            const chatData = chat.doc.data();
            console.log('chat', chatData);

            const newMessage = {
              _id: id,
              text: chatData.text,
              createdAt: chatData.createdAt,
              user: {
                _id: chatData.user._id,
                name: chatData.user.name,
              },
            };
            callback(newMessage);
          });
        });
    } catch (e) {}
  };

  const userlist = () => {
    return {
      name: currentUserName,
      email: currentUserName,
      _id: currentUserId,
    };
  };

  return (
    <View style={styles.container}>
      <Header
        containerStyle={styles.headerView}
        leftComponent={
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{width: wp(8), height: hp(3)}}>
            <Image
              style={styles.headerImg}
              source={require('../../assets/images/ic_back.png')}
            />
          </TouchableOpacity>
        }
        centerComponent={{
          text: groupName,
          style: {
            color: 'gray',
            fontSize: Platform.OS === 'ios' ? RFValue(16) : RFValue(18),
          },
        }}
      />
      <GiftedChat
        messages={messages}
        onSend={messages => onSend(messages)}
        user={userlist()}
        renderSend={() => null}
        showAvatarForEveryMessage
      />
    </View>
  );
};

export default GroupChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003f5c',
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
    color: 'white',
  },
  deviderView: {
    width: '100%',
    height: hp(0.1),
    backgroundColor: 'white',
    marginVertical: hp(1),
  },
  headerView: {
    backgroundColor: 'white',
    justifyContent: 'space-around',
    borderBottomColor: 'transparent',
  },
  headerImg: {
    width: wp('5%'),
    height: wp('5%'),
    tintColor: 'gray',
    alignSelf: 'center',
  },
});
