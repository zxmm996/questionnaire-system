import React, { Component } from 'react';
import { LocaleProvider } from 'antd';
import zh_CN from 'antd/lib/locale-provider/zh_CN';
import { Provider } from "unistore/react";
import styles from './index.css';
import { store } from '../service/store';
import Header from './header'
import Footer from './footer'

function BasicLayout(props) {
  const pathname = props.location.pathname;
  // 登录页 注册页 填写问卷调查页 不需要登录访问 不需要layout
  if (pathname === '/login' || pathname === '/regist' || pathname.indexOf('/fill/') > -1) {
    return (
      <Provider store={store}>
        <div className={styles.normal}>
          {props.children}
        </div>
      </Provider>
    );
  } else {
    return (
      <LoginedLayout {...props}/>
    );
  }
}

class LoginedLayout extends Component {
  constructor(props) {
    super(props);
    const state = store.getState();
    // 未登录直接跳转到登录页
    if (!state.isLogin) {
      props.history.push('/login');
    }
  }
  render() {
    return (
      <LocaleProvider locale={zh_CN}>
        <Provider store={store}>
          <div className={styles.normal}>
            <Header {...this.props}/>
            <div className={styles.content}>
              {this.props.children}
            </div>
            <Footer />
          </div>
        </Provider>
      </LocaleProvider>
    );
  }
}

export default BasicLayout;
