import {combineReducers} from 'redux';
import GetPeopleReducer from './GetVideoReducer';
import GetCardsReducer from './GetPopularReducer';
import GetFilmReducer from './GetFilmReducer';

const Reducers = combineReducers({
  peopleList: GetPeopleReducer,
  cardData: GetCardsReducer,
  filmData: GetFilmReducer,
});

export default Reducers;
