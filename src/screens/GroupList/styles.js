import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    marginVertical: hp(2),
    justifyContent: 'center',
    padding: wp(5),
    borderWidth: wp(0.2),
    alignSelf: 'center',
    marginHorizontal: wp(2),
  },
  inputText: {
    height: 50,
    color: 'black',
  },
  headerView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp(2),
  },
  headerImgView: {
    width: wp(8),
    height: hp(3),
    marginHorizontal: wp(5),
    alignSelf: 'center',
  },
  headerImg: {
    width: wp('5%'),
    height: wp('5%'),
    tintColor: 'black',
    alignSelf: 'center',
  },
  emptyListView: {
    width: '100%',
    marginLeft: wp(5),
    alignItems: 'center',
  },
  emptyListTxt: {
    maxWidth: '90%',
    color: 'black',
  },
});