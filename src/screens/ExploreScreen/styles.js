import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import colors from '@utils/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.themebg,
    padding: wp(2),
  },
  inputText: {
    width: wp(30),
    height: hp(5),
    borderRadius: wp(8),
    color: colors.white,
    marginLeft: wp(3),
    backgroundColor: 'transparent',
    fontFamily: 'Inter-Regular',
  },

  tagLabel: {
    fontSize: wp(5.5),
    color: colors.white,
    fontFamily: 'Inter-Bold',
  },
  showHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: wp(2),
    paddingHorizontal: wp(4),
  },
  amcTitle: {
    maxWidth: wp(40),
    fontSize: wp(3.5),
    color: colors.white,
    textAlign: 'left',
    fontFamily: 'Inter-Regular',
  },
  popularImg: {
    borderRadius: wp(2),
    resizeMode: 'contain',
    marginBottom: hp(2),
  },
  listParentContainer: {
    flexGrow: 1,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: wp(5),
    marginTop: hp(1),
  },
  renderView: {
    width: '50%',
    marginHorizontal: wp(1),
    marginBottom: hp(3),
  },
  tabIndi: {
    backgroundColor: colors.blue10,
    height: hp(0.3),
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
    fontFamily: 'Inter-SemiBold',
  },
  countTxt: {
    fontSize: wp(6),
    color: colors.lightBlue,
    fontFamily: 'Inter-Bold',
  },
  portoParent: {
    justifyContent: 'space-evenly',
    width: '40%',
  },
  linkTxt: {
    fontSize: wp(4.5),
    color: colors.black10,
    fontFamily: 'Inter-SemiBold',
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
    backgroundColor: colors.navy200,
    borderRadius: wp(8),
    width: wp(40),
    flexDirection: 'row',
    justifyContent: 'space-around',
    borderWidth: wp(0.1),
    borderColor: 'gray',
  },
  footerParent: {
    position: 'absolute',
    bottom: hp(0),
    left: 0,
    right: 0,
    backgroundColor: colors.themebg,
    height: hp(6),
  },
  footerView: {
    flexDirection: 'row',
    backgroundColor: colors.navyBlue10,
    height: hp(5),
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomLeftRadius: wp(5),
    borderBottomRightRadius: wp(5),
    borderWidth: wp(0.3),
    borderColor: colors.blue100,
    width: '100%',
  },
  footerTxt: {
    fontSize: wp(4.3),
    color: colors.lightBlue,
    fontFamily: 'Inter-Bold',
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
  amcIcon: {
    fontSize: wp(5),
    color: colors.lightBlue,
    alignSelf: 'center',
    marginRight: wp(3),
  },
  backStyle: {
    color: colors.white,
  },
  tabIcon: {
    fontSize: wp(6),
    color: colors.secondary300,
    alignSelf: 'center',
  },
  tabLabel: {
    fontSize: wp(3.5),
    color: colors.secondary300,
    fontFamily: 'Inter-SemiBold',
  },
  tabBg: {
    backgroundColor: 'transparent',
  },
  scrollContainer: {
    flex: 1,
  },
});
