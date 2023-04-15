import {
  GET_ALLFILM_FETCH,
  GET_ALLFILM_SUCCESS,
  GET_ALLFILM_FAILURE,
} from '../reducers/GetAllFilmsReducer';
import {get} from '../helper/ApiHelper';
import {BASE_URL} from '../helper/Api';

function get_allfilm_fetch() {
  return {
    type: GET_ALLFILM_FETCH,
  };
}

function get_allfilm_success(peopledata) {
  return {
    type: GET_ALLFILM_SUCCESS,
    peopledata,
  };
}

function get_allfilm_failure(error) {
  return {
    type: GET_ALLFILM_FAILURE,
    error,
  };
}

export function getAllFilm(callback) {
  return dispatch => {
    dispatch(get_allfilm_fetch());
    get(
      `${BASE_URL}/movie/now_playing?api_key=f1c608a1f3f43029a5c115c0d9422a62&language=en-US&page=10`,
      {},
      response => {
        if (response === undefined) {
          dispatch(get_allfilm_failure('Error'));
        } else {
          dispatch(get_allfilm_success(response.data.results));
          callback(response.data.results);
        }
      },
    );
  };
}
