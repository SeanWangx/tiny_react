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
} from './actions';
import storage from '@/utils/storage';

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
      return { ...state, accessKey, secretKey };
    case SET_AUTH:
      return {
        ...state,
        isAuth: action.isAuth
      }
    default:
      return state;
  }
}

function bucketList (state = initialStateForBucketList, action) {
  switch (action.type) {
    case REFRESH_BUCKET_LIST:
      // 刷新存储空间列表
      return action.bucketList;
    case ADD_BUCKET:
      // 添加存储空间
      let { name, zone, domains } = action.payload;
      return [ ...state, { name, zone, domains }];
    case REMOVE_BUCKET:
      // 删除存储空间
      return state.filter(bucket => {
        return bucket['name'] !== action.name;
      });
    case MODIFY_BUCKET_ZONE:
      // 修改指定存储空间zone
      let { name, zone } = action.payload;
      return state.map(bucket => {
        if (bucket['name'] === name) {
          return { ...bucket, zone };
        }
        return bucket;
      });
    case MODIFY_BUCKET_DOMAINS:
      // 修改指定存储空间domains
      let { name, domains } = action.payload;
      return state.map(bucket => {
        if (bucket['name'] === name) {
          return { ...bucket, domains };
        }
        return bucket;
      })
    default:
      return state;
  }
}

function bucketSelected (state = initialStateForBucketSelected, action) {
  switch (action.type) {
    case SET_BUCKET_SELECTED:
      return {
        ...state,
        name: action.name
      };
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
