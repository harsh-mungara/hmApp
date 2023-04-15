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
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {get, isEmpty} from 'lodash';
import {connect} from 'react-redux';
import {getAllFilm} from '../../actions/GetAllFilmAction';
import {getAllPopularFilm} from '../../actions/GetPopularAction';
import Realm from 'realm';
import {SwipeListView} from 'react-native-swipe-list-view';
import {imgGenerator} from '@helper/utils';
import PushNotification from 'react-native-push-notification';

let realm;

class DownloadSchema extends Realm.Object {}
DownloadSchema.schema = {
  name: 'Download',
  primaryKey: 'id',
  properties: {
    id: 'int',
    title: 'string',
    image: 'string',
    vote_average: 'string',
    release_date: 'string',
  },
};

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: null,
      movieData: [],
      currentUserData: null,
      fetchedUsers: null,
      onRefresh: false,
      currentMovieData: [],
    };
  }

  componentDidMount() {
    realm = new Realm({
      path: 'UserDatabase.realm',
      schema: [DownloadSchema],
      schemaVersion: 1,
      deleteRealmIfMigrationNeeded: true,
    });
    this.getMovies();
    // this.props.navigation.addListener('focus', payload => {
    //   this.getMovies();
    // });
  }

  getMovies = async () => {
    await this.props.getAllPopularFilmData((data, err) => {
      if (data) {
        this.setState({movieData: data, fetchedUsers: data});
      }
    });
    await this.props.getAllFilmData((data, err) => {
      if (data) {
        this.setState({currentMovieData: data});
      }
    });
  };

  filteredMovies = search => {
    const lowSearch = search.toLowerCase().trim();
    const groupItems = this.state.movieData.sort((a, b) =>
      a.title.localeCompare(b.title),
    );
    const filterData = groupItems.filter(data => {
      if (data.title.toLowerCase().includes(lowSearch)) {
        return data;
      }
    });

    if (!isEmpty(filterData) && search.length > 0) {
      this.setState({movieData: filterData});
    } else if (isEmpty(filterData) && search.length > 0) {
      this.setState({movieData: []});
    } else {
      this.setState({
        movieData: this.state.fetchedUsers.sort((a, b) =>
          a.title.localeCompare(b.title),
        ),
      });
    }
  };

  _onRefresh = async () => {
    this.setState({onRefresh: true});
    await this.getMovies();
    this.setState({onRefresh: false});
  };

  onSave = item => {
    realm.write(() => {
      realm.create(
        'Download',
        {
          id: item.id,
          title: item.title,
          image: 'url',
          vote_average: item.vote_average.toFixed(1),
          release_date: item.release_date,
        },
        true,
      );
    });

    PushNotification.localNotification({
      autoCancel: true,
      bigText: 'Congratulations, Movie has been added to your favourite list.',
      subText: 'Local Notification Demo',
      title: 'You are all set to go with your favourite list',
      message: 'Expand me to see more',
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
      actions: '["Yes", "No"]',
      channelId: '123',
    });

    Alert.alert('Movie is added into your favourite list!');
  };

  renderShowing = item => {
    return (
      <View style={styles.showingParent}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('MovieScreen', {
              movieId: get(item, 'id'),
            });
          }}>
          <Image
            style={styles.listImg}
            source={{
              uri: imgGenerator(),
            }}
          />
        </TouchableOpacity>
        <Text style={styles.movieTitle} numberOfLines={1}>
          {get(item, 'title')}
        </Text>
        <View style={styles.starView}>
          <Image
            style={styles.starImg}
            source={require('../../assets/images/ic_fancyLike.png')}
          />
          <Text style={styles.ratingText}>{` ${get(
            item,
            'vote_average',
          )}/10 IMDB`}</Text>
        </View>
        <TouchableOpacity
          onPress={() => this.onSave(item)}
          style={styles.starView}>
          <Image
            style={styles.starImg}
            source={require('../../assets/images/Vector.png')}
          />
          <Text style={styles.ratingText}>{' Favourite'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  renderPopular = item => {
    return (
      <View>
        <View style={styles.renderView}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate('MovieScreen', {
                movieId: get(item, 'id'),
              });
            }}>
            <Image
              style={styles.popularImg}
              source={{
                uri: imgGenerator(),
              }}
            />
          </TouchableOpacity>
          <View>
            <Text style={styles.poularTitle} numberOfLines={1}>
              {get(item, 'title')}
            </Text>
            <View style={styles.starView}>
              <Image
                style={styles.starImg}
                source={require('../../assets/images/ic_fancyLike.png')}
              />
              <Text style={styles.ratingText}>{`${get(
                item,
                'vote_average',
              )}/10 IMDB`}</Text>
            </View>
            <Text style={styles.ratingText}>{`${get(
              item,
              'release_date',
            )}`}</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Find your movie.."
            placeholderTextColor="#003f5c"
            onChangeText={text => this.filteredMovies(text)}
          />
        </View>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.onRefresh}
              onRefresh={() => this._onRefresh()}
            />
          }>
          <View style={styles.container}>
            <View>
              <View style={styles.showHeader}>
                <Text style={styles.tagLabel}>{'Now Showing'}</Text>
                <TouchableOpacity style={styles.tagView}>
                  <Text style={styles.seeTagLabel}>{'See More'}</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={this.state.currentMovieData}
                horizontal
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                contentContainerStyle={styles.listParent}
                renderItem={({item}) => this.renderShowing(item)}
              />
            </View>

            <View>
              <View style={styles.showHeader}>
                <Text style={styles.tagLabel}>{'Popular'}</Text>
                <TouchableOpacity style={styles.tagView}>
                  <Text style={styles.seeTagLabel}>{'See More'}</Text>
                </TouchableOpacity>
              </View>
              {/* <FlatList
                data={this.state.movieData}
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.id}
                contentContainerStyle={{flexGrow: 1, marginVertical: 15}}
                style={{flex: 1}}
                renderItem={({item}) => this.renderPopular(item)}
              /> */}
              <SwipeListView
                ref={ref => (this._swipeListViewRef = ref)}
                data={this.state.movieData}
                renderItem={({item}) => this.renderPopular(item)}
                contentContainerStyle={styles.listParent}
                keyExtractor={item => item.id}
                closeOnRowPress={true}
                renderHiddenItem={(data, rowMap) => (
                  <TouchableOpacity
                    onPress={() => {
                      this.onSave(get(data, 'item'));
                    }}
                    style={styles.hiddenView}>
                    <Image
                      style={styles.saveImg}
                      source={require('../../assets/images/Vector.png')}
                    />
                    <Text style={styles.tagLabel}>{'Save'}</Text>
                  </TouchableOpacity>
                )}
                previewOpenValue={75}
                previewFirstRow={true}
                previewDuration={1000}
                disableLeftSwipe
                leftOpenValue={75}
                rightOpenValue={-75}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  cardData: state.cardData,
});

