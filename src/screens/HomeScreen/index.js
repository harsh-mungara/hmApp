import React from 'react';
import {
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

import {get, isEmpty} from 'lodash';
import {connect} from 'react-redux';
import {getAllFilm} from '../../actions/GetAllFilmAction';
import {getAllPopularFilm} from '../../actions/GetPopularAction';
import Realm from 'realm';
import {SwipeListView} from 'react-native-swipe-list-view';
import {imgGenerator} from '@helper/utils';
import PushNotification from 'react-native-push-notification';
import {styles} from './styles';

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

            <View style={styles.popularView}>
              <View style={styles.showHeader}>
                <Text style={styles.tagLabel}>{'Popular'}</Text>
                <TouchableOpacity style={styles.tagView}>
                  <Text style={styles.seeTagLabel}>{'See More'}</Text>
                </TouchableOpacity>
              </View>
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
