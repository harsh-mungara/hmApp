import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  RefreshControl,
  Alert,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {get, isEmpty} from 'lodash';
import {connect} from 'react-redux';
import {getFilm} from '../../actions/GetFilmAction';
import {Header} from 'react-native-elements';
import moment from 'moment';
import {getVideo} from '../../actions/GetVideoAction';
import YoutubePlayer from 'react-native-youtube-iframe';
import Realm from 'realm';
import {imgGenerator} from '@helper/utils';
import Modal from 'react-native-modal';
import {styles} from './styles';

let realm;

const castData = [
  {
    title: 'Tom Holland',
    image: 'url',
  },
  {
    title: 'Zendaya',
    image: 'url',
  },
  {
    title: 'Benedict',
    image: 'url',
  },
  {
    title: 'test12',
    image: 'url',
  },
  {
    title: 'Jacon Batalon',
    image: 'url',
  },
];
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
class MovieScreen extends React.Component {
  state = {
    users: null,
    videoData: [],
    currentUserData: [],
    fetchedUsers: null,
    onRefresh: false,
    movieId: this.props.route.params.movieId,
    modalVisible: false,
  };

  componentDidMount() {
    realm = new Realm({
      path: 'UserDatabase.realm',
      deleteRealmIfMigrationNeeded: true,
    });
    this.getMovie();
    this.props.navigation.addListener('focus', payload => {
      this.getMovie();
    });
  }

  getMovie = async () => {
    await this.props.getFilmData(this.state.movieId, (data, err) => {
      if (data) {
        this.setState({currentMovieData: data});
      }
    });
    await this.props.getVideoData(this.state.movieId, (data, err) => {
      if (!isEmpty(data)) {
        data.map(item => {
          if (item.type && item.type === 'Trailer') {
            this.setState({videoData: item});
          }
        });
      }
    });
  };

  _onRefresh = async () => {
    this.setState({onRefresh: true});
    await this.getMovie();
    this.setState({onRefresh: false});
  };

  onSave = item => {
    realm.write(() => {
      realm.create(
        'Download',
        {
          id: get(this, 'state.currentMovieData.id'),
          title: get(this, 'state.currentMovieData.title'),
          image: 'url',
          vote_average: get(
            this,
            'state.currentMovieData.vote_average',
          ).toFixed(1),
          release_date: get(this, 'state.currentMovieData.release_date'),
        },
        true,
      );
    });
    Alert.alert('Movie is added into your favourite list!');
  };

  renderShowing = item => {
    return (
      <View style={styles.showingParent}>
        <Image
          style={styles.listImg}
          source={{
            uri: imgGenerator(),
          }}
        />
        <Text style={styles.movieTitle} numberOfLines={1}>
          {get(item, 'title')}
        </Text>
      </View>
    );
  };

  renderGenre = item => {
    return (
      <View style={styles.genreView}>
        <Text numberOfLines={1} style={styles.genreTxt}>
          {get(item, 'name')}
        </Text>
      </View>
    );
  };

  closeView = () => {
    this.setState({modalVisible: !this.state.modalVisible});
  };

