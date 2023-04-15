export const GET_VIDEO_FETCH = 'GET_VIDEO_FETCH';
export const GET_VIDEO_SUCCESS = 'GET_VIDEO_SUCCESS';
export const GET_VIDEO_FAILURE = 'GET_VIDEO_FAILURE';

const initialState = {
  isFetching: false,
  getpeopledata: '',
  fetchError: false,
  fetchErrorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_VIDEO_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchError: false,
        fetchErrorMessage: '',
      };
    case GET_VIDEO_SUCCESS:
      return {
        isFetching: false,
        fetchError: false,
        fetchErrorMessage: '',
        getpeopledata: action.peopledata,
      };
    case GET_VIDEO_FAILURE:
      return {
        isFetching: false,
        fetchError: true,
        fetchErrorMessage: action.error,
      };

    default:
      return state;
  }
};
