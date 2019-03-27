import {
  ADD_MAC,
  DELETE_MAC,
  SELECT_BUCKET,
  REFRESH_BUCKETS,
  MODIFY_BUCKET_ZONE
} from './actions';
import storage from '@/utils/storage';

const initialState = {
  accessKey: storage.get('accessKey', ''),
  secretKey: storage.get('secretKey', ''),
  isAuth: storage.get('isAuth', false),
  buckets: storage.get('buckets', []),
  selected: storage.get('selected', '')
};

export default function tinyApp (state = initialState, action) {
  let newState;
  switch (action.type) {
    case ADD_MAC:
      newState = {
        accessKey: action.payload['accessKey'] || '',
        secretKey: action.payload['secretKey'] || '',
        isAuth: true
      };
      break;
    case DELETE_MAC:
      newState = {
        accessKey: '',
        secretKey: '',
        isAuth: false
      };
      break;
    case SELECT_BUCKET:
      newState = {
        selected: action.bucket
      };
      break;
    case MODIFY_BUCKET_ZONE:
      newState = {
        buckets: state.buckets.map(bucket => {
          if (bucket['name'] !== action.bucket) {
            return bucket;
          } else {
            return {
              ...bucket,
              zone: action.zone
            };
          }
        })
      };
      break;
    case REFRESH_BUCKETS:
      newState = {
        buckets: action.buckets || []
      };
      break;
    default:
      return state;
  }
  Object.keys(newState).forEach(key => storage.set(key, newState[key]));
  return {
    ...state,
    ...newState
  };
};
