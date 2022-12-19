import { PHOTA_GET } from '../api'



const FETCH_PHOTO_STARTED = 'photo/fetchStarted';
const FETCH_PHOTO_SUCCESS = 'photo/fetchSuccess';
const FETCH_PHOTO_ERROR = 'photo/fetchError';


const fetchPhotoStarted = () => ({
  type: FETCH_PHOTO_STARTED
});

const fetchPhotoSuccess = (data) => ({
  type: FETCH_PHOTO_SUCCESS,
  payload: data
});


const fetchPhotoError = (error) => ({
  type: FETCH_PHOTO_ERROR,
  payload: error
});


const initialState = {
  loading: false,
  data: null,
  error:null,
}


export default function photo(state = initialState, action){
  switch(action.type) {
    case FETCH_PHOTO_STARTED:
      return {
        ...state,
        loading: true,
        error:null,
        data:null
      };
      case FETCH_PHOTO_SUCCESS:
        return {
          ...state,
          loading:false,
          erro:null,
          data: action.payload
        };
        case FETCH_PHOTO_ERROR:
        return {
          ...state,
          loading:false,
          erro:action.payload,
          data: null,
        }
        default:
          return state
  }
}

export const fetchPhoto = (id) => async(dispatch, getState) => {
  try{
    dispatch(fetchPhotoStarted());
    const {url, options} = PHOTA_GET(id)
    const response = await fetch(url, options)
    const data = await response.json();
    dispatch(fetchPhotoSuccess(data));
  } catch(error){
    dispatch(fetchPhotoError(error.message));
  }
}