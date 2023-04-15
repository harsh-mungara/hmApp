import {
  GET_VIDEO_FETCH,
  GET_VIDEO_SUCCESS,
  GET_VIDEO_FAILURE,
} from '../reducers/GetVideoReducer';
import {get} from '../helper/ApiHelper';
import {BASE_URL} from '../helper/Api';

function get_video_fetch() {
  return {
    type: GET_VIDEO_FETCH,
  };
}

function get_video_success(peopledata) {
  return {
    type: GET_VIDEO_SUCCESS,
    peopledata,
  };
}

function get_video_failure(error) {
  return {
    type: GET_VIDEO_FAILURE,
    error,
  };
}

export function getVideo(params, callback) {
  return dispatch => {
    dispatch(get_video_fetch());
    get(
      `${BASE_URL}/movie/${params}/videos?api_key=f1c608a1f3f43029a5c115c0d9422a62&language=en-US`,
      {},
      response => {
        if (response === undefined) {
          dispatch(get_video_failure('Error'));
        } else {
          dispatch(get_video_success(response.data.results));
          callback(response.data.results);
        }
      },
    );
  };
}