const mapDispatchToProps = {
  getAllFilmData: callback => getAllFilm(callback),
  getAllPopularFilmData: callback => getAllPopularFilm(callback),
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: wp(2),
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
    width: wp(42),
    height: wp(55),
    borderRadius: wp(2),
    resizeMode: 'contain',
    marginBottom: hp(2),
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
  tagView: {
    width: '20%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(5),
    borderWidth: wp(0.2),
    borderColor: 'black',
    height: hp(3),
  },
  tagLabel: {
    fontSize: wp(5),
    fontWeight: 'bold',
  },
  seeTagLabel: {
    fontSize: wp(3),
  },
  showHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  movieTitle: {
    maxWidth: wp(45),
    fontSize: wp(5),
    fontWeight: 'bold',
  },
  poularTitle: {
    maxWidth: wp(60),
    fontSize: wp(5),
    fontWeight: 'bold',
  },
  ratingText: {
    fontSize: wp(4),
  },
  starImg: {
    width: wp(4),
    height: hp(4),
    tintColor: 'orange',
    resizeMode: 'contain',
    marginHorizontal: wp(1),
  },
  starView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(0.5),
  },
  showingParent: {
    marginRight: wp(2),
  },
  popularImg: {
    width: wp(30),
    height: wp(40),
    borderRadius: wp(2),
    resizeMode: 'contain',
    marginBottom: hp(2),
    marginRight: wp(5),
  },
  hiddenView: {
    width: wp(20),
    justifyContent: 'center',
    height: hp(8),
    marginVertical: hp(5),
    alignItems: 'center',
  },
  saveImg: {
    width: wp(6),
    height: hp(6),
    resizeMode: 'contain',
    marginHorizontal: wp(1),
    tintColor: 'black',
  },
  listParent: {
    flexGrow: 1,
    marginVertical: hp(3),
  },
  renderView: {
    flexDirection: 'row',
  },
});
