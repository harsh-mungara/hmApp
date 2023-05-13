/* eslint-disable react/no-unstable-nested-components */
import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import {get, isEmpty} from 'lodash';
import {styles} from './styles';
import {Tab} from 'react-native-elements';
import CustomIcon from '@customIcon';
import {AMCList} from '@utils/constants';
class ExploreScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      amcList: AMCList,
      refreshKey: new Date().getTime(),
      index: 0,
      isAll: false,
    };
  }

  componentDidMount() {}

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
            this.props.navigation.navigate('AMCScreen', {
              amcId: get(item, 'id'),
              name: get(item, 'name'),
              imageUrl: item.imageURL,
            });
          }}>
          <Image style={styles.popularImg} source={item.imageURL} />
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
            title={'Mutual Funds'}
            iconPosition="left"
            titleStyle={styles.tabLabel}
            containerStyle={styles.tabBg}
            icon={() => {
              return <CustomIcon name={'funds'} style={styles.tabIcon} />;
            }}
          />
          <Tab.Item
            title="Stocks"
            iconPosition="left"
            titleStyle={styles.tabLabel}
            containerStyle={styles.tabBg}
            icon={() => {
              return <CustomIcon name={'stocks'} style={styles.tabIcon} />;
            }}
          />
        </Tab>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
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
                    <CustomIcon
                      name={'arrow'}
                      style={[styles.amcIcon, styles.backStyle]}
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
                <CustomIcon name={'search'} style={styles.amcIcon} />
              </View>
            </View>
            <FlatList
              data={amcList}
              renderItem={({item}) => this.renderAMC(item)}
              contentContainerStyle={styles.listParentContainer}
              style={styles.listStyle}
              keyExtractor={item => item.id}
              numColumns={2}
            />
          </View>
          {!this.state.isAll && (
            <View style={styles.footerParent}>
              <TouchableOpacity
                onPress={() => this.setState({isAll: true})}
                style={styles.footerView}>
                <Text style={styles.footerTxt}>{'See All AMC'}</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </View>
    );
  }
}

export default ExploreScreen;
