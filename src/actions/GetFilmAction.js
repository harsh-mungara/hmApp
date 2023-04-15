import {
  GET_FILM_FETCH,
  GET_FILM_SUCCESS,
  GET_FILM_FAILURE,
} from '../reducers/GetFilmReducer';
import {get} from '../helper/ApiHelper';
import {BASE_URL} from '../helper/Api';

function get_film_fetch() {
  return {
    type: GET_FILM_FETCH,
  };
}

function get_film_success(data) {
  return {
    type: GET_FILM_SUCCESS,
    data,
  };
}

function get_film_failure(error) {
  return {
    type: GET_FILM_FAILURE,
    error,
  };
}

export function getFilm(params, callback) {
  return dispatch => {
    dispatch(get_film_fetch());
    get(
      `${BASE_URL}/movie/${params}?api_key=f1c608a1f3f43029a5c115c0d9422a62&language=en-US`,
      {},
      response => {
        if (response === undefined) {
          dispatch(get_film_failure('Error'));
        } else {
          dispatch(get_film_success(response.data));
          callback(response.data);
        }
      },
    );
  };
}
