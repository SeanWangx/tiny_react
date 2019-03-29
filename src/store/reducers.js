import { combineReducers } from 'redux';
import {
  SET_MAC,
  SET_AUTH,
  REFRESH_BUCKET_LIST,
  ADD_BUCKET,
  REMOVE_BUCKET,
  MODIFY_BUCKET_ZONE,
  MODIFY_BUCKET_DOMAINS,
  SET_BUCKET_SELECTED,
  SET_BUCKET_SOURCE,
} from './actions';
import storage from '../utils/storage';

/* const initialState = {
  baseConfig: {
    accessKey: '',
    secretKey: '',
    isAuth: false,
  },
  bucketList: [],
  bucketSelected: {
    name: '',
    sourceList: [],
    sourceCount: 0
  }
}; */

const initialStateForBaseConfig = {
  accessKey: storage.get('accessKey', ''),
  secretKey: storage.get('secretKey', ''),
  isAuth: storage.get('isAuth', false),
};
const initialStateForBucketList = storage.get('bucketList', []);
const initialStateForBucketSelected = {
  name: storage.get('bucketSelected', ''),
  sourceList: storage.get('sourceList', []),
  sourceCount: storage.get('sourceCount', 0),
};

function baseConfig (state = initialStateForBaseConfig, action) {
  switch (action.type) {
    case SET_MAC:
      let { accessKey = '', secretKey = ''} = action.payload;
      storage.set('accessKey', accessKey);
      storage.set('secretKey', secretKey);
      return { ...state, accessKey, secretKey };
    case SET_AUTH:
      storage.set('isAuth', action.isAuth);
      return {
        ...state,
        isAuth: action.isAuth
      }
    default:
      return state;
  }
}

function bucketList (state = initialStateForBucketList, action) {
  let newState = state;
  switch (action.type) {
    case REFRESH_BUCKET_LIST:
      // 刷新存储空间列表
      newState = action.bucketList;
      break;
    case ADD_BUCKET:
      // 添加存储空间
      newState = [
        ...state,
        {
          name: action.payload['name'],
          zone: action.payload['zone'],
          domains: action.payload['domains']
        }
      ];
      break;
    case REMOVE_BUCKET:
      // 删除存储空间
      newState = state.filter(bucket => {
        return bucket['name'] !== action.name;
      });
      break;
    case MODIFY_BUCKET_ZONE:
      // 修改指定存储空间zone
      newState = state.map(bucket => {
        if (bucket['name'] === action.payload['name']) {
          return {
            ...bucket,
            zone: action.payload['zone']
          };
        }
        return bucket;
      });
      break;
    case MODIFY_BUCKET_DOMAINS:
      // 修改指定存储空间domains
      newState = state.map(bucket => {
        if (bucket['name'] === action.payload['name']) {
          return {
            ...bucket,
            domains: action.payload['domains']
          };
        }
        return bucket;
      })
      break;
    default:
      return state;
  }
  storage.set('bucketList', newState);
  return newState;
}

function bucketSelected (state = initialStateForBucketSelected, action) {
  switch (action.type) {
    case SET_BUCKET_SELECTED:
      storage.set('bucketSelected', action.name);
      return {
        ...state,
        name: action.name
      };
    case SET_BUCKET_SOURCE:
      storage.set('sourceList', action.payload['sourceList']);
      storage.set('sourceCount', action.payload['sourceCount']);
      return {
        ...state,
        sourceList: action.payload['sourceList'],
        sourceCount: action.payload['sourceCount']
      }
    default:
      return state;
  }
}

const tinyApp = combineReducers({
  baseConfig,
  bucketList,
  bucketSelected
});

export default tinyApp;
