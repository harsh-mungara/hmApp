import {StyleSheet} from 'react-native';
import {color} from 'react-native-reanimated';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '../../utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themebg,
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
    width: wp(30),
    height: hp(5),
    borderRadius: wp(8),
    color: colors.white,
    marginLeft: wp(1),
    backgroundColor: 'transparent',
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
    color: colors.white,
  },
  seeTagLabel: {
    fontSize: wp(3),
  },
  showHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp(2),
  },
  amcTitle: {
    maxWidth: wp(40),
    fontSize: wp(3.5),
    color: colors.white,
    textAlign: 'left',
  },
  ratingText: {
    fontSize: wp(3.5),
  },
  starImg: {
    width: wp(4),
    height: hp(4),
    tintColor: colors.lightBlue,
    resizeMode: 'contain',
    marginRight: wp(1),
    alignSelf: 'center',
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
    width: wp(40),
    height: wp(20),
    borderRadius: wp(2),
    resizeMode: 'contain',
    marginBottom: hp(2),
    // marginRight: wp(5),
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
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: wp(5),
  },
  renderView: {
    width: '50%',
    marginHorizontal: wp(1),
    marginTop: hp(3),
    // justifyContent: 'center',
    // alignItems: 'center',
    // flexDirection: 'row',
  },
  emptyLabel: {
    fontSize: wp(4),
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tabIndi: {
    backgroundColor: colors.blue10,
    height: hp(0.5),
  },
  portoHeader: {
    flexDirection: 'row',
    backgroundColor: colors.navyBlue10,
    height: hp(15),
    borderRadius: wp(5),
    justifyContent: 'space-around',
    marginVertical: hp(4),
    borderWidth: wp(0.3),
    borderColor: colors.blue100,
  },
  valueTxt: {
    fontSize: wp(4.5),
    color: colors.white,
  },
  countTxt: {
    fontSize: wp(6),
    color: colors.lightBlue,
  },
  portoParent: {
    justifyContent: 'space-evenly',
    width: '40%',
    // alignItems: 'center',
  },
  linkTxt: {
    fontSize: wp(4.5),
    color: colors.black10,
  },
  portoChild: {
    backgroundColor: colors.lightBlue,
    width: '40%',
    height: hp(5),
    borderRadius: wp(8),
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  searchView: {
    backgroundColor: colors.navy100,
    borderRadius: wp(8),
    width: wp(40),
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  footerView: {
    flexDirection: 'row',
    backgroundColor: colors.navyBlue10,
    height: hp(5),
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignSelf: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: wp(5),
    borderBottomRightRadius: wp(5),
    borderWidth: wp(0.3),
    borderColor: colors.blue100,
  },
  footerTxt: {
    fontSize: wp(4.5),
    color: colors.lightBlue,
  },
  backImg: {
    width: wp(5),
    height: hp(5),
    tintColor: colors.white,
    resizeMode: 'contain',
    marginRight: wp(1),
    alignSelf: 'center',
  },
  backView: {
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
  },
  listStyle: {
    marginBottom: hp(10),
  },
});
