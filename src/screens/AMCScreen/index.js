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
import {Header} from 'react-native-elements';
import {imgGenerator} from '@helper/utils';
import {styles} from './styles';
import CustomIcon from '@customIcon';
import {LineChart, StackedBarChart} from 'react-native-chart-kit';
import * as Progress from 'react-native-progress';
import Pie from 'react-native-pie';

const descList = [
  {
    title: 'AUM (Cr.)',
    number: '1457.81',
    color: '#015390',
    icon: 'sack-xmark',
  },
  {
    title: 'As On',
    number: '31-09-2023',
    color: '#733201',
    icon: 'calendar',
  },
  {
    title: 'No. of Clients',
    number: '1994',
    color: '#6C102D',
    icon: 'coins-solid',
  },
  {
    title: 'No. of Strategy',
    number: '1457.81',
    color: '#736B01',
    icon: 'stock',
  },
];

const pieList = [
  {
    title: 'Large Cap',
    number: '18.20',
    primaryColor: '#003A65',
    secondaryColor: '#24A1FE',
  },
  {
    title: 'Mid Cap',
    number: '37.13',
    primaryColor: '#4C0C1F',
    secondaryColor: '#E23F71',
  },
  {
    title: 'Small Cap',
    number: '36.90',
    primaryColor: '#736B01',
    secondaryColor: '#FEEE24',
  },
  {
    title: 'Cash & Equivalent',
    number: '7.77',
    primaryColor: '#733201',
    secondaryColor: '#FE8124',
  },
];

const objective =
  'The Objective of SSP is to create Long term wealth creation in focused sector where 80% portfolio will be invested  in 4 to 6 sectors with Effective screener(P-Score) to identify future winners.';
const attributes =
  'The investment approach is founded on four pillars. Sustainable growth over long-term in select industries, Focus on businesses and sector that consistently create value through favourable industry operating conditions.';
const description =
  'Aditya Birla Sun Life Asset Management Company Ltd., formerly known as Birla Sun Life Asset Management Company Limited, is an investment managing company registered under the Securities and Exchange Board of India.';
const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;
class AMCScreen extends React.Component {
  state = {
    users: null,
    videoData: [],
    currentUserData: [],
    fetchedUsers: null,
    onRefresh: false,
    amcId: this.props.route.params.amcId,
    amcName: this.props.route.params.name,
    modalVisible: false,
    hasDetail: false,
  };

  componentDidMount() {}

