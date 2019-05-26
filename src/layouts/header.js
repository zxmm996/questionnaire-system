import React, { Component } from 'react';
import { Icon } from 'antd';
import { connect } from "unistore/react";
import { actions } from '../service/store';
import styles from './header.less';

class Header extends Component {
  // 跳转到首页我的问卷
  jumpToHome = () => {
    const { history } = this.props;
    history.push('/');
  }
  // 退出
  logout = () => {
    const { logout, history } = this.props;
    // 退出操作
    logout();
    // 路由跳转到登录界面
    history.push('/login');
  }

  render() {
    const { userInfo = {}} = this.props;
    const account = userInfo.account;

    return (
      <div className={styles.normal}>
        <div className={styles.container}>
          <div className={styles.logo}>问卷调查系统</div>
          <div className={styles.menu}>
            <span className={styles.item} onClick={this.jumpToHome}><Icon type="home" style={{fontSize: 20}} /> 我的问卷</span>
            <span className={styles.item}><Icon type="user" style={{fontSize: 20}} /> {account}</span>
            <span className={styles.item} onClick={this.logout}><Icon type="poweroff" style={{fontSize: 20}} /> 退出</span>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)((state) => (
  <Header {...state}/>
));
