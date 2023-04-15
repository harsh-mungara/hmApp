import {
  GET_POPULAR_FETCH,
  GET_POPULAR_SUCCESS,
  GET_POPULAR_FAILURE,
} from '../reducers/GetPopularReducer';
import {get} from '../helper/ApiHelper';
import {BASE_URL} from '../helper/Api';

function get_cards_fetch() {
  return {
    type: GET_POPULAR_FETCH,
  };
}

function get_cards_success(data) {
  return {
    type: GET_POPULAR_SUCCESS,
    data,
  };
}

function get_cards_failure(error) {
  return {
    type: GET_POPULAR_FAILURE,
    error,
  };
}

export function getAllPopularFilm(callback) {
  return dispatch => {
    dispatch(get_cards_fetch());
    get(
      `${BASE_URL}/movie/popular?api_key=f1c608a1f3f43029a5c115c0d9422a62&language=en-US&page=10`,
      {},
      response => {
        if (response === undefined) {
          dispatch(get_cards_failure('Error'));
        } else {
          dispatch(get_cards_success(response.data.results));
          callback(response.data.results);
        }
      },
    );
  };
}
