export const GET_ALLFILM_FETCH = 'GET_ALLFILM_FETCH';
export const GET_ALLFILM_SUCCESS = 'GET_ALLFILM_SUCCESS';
export const GET_ALLFILM_FAILURE = 'GET_ALLFILM_FAILURE';

const initialState = {
  isFetching: false,
  getpeopledata: '',
  fetchError: false,
  fetchErrorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ALLFILM_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchError: false,
        fetchErrorMessage: '',
      };
    case GET_ALLFILM_SUCCESS:
      return {
        isFetching: false,
        fetchError: false,
        fetchErrorMessage: '',
        getpeopledata: action.peopledata,
      };
    case GET_ALLFILM_FAILURE:
      return {
        isFetching: false,
        fetchError: true,
        fetchErrorMessage: action.error,
      };

    default:
      return state;
  }
};
