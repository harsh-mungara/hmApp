export const GET_FILM_FETCH = 'GET_FILM_FETCH';
export const GET_FILM_SUCCESS = 'GET_FILM_SUCCESS';
export const GET_FILM_FAILURE = 'GET_FILM_FAILURE';

const initialState = {
  isFetching: false,
  getaddressdata: '',
  fetchError: false,
  fetchErrorMessage: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_FILM_FETCH:
      return {
        ...state,
        isFetching: true,
        fetchError: false,
        fetchErrorMessage: '',
      };
    case GET_FILM_SUCCESS:
      return {
        isFetching: false,
        fetchError: false,
        fetchErrorMessage: '',
        getaddressdata: action.addressdata,
      };
    case GET_FILM_FAILURE:
      return {
        isFetching: false,
        fetchError: true,
        fetchErrorMessage: action.error,
      };

    default:
      return state;
  }
};
