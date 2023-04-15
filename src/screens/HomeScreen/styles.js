import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
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
    height: 50,
    color: 'black',
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
    color: 'black',
  },
  seeTagLabel: {
    fontSize: wp(3),
  },
  showHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  movieTitle: {
    maxWidth: wp(45),
    fontSize: wp(4.5),
    fontWeight: 'bold',
  },
  poularTitle: {
    maxWidth: wp(60),
    fontSize: wp(4.5),
    fontWeight: 'bold',
  },
  ratingText: {
    fontSize: wp(3.5),
  },
  starImg: {
    width: wp(4),
    height: hp(4),
    tintColor: 'orange',
    resizeMode: 'contain',
    marginHorizontal: wp(1),
  },
  starView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: hp(0.5),
  },
  showingParent: {
    marginRight: wp(2),
  },
  popularImg: {
    width: wp(30),
    height: wp(40),
    borderRadius: wp(2),
    resizeMode: 'contain',
    marginBottom: hp(2),
    marginRight: wp(5),
  },
  hiddenView: {
    width: wp(20),
    justifyContent: 'center',
    height: hp(8),
    marginVertical: hp(5),
    alignItems: 'center',
  },
  saveImg: {
    width: wp(6),
    height: hp(6),
    resizeMode: 'contain',
    marginHorizontal: wp(1),
    tintColor: 'black',
  },
  listParent: {
    flexGrow: 1,
    marginVertical: hp(3),
  },
  renderView: {
    flexDirection: 'row',
  },
  popularView: {
    marginTop: hp(2),
  },
});
