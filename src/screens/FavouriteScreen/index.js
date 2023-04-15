import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {get} from 'lodash';
import {connect} from 'react-redux';
import {getAllFilm} from '../../actions/GetAllFilmAction';
import {getAllPopularFilm} from '../../actions/GetPopularAction';
import Realm from 'realm';
import {SwipeListView} from 'react-native-swipe-list-view';
import {imgGenerator} from '@helper/utils';
import PushNotification from 'react-native-push-notification';

let realm;

class FavouriteScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      movieData: [],
      onRefresh: false,
      refreshKey: new Date().getTime(),
    };
  }

  componentDidMount() {
    this.getMovies();
    this.props.navigation.addListener('focus', payload => {
      this.getMovies();
    });
  }

  getMovies = async () => {
    realm = new Realm({
      path: 'UserDatabase.realm',
      deleteRealmIfMigrationNeeded: true,
    });
    const movie_details = realm.objects('Download');
    this.setState({movieData: movie_details});
  };

  _onRefresh = async () => {
    this.setState({onRefresh: true});
    await this.getMovies();
    this.setState({onRefresh: false});
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
            <Text style={styles.movieTitle} numberOfLines={1}>
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

  onRemove = id => {
    realm.write(() => {
      realm.delete(realm.objects('Download').filtered(`id=${id}`));
    });
    PushNotification.localNotification({
      autoCancel: true,
      bigText: 'Oops, This Movie has been removed to your favourite list.',
      subText: 'Local Notification Demo',
      title: 'Alert, Movie is removed',
      message: 'Expand me to see more',
      vibrate: true,
      vibration: 300,
      playSound: true,
      soundName: 'default',
      actions: '["Yes", "No"]',
      channelId: '123',
    });
    Alert.alert('Your favourite Movie is removed from your list!');
    this.setState({refreshKey: new Date()});
  };

  render() {
    return (
      <View key={this.state.refreshKey} style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.onRefresh}
              onRefresh={() => this._onRefresh()}
            />
          }>
          {this.state.movieData.length > 0 ? (
            <View style={styles.container}>
              <View>
                <View style={styles.showHeader}>
                  <Text style={styles.tagLabel}>{'Favourites'}</Text>
                </View>
                <SwipeListView
                  ref={ref => (this._swipeListViewRef = ref)}
                  data={this.state.movieData}
                  renderItem={({item}) => this.renderPopular(item)}
                  contentContainerStyle={styles.listParentContainer}
                  keyExtractor={item => item.id}
                  closeOnRowPress={true}
                  renderHiddenItem={(data, rowMap) => (
                    <TouchableOpacity
                      onPress={() => {
                        this.onRemove(get(data, 'item.id'));
                      }}
                      style={styles.hiddenView}>
                      <Image
                        style={styles.saveImg}
                        source={require('../../assets/images/icons/ic_cancelButton.png')}
                      />
                      <Text style={styles.removeLabel}>{'Remove'}</Text>
                    </TouchableOpacity>
                  )}
                  previewOpenValue={75}
                  previewFirstRow={true}
                  previewDuration={1000}
                  disableLeftSwipe
                  leftOpenValue={80}
                  rightOpenValue={-75}
                />
              </View>
            </View>
          ) : (
            <View style={styles.container}>
              <Image
                style={styles.emptyImg}
                source={require('../../assets/images/empty-data2.png')}
              />
              <Text style={styles.emptyLabel}>
                {'Add movie to your favourite list'}
              </Text>
            </View>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(FavouriteScreen);

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
    marginVertical: hp(1),
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
    width: wp(12),
    height: hp(7),
    resizeMode: 'contain',
    marginHorizontal: wp(1),
    tintColor: 'red',
  },
  emptyImg: {
    width: wp(70),
    height: hp(70),
    resizeMode: 'contain',
    marginHorizontal: wp(1),
    tintColor: 'black',
    alignSelf: 'center',
  },
  removeLabel: {
    fontSize: wp(4),
    fontWeight: 'bold',
  },
  listParentContainer: {
    flexGrow: 1,
    marginVertical: hp(3),
  },
  renderView: {
    flexDirection: 'row',
  },
  emptyLabel: {
    fontSize: wp(4),
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