  _onRefresh = async () => {
    this.setState({onRefresh: true});
    this.setState({onRefresh: false});
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

  renderAMC = item => {
    return (
      <View style={[styles.renderView, {backgroundColor: item.color}]}>
        <View style={styles.innerView}>
          <CustomIcon name={get(item, 'icon')} style={styles.amcIcon} />
          <Text style={styles.amcTitle} numberOfLines={1}>
            {get(item, 'title')}
          </Text>
          <Text style={styles.amcTitle} numberOfLines={2}>
            {get(item, 'number')}
          </Text>
        </View>
      </View>
    );
  };

  listSchemeHeader = () => {
    return (
      <View style={styles.schemeView}>
        <Text style={styles.schemeLabelName}>{'1 Yr'}</Text>
        <Text style={styles.schemeLabelName}>{'3 Yr'}</Text>
        <Text style={styles.schemeLabelName}>{'5 Yr'}</Text>
      </View>
    );
  };

  renderScheme = item => {
    const schemeName =
      'Aditya Birla Sun Life - Select Sector Portfolio - Small & Mid Cap';
    return (
      <TouchableOpacity
        onPress={() =>
          this.setState({hasDetail: !this.state.hasDetail, amcName: schemeName})
        }
        style={styles.childScheme}>
        <Text style={styles.childLabelName}>{schemeName}</Text>
        <View style={styles.deviderView} />
        <View style={[styles.schemeView, {backgroundColor: 'transparent'}]}>
          <Text style={styles.schemeLabelName}>{'7.23 %'}</Text>
          <Text style={styles.schemeLabelName}>{'36.09 %'}</Text>
          <Text style={styles.schemeLabelName}>{'8.89 %'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  renderPie = item => {
    return (
      <View style={styles.pieView}>
        <Text style={styles.pieTitle}>{get(item, 'title')}</Text>
        <View>
          <Pie
            radius={wp(18)}
            sections={[
              {
                percentage: get(item, 'number'),
                color: get(item, 'primaryColor'),
              },
              {
                percentage: 100 - get(item, 'number'),
                color: get(item, 'secondaryColor'),
              },
            ]}
            innerRadius={wp(13)}
            series={[10, 20, 30, 40]}
            strokeCap={'butt'}
          />
          <View style={styles.pieInner}>
            <Text style={styles.pieTitle}>{get(item, 'number')}%</Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const chartConfig = {
      backgroundGradientFrom: '#1E2923',
      backgroundGradientFromOpacity: 0,
      backgroundGradientTo: '#08130D',
      backgroundGradientToOpacity: 0.5,
      color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
      strokeWidth: 2, // optional, default 3
      barPercentage: 0.1,
      useShadowColorFromDataset: false, // optional
    };
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
                  style={styles.logoImg}
                  source={require('../../assets/images/applogo.png')}
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
                  style={styles.logoImg}
                  source={require('../../assets/images/Bell-icon.png')}
                />
              </TouchableOpacity>
            }
          />

          <View style={styles.parentContainer}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly',
                alignSelf: 'flex-start',
              }}>
              <TouchableOpacity
                onPress={() => {
                  this.state.hasDetail
                    ? this.setState({
                        hasDetail: false,
                        amcName: this.props.route.params.name,
                      })
                    : this.props.navigation.goBack();
                }}
                style={{marginRight: wp(2)}}>
                <CustomIcon name={'arrow'} style={styles.backIcon} />
                {/* <Image
                  style={styles.headerImg}
                  source={require('../../assets/images/ic_back.png')}
                /> */}
              </TouchableOpacity>
              <Image
                style={styles.listImg}
                source={require('../../assets/images/birla_cover.png')}
              />
              <Text style={styles.tagLabel} numberOfLines={3}>
                {get(this, 'state.amcName')}
              </Text>
            </View>
            <View style={styles.childContainer}>
              {this.state.hasDetail ? (
                <>
                  <Text style={styles.objLabel}>{'Investment Objective'}</Text>
                  <Text style={styles.descLabel}>{objective}</Text>

                  <Text style={styles.objLabel}>{'Investment Attributes'}</Text>
                  <Text style={styles.descLabel}>{attributes}</Text>
                </>
              ) : (
                <Text style={styles.descLabel}>{description}</Text>
              )}

              <FlatList
                data={descList}
                renderItem={({item}) => this.renderAMC(item)}
                contentContainerStyle={styles.listParentContainer}
                columnWrapperStyle={{justifyContent: 'center'}}
                style={styles.listStyle}
                keyExtractor={item => item.id}
                numColumns={2}
              />
              <Text style={styles.schemeLabel}>{'Schemes'}</Text>

              {!this.state.hasDetail && (
                <FlatList
                  data={descList}
                  renderItem={({item}) => this.renderScheme(item)}
                  contentContainerStyle={styles.listSchemeContainer}
                  style={styles.listStyle}
                  keyExtractor={item => item.id}
                  ListHeaderComponent={this.listSchemeHeader}
                  ItemSeparatorComponent={() => {
                    return <View style={styles.deviderView} />;
                  }}
                />
              )}
            </View>

            {this.state.hasDetail && (
              <FlatList
                data={pieList}
                renderItem={({item}) => this.renderPie(item)}
                contentContainerStyle={styles.listPieContainer}
                columnWrapperStyle={{justifyContent: 'center'}}
                style={styles.listStyle}
                keyExtractor={item => item.id}
                numColumns={2}
              />
            )}

            {/* <LineChart
              data={{
                labels: ['1 Month', '6 Month', '1 Year', '3 Year', '5 Year'],
                datasets: [
                  {
                    data: [
                      20, 45, 28, 80, 99, 43, 23, 24, 10, 8, 5, 9, 18, 45, 78,
                      23, 23, 28, 89, 65, 5, 99, 53, 89, 65, 12,
                    ],
                  },
                ],
              }}
              yAxisInterval={1000}
              xLabelsOffset={5}
              yLabelsOffset={5000}
              transparent={true}
              width={screenWidth}
              height={250}
              verticalLabelRotation={30}
              chartConfig={chartConfig}
              bezier
            /> */}

            {/* <View>
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
            </View> */}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AMCScreen;
