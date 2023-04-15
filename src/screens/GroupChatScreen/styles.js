import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
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
