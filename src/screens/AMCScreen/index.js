/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {get} from 'lodash';
import {Header} from 'react-native-elements';
import {imgGenerator} from '@helper/utils';
import {styles} from './styles';
import CustomIcon from '@customIcon';
import {BarChart, LineChart} from 'react-native-chart-kit';
import Pie from 'react-native-pie';
import colors from '@utils/colors';
import {
  descList,
  pieList,
  yearList,
  objective,
  attributes,
  description,
  detailDescList,
} from '@utils/constants';
class AMCScreen extends React.Component {
  state = {
    amcId: this.props.route.params.amcId,
    amcName: this.props.route.params.name,
    hasDetail: false,
  };

  componentDidMount() {}

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
          <Text style={[styles.amcTitle, styles.amcNumber]} numberOfLines={2}>
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
        <View style={[styles.schemeView, styles.schemeBg]}>
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

  renderYear = (item, index) => {
    return (
      <View style={[styles.yearView, index === 2 && styles.yearContainer]}>
        <Text style={[styles.yearTitle, index === 2 && styles.yearBold]}>
          {get(item, 'title')}
        </Text>
      </View>
    );
  };

  render() {
    const chartConfig = {
      backgroundGradientFrom: 'transparent',
      backgroundGradientFromOpacity: 1,
      backgroundGradientTo: 'transparent',
      backgroundGradientToOpacity: 1,
      color: (opacity = 1) => colors.lightBlue,
      barPercentage: 1,
      barRadius: 4,
      useShadowColorFromDataset: false,
      propsForBackgroundLines: {
        strokeDasharray: '',
        stroke: 'transparent',
        strokeWidth: 0,
      },
      propsForVerticalLabels: {
        fill: 'yellow',
        fontSize: wp(4),
      },
    };
    return (
      <View style={styles.container}>
        <ScrollView>
          <Header
            containerStyle={styles.headerView}
            leftComponent={
              <TouchableOpacity
                onPress={() => {
                  this.props.navigation.goBack();
                }}>
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
                }}>
                <Image
                  style={styles.notiImg}
                  source={require('../../assets/images/Bell-icon.png')}
                />
              </TouchableOpacity>
            }
          />

          <View style={styles.parentContainer}>
            <View style={styles.parentHeader}>
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
                  <View style={styles.textView} />
                  <Text style={styles.descLabel}>{objective}</Text>

                  <Text style={styles.objLabel}>{'Investment Attributes'}</Text>
                  <View style={styles.textView} />
                  <Text style={styles.descLabel}>{attributes}</Text>
                </>
              ) : (
                <Text style={styles.descLabel}>{description}</Text>
              )}

              <FlatList
                data={this.state.hasDetail ? detailDescList : descList}
                renderItem={({item}) => this.renderAMC(item)}
                contentContainerStyle={styles.listParentContainer}
                columnWrapperStyle={styles.colStyle}
                style={styles.listStyle}
                keyExtractor={item => item.id}
                numColumns={2}
              />
              {!this.state.hasDetail && (
                <Text style={styles.schemeLabel}>{'Schemes'}</Text>
              )}

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

              {this.state.hasDetail && (
                <View style={styles.graphView}>
                  <View style={styles.stockView}>
                    <CustomIcon name={'stock'} style={styles.stockIcon} />
                    <Text style={styles.stockLabel}>{'14.09%'}</Text>
                  </View>
                  <LineChart
                    style={styles.chartView}
                    data={{
                      labels: [
                        '1 Month',
                        '6 Month',
                        '1 Year',
                        '3 Year',
                        '5 Year',
                      ],
                      datasets: [
                        {
                          data: [
                            80, 25, 28, 40, 49, 23, 56, 48, 59, 58, 62, 60, 28,
                            18, 32, 34, 53, 22, 48, 49, 68, 69, 75, 89, 85, 100,
                          ],
                          colors: [
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                          ],
                        },
                      ],
                    }}
                    width={Dimensions.get('window').width - wp(25)}
                    height={100}
                    fromNumber={0}
                    fromZero={true}
                    chartConfig={chartConfig}
                    showBarTops={false}
                    showValuesOnTopOfBars={false}
                    withHorizontalLabels={false}
                    withCustomBarColorFromData={true}
                    flatColor={true}
                  />
                  <BarChart
                    style={styles.barView}
                    data={{
                      labels: [
                        '1 Month',
                        '6 Month',
                        '1 Year',
                        '3 Year',
                        '5 Year',
                      ],
                      datasets: [
                        {
                          data: [
                            60, 45, 98, 80, 99, 43, 63, 44, 60, 88, 45, 69, 88,
                            45, 78, 63, 83, 48, 89, 65, 50, 99, 53, 89, 65, 12,
                          ],
                          colors: [
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                            () => colors.blue100,
                          ],
                        },
                      ],
                    }}
                    width={Dimensions.get('window').width - wp(25)}
                    height={100}
                    fromNumber={100}
                    chartConfig={chartConfig}
                    showBarTops={false}
                    showValuesOnTopOfBars={false}
                    withHorizontalLabels={false}
                    withCustomBarColorFromData={true}
                    flatColor={true}
                  />
                  <FlatList
                    data={yearList}
                    horizontal
                    renderItem={({item, index}) => this.renderYear(item, index)}
                    contentContainerStyle={styles.listYearContainer}
                    style={styles.listStyle}
                    keyExtractor={item => item.id}
                  />
                </View>
              )}
            </View>

            {this.state.hasDetail && (
              <FlatList
                data={pieList}
                renderItem={({item}) => this.renderPie(item)}
                contentContainerStyle={styles.listPieContainer}
                columnWrapperStyle={styles.colStyle}
                style={styles.listStyle}
                keyExtractor={item => item.id}
                numColumns={2}
              />
            )}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default AMCScreen;
