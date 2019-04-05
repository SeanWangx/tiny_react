import Crypto from 'crypto';
import storage from './storage';
import { urlSafeBase64Encode } from './tools';

class QiNiu {
  constructor () {
    let accessKey = storage.get('accessKey', '');
    let secretKey = storage.get('secretKey', '');
    this.init(accessKey, secretKey);
  }

  init (accessKey, secretKey) {
    this.accessKey = accessKey;
    this.secretKey = secretKey;
    storage.set('accessKey', this.accessKey);
    storage.set('secretKey', this.secretKey);
  }

  clear () {
    this.accessKey = '';
    this.secretKey = '';
    storage.clear();
  }

  getMac () {
    return {
      accessKey: this.accessKey,
      secretKey: this.secretKey
    };
  }

  getAccessToken (url) {
    if (!!this.secretKey && !!this.accessKey) {
      url = url + '\n';
      let sign = Crypto.createHmac('sha1', this.secretKey).update(url).digest();
      let encodedSign = urlSafeBase64Encode(sign);
      let accessToken = `${this.accessKey}:${encodedSign}`;
      return accessToken;
    } else {
      return null;
    }
  }

  getUploadToken ({ scope, fileType }) {
    if (!!this.secretKey && !!this.accessKey) {
      let putPolicy = JSON.stringify({
        deadline: new Date().getTime() + 3600,
        scope,
        fileType
      });
      let encodedPutPolicy = urlSafeBase64Encode(putPolicy);
      let sign = Crypto.createHmac('sha1', this.secretKey).update(encodedPutPolicy).digest();
      let encodedSign = urlSafeBase64Encode(sign);
      let uploadToken = `${this.accessKey}:${encodedSign}:${encodedPutPolicy}`;
      return uploadToken;
    } else {
      return null;
    }
  }
}

let unique;

function getInstance () {
  if (unique === undefined) {
    unique = new QiNiu();
  }
  return unique;
}

export default getInstance();