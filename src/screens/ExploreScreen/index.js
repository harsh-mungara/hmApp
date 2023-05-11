import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  RefreshControl,
  FlatList,
  TextInput,
  Alert,
} from 'react-native';
import {get, isEmpty} from 'lodash';

import {imgGenerator} from '@helper/utils';
import {styles} from './styles';
import {Tab} from 'react-native-elements';
import {createIconSetFromIcoMoon} from 'react-native-vector-icons';
import icoMoonConfig from '@utils/selection.json';
const Linericon = createIconSetFromIcoMoon(
  icoMoonConfig,
  'icomoon',
  'icomoon.ttf',
);

const AMCList = [
  {id: 1, name: 'Aditya Birla Sun Life AMC', imageURL: ''},
  {id: 2, name: 'Axis Asset Management Company Ltd', imageURL: ''},
  {id: 3, name: 'ICICI Prudential AMC Ltd', imageURL: ''},
  {id: 4, name: 'Kotak Mahindra Asset Management Company Ltd', imageURL: ''},
  {id: 5, name: 'Motilal Oswal Asset Management Company Ltd', imageURL: ''},
  {id: 6, name: 'Nippon Life India Asset Management Ltd', imageURL: ''},
  {id: 7, name: 'PGIM India', imageURL: ''},
  {id: 8, name: 'Reliance Wealth Management Ltd', imageURL: ''},
  {id: 9, name: 'SBI Funds Management Ltd', imageURL: ''},
  {id: 10, name: 'Sharekhan Ltd', imageURL: ''},
  {id: 11, name: 'Aditya Birla Sun Life AMC', imageURL: ''},
  {id: 12, name: 'Axis Asset Management Company Ltd', imageURL: ''},
  {id: 13, name: 'ICICI Prudential AMC Ltd', imageURL: ''},
  {id: 14, name: 'Kotak Mahindra Asset Management Company Ltd', imageURL: ''},
  {id: 15, name: 'Motilal Oswal Asset Management Company Ltd', imageURL: ''},
  {id: 16, name: 'Nippon Life India Asset Management Ltd', imageURL: ''},
  {id: 17, name: 'PGIM India', imageURL: ''},
  {id: 18, name: 'Reliance Wealth Management Ltd', imageURL: ''},
  {id: 19, name: 'SBI Funds Management Ltd', imageURL: ''},
  {id: 20, name: 'Sharekhan Ltd', imageURL: ''},
];

class ExploreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amcList: AMCList,
      onRefresh: false,
      refreshKey: new Date().getTime(),
      index: 0,
      isAll: false,
    };
  }

  componentDidMount() {}

  _onRefresh = async () => {
    this.setState({onRefresh: true});
    // await this.getMovies();
    this.setState({onRefresh: false});
  };

  filteredAMC = search => {
    const lowSearch = search.toLowerCase().trim();
    const groupItems = this.state.amcList.sort((a, b) =>
      a.name.localeCompare(b.name),
    );
    const filterData = groupItems.filter(data => {
      if (data.name.toLowerCase().includes(lowSearch)) {
        return data;
      }
    });

    if (!isEmpty(filterData) && search.length > 0) {
      this.setState({amcList: filterData});
    } else if (isEmpty(filterData) && search.length > 0) {
      this.setState({amcList: []});
    } else {
      this.setState({
        amcList: AMCList.sort((a, b) => a.name.localeCompare(b.name)),
      });
    }
  };

  renderAMC = item => {
    return (
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
        <Text style={styles.amcTitle} numberOfLines={3}>
          {get(item, 'name')}
        </Text>
      </View>
    );
  };

  render() {
    const amcList = this.state.isAll
      ? this.state.amcList
      : this.state.amcList.slice(0, 6);
    return (
      <View key={this.state.refreshKey} style={styles.container}>
        <Tab
          value={this.state.index}
          onChange={e => this.setState({index: e})}
          indicatorStyle={styles.tabIndi}>
          <Tab.Item
            title="Mutual Funds"
            iconPosition="left"
            titleStyle={{fontSize: 12}}
            containerStyle={{backgroundColor: 'transparent'}}
            icon={{name: 'timer', type: 'ionicon', color: 'white'}}
          />
          <Tab.Item
            title="Stocks"
            iconPosition="left"
            titleStyle={{fontSize: 12}}
            containerStyle={{backgroundColor: 'transparent'}}
            icon={{name: 'heart', type: 'ionicon', color: 'white'}}
          />
        </Tab>
        <ScrollView
          contentContainerStyle={{flex: 1}}
          // refreshControl={
          //   <RefreshControl
          //     refreshing={this.state.onRefresh}
          //     onRefresh={() => this._onRefresh()}
          //   />
          // }
        >
          {!this.state.isAll && (
            <View style={styles.portoHeader}>
              <View style={styles.portoParent}>
                <Text style={styles.valueTxt}>{'Portfolio Value'}</Text>
                <Text style={styles.countTxt}>{'₹ 0'}</Text>
              </View>
              <TouchableOpacity style={styles.portoChild}>
                <Text style={styles.linkTxt}>{'Link Portfolio'}</Text>
              </TouchableOpacity>
            </View>
          )}

          <View>
            <View style={styles.showHeader}>
              <View style={styles.backView}>
                {this.state.isAll && (
                  <TouchableOpacity
                    onPress={() => this.setState({isAll: false})}>
                    <Image
                      style={styles.backImg}
                      source={require('../../assets/images/ic_back.png')}
                    />
                  </TouchableOpacity>
                )}
                <Text style={styles.tagLabel}>{'AMC'}</Text>
              </View>
              <View style={styles.searchView}>
                <TextInput
                  style={styles.inputText}
                  placeholder="Search AMC"
                  onChangeText={text => this.filteredAMC(text)}
                  placeholderTextColor={'white'}
                />
                {/* <Image
                  style={styles.starImg}
                  source={require('../../assets/images/snack-icon.png')}
                /> */}
                <Linericon name="money" size={28} color="red" />
              </View>
            </View>
            <FlatList
              data={amcList}
              renderItem={({item}) => this.renderAMC(item)}
              contentContainerStyle={styles.listParentContainer}
              // columnWrapperStyle={{justifyContent: 'center'}}
              style={styles.listStyle}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
          {!this.state.isAll && (
            <TouchableOpacity
              onPress={() => this.setState({isAll: true})}
              style={styles.footerView}>
              <Text style={styles.footerTxt}>{'See All AMC'}</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default ExploreScreen;
