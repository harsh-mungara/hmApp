export const GET_POPULAR_FETCH = 'GET_POPULAR_FETCH';
export const GET_POPULAR_SUCCESS = 'GET_POPULAR_SUCCESS';
export const GET_POPULAR_FAILURE = 'GET_POPULAR_FAILURE';

const initialState = {
  isFetching: false,
  getcardsdata: '',
  fetchError: false,
  fetchErrorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_POPULAR_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchError: false,
        fetchErrorMessage: '',
      };
    case GET_POPULAR_SUCCESS:
      return {
        isFetching: false,
        fetchError: false,
        fetchErrorMessage: '',
        getcardsdata: action.data,
      };
    case GET_POPULAR_FAILURE:
      return {
        isFetching: false,
        fetchError: true,
        fetchErrorMessage: action.error,
      };

    default:
      return state;
  }
};
