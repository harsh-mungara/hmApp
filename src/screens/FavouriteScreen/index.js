import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import {get} from 'lodash';
import {connect} from 'react-redux';
import {getAllFilm} from '../../actions/GetAllFilmAction';
import {getAllPopularFilm} from '../../actions/GetPopularAction';
import Realm from 'realm';
import {SwipeListView} from 'react-native-swipe-list-view';
import {imgGenerator} from '@helper/utils';
import PushNotification from 'react-native-push-notification';
import {styles} from './styles';

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
            <View style={styles.starView}>
              <Image
                style={styles.starImg}
                source={require('../../assets/images/snack-icon.png')}
              />
              <Text style={styles.ratingText}>
                {`${get(item, 'release_date')}`}
              </Text>
            </View>
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
