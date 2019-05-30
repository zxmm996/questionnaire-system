import createStore from "unistore";
import Cookies from 'js-cookie';
import config from './config';

let userInfo = null;
try {
  userInfo = JSON.parse(Cookies.get('userInfo'));
} catch (e) {
}
const defaultStore = {
  isLogin: false,
  userInfo: {},
  serviceUrl: config.serviceUrl,
  ...userInfo,
};
let store = createStore(defaultStore);

let actions = store => ({
  // 登录
  loginSuccess(state, userInfo) {
    Cookies.set('userInfo', {
      isLogin: true,
      userInfo,
    }, 1)
    return {
      isLogin: true,
      userInfo,
    };
  },
  // 退出
  logout(state) {
    Cookies.remove('userInfo');
    return {
      isLogin: false,
      userInfo: {},
    };
  },
});

export {
  store,
  actions,
}
