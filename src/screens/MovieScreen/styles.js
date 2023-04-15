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
  parentContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: wp(5),
    borderRadius: wp(4),
    marginTop: hp(-2),
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
    width: wp(30),
    height: wp(35),
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
    height: hp(5),
  },
  tagLabel: {
    fontSize: wp(6),
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
    maxWidth: wp(50),
    fontSize: wp(5),
    fontWeight: 'bold',
  },
  ratingText: {
    fontSize: wp(4),
  },
  playText: {
    fontSize: wp(4),
    color: 'white',
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
    marginVertical: hp(1),
  },
  showingParent: {
    marginRight: wp(5),
  },
  popularImg: {
    width: wp(30),
    height: wp(40),
    borderRadius: wp(2),
    resizeMode: 'contain',
    marginBottom: hp(2),
    marginRight: wp(5),
  },
  thumbNailView: {
    width: '100%',
    height: hp(45),
  },
  thumbNailImg: {
    width: '100%',
    height: hp(45),
  },
  headerView: {
    backgroundColor: 'transparent',
    justifyContent: 'space-around',
    borderBottomColor: 'transparent',
    position: 'absolute',
    top: hp(1),
    zIndex: 1,
  },
  headerImg: {
    width: wp('5%'),
    height: wp('5%'),
    tintColor: 'white',
    alignSelf: 'center',
  },
  genreView: {
    borderRadius: wp(5),
    width: wp('20%'),
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2),
    backgroundColor: '#F2F4F7',
    height: hp(4),
  },
  genreTxt: {
    color: '#11468F',
    maxWidth: wp('18%'),
  },
  seeView: {
    width: '20%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: wp(5),
    height: hp(4),
    borderWidth: hp(0.2),
    borderColor: 'black',
  },
  descHeader: {
    marginVertical: hp(3),
  },
  playView: {
    position: 'absolute',
    justifyContent: 'center',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,.6)',
  },
  playImg: {
    width: wp(15),
    height: wp(15),
    tintColor: 'white',
    resizeMode: 'contain',
  },
  centeredView: {
    flex: 1,
  },
  descText: {
    fontSize: wp(4),
    lineHeight: hp(3),
    marginVertical: hp(2),
  },
  listParent: {
    flexGrow: 1,
    marginVertical: hp(3),
  },
  flexOne: {
    flex: 1,
  },
  detailView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: hp(4),
  },
  detailText: {
    fontSize: wp(4),
    color: 'black',
    fontWeight: 'bold',
  },
  videoView: {
    marginTop: hp(5),
  },
  vectorImg: {
    width: wp(4),
    height: hp(4),
    tintColor: 'black',
    resizeMode: 'contain',
    marginHorizontal: wp(1),
  },
  flexSeven: {
    flex: 0.7,
  },
  flexThree: {
    flex: 0.3,
  },
});
