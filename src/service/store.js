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
  login(state, callback) {
    Cookies.set('userInfo', {
      isLogin: true,
      userInfo: {
        userName: 'admin',
        id: 10010,
      },
    }, 1)
    callback();
    return {
      isLogin: true,
      userInfo: {
        userName: 'admin',
        id: 10010,
      },
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
  
  // The above example as an Arrow Function:
  increment2: ({ count }) => ({ count: count + 1 }),

  // Async actions are actions that call store.setState():
  incrementAsync(state) {
    setTimeout(() => {
      store.setState({ count: state.count + 1 });
    }, 100);
  }
});

export {
  store,
  actions,
}