  render() {
    const rating = get(this, 'state.currentMovieData.vote_average', 0);
    return (
      <View style={styles.container}>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.onRefresh}
              onRefresh={() => this._onRefresh()}
            />
          }>
          <Header
            containerStyle={styles.headerView}
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
            centerComponent={{
              text: '',
            }}
            rightComponent={
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}
                style={{width: wp(8), height: hp(3)}}>
                <Image
                  style={styles.headerImg}
                  source={require('../../assets/images/ic_bubblePop.png')}
                />
              </TouchableOpacity>
            }
          />
          <View style={styles.thumbNailView}>
            {!this.state.modalVisible && (
              <View>
                <Image
                  style={styles.thumbNailImg}
                  source={{
                    uri: imgGenerator(),
                  }}
                />
                <TouchableOpacity
                  style={styles.playView}
                  onPress={() =>
                    this.setState({modalVisible: !this.state.modalVisible})
                  }>
                  <Image
                    style={styles.playImg}
                    source={require('../../assets/images/play-circle.png')}
                  />
                  <Text style={styles.playText}>{'Play Trailor'}</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.parentContainer}>
            <View>
              <View style={styles.showHeader}>
                <Text style={[styles.tagLabel, styles.flexSeven]}>
                  {get(this, 'state.currentMovieData.title')}
                </Text>
                <TouchableOpacity
                  onPress={() => this.onSave()}
                  style={[styles.tagView, styles.flexThree]}>
                  <Image
                    style={styles.vectorImg}
                    source={require('../../assets/images/Vector.png')}
                  />
                </TouchableOpacity>
              </View>
              <View style={styles.starView}>
                <Image
                  style={styles.starImg}
                  source={require('../../assets/images/ic_fancyLike.png')}
                />
                <Text style={styles.ratingText}>{`${
                  Math.round(rating * 10) / 10
                }/10 IMDB`}</Text>
              </View>
              <FlatList
                data={get(this, 'state.currentMovieData.genres', [])}
                horizontal
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.uid}
                contentContainerStyle={styles.listParent}
                style={styles.flexOne}
                renderItem={({item}) => this.renderGenre(item)}
              />

              <View style={styles.detailView}>
                <View style={styles.flexOne}>
                  <Text style={styles.ratingText}>{'Length'}</Text>
                  <Text style={styles.detailText} numberOfLines={1}>
                    {moment
                      .utc()
                      .startOf('day')
                      .add(
                        get(this, 'state.currentMovieData.runtime', 0),
                        'minutes',
                      )
                      .format('H:mm')}
                  </Text>
                </View>
                <View style={styles.flexOne}>
                  <Text style={styles.ratingText}>{'Language'}</Text>
                  <Text style={styles.detailText} numberOfLines={1}>
                    {get(this, 'state.currentMovieData.original_language', '-')}
                  </Text>
                </View>
                <View style={styles.flexOne}>
                  <Text style={styles.ratingText}>{'Rating'}</Text>
                  <Text style={styles.detailText} numberOfLines={1}>
                    {get(this, 'state.currentMovieData.imdb_id', '-')}
                  </Text>
                </View>
              </View>

              <View style={styles.descHeader}>
                <Text style={styles.tagLabel}>{'Description'}</Text>
                <Text style={styles.descText}>
                  {get(this, 'state.currentMovieData.overview', '-')}
                </Text>
              </View>

              <View style={styles.detailView}>
                <View style={styles.flexOne}>
                  <Text style={styles.ratingText}>{'Budget'}</Text>
                  <Text style={styles.detailText} numberOfLines={1}>
                    {get(this, 'state.currentMovieData.budget', 0)}
                  </Text>
                </View>
                <View style={styles.flexOne}>
                  <Text style={styles.ratingText}>{'Release Date'}</Text>
                  <Text style={styles.detailText} numberOfLines={1}>
                    {get(this, 'state.currentMovieData.release_date', '-')}
                  </Text>
                </View>
                <View style={styles.flexOne}>
                  <Text style={styles.ratingText}>{'Status'}</Text>
                  <Text style={styles.detailText} numberOfLines={1}>
                    {get(this, 'state.currentMovieData.status', '-')}
                  </Text>
                </View>
              </View>

              <View style={styles.showHeader}>
                <Text style={styles.tagLabel}>{'Cast'}</Text>
                <TouchableOpacity
                  style={styles.seeView}
                  onPress={() => Alert.alert('Will be in action soon!')}>
                  <Text style={styles.seeTagLabel}>{'See More'}</Text>
                </TouchableOpacity>
              </View>
              <FlatList
                data={get(this, 'state.currentMovieData.cast', castData)}
                horizontal
                scrollEnabled
                showsHorizontalScrollIndicator={false}
                keyExtractor={item => item.uid}
                contentContainerStyle={styles.listParent}
                style={styles.flexOne}
                renderItem={({item}) => this.renderShowing(item)}
              />
            </View>
          </View>
          <Modal
            useNativeDriver
            hideModalContentWhileAnimating
            deviceHeight={screenHeight}
            deviceWidth={screenWidth}
            animationIn="fadeInUp"
            backdropColor={'black'}
            backdropOpacity={0.7}
            hasBackdrop={true}
            animationOut="fadeOutDown"
            onBackdropPress={() => this.closeView()}
            onBackButtonPress={() => this.closeView()}
            isVisible={this.state.modalVisible}>
            <View style={styles.centeredView}>
              <TouchableOpacity
                onPress={() => {
                  this.closeView();
                }}
                style={{width: wp(8), height: hp(3)}}>
                <Image
                  style={styles.headerImg}
                  source={require('../../assets/images/close-circle.png')}
                />
              </TouchableOpacity>
              <View style={styles.videoView}>
                <YoutubePlayer
                  height={500}
                  play={true}
                  videoId={
                    this.state.videoData && this.state.videoData.key
                      ? this.state.videoData.key
                      : 'sT7Wab-8QS8'
                  }
                  style={{height: hp(25)}}
                />
              </View>
            </View>
          </Modal>
        </ScrollView>
      </View>
    );
  }
}
const mapStateToProps = state => ({
  cardData: state.cardData,
});

const mapDispatchToProps = {
  getFilmData: (data, callback) => getFilm(data, callback),
  getVideoData: (data, callback) => getVideo(data, callback),
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieScreen);
