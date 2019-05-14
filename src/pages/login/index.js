
import React, { Component } from 'react';
import { connect } from "unistore/react";
import { Form, Icon, Input, Button } from 'antd';
import { actions } from '../../service/store';
import styles from './index.less';

class NormalLoginForm extends Component {
  // 登录 表单提交
  handleSubmit = e => {
    e.preventDefault();
    // 表单值校验
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { login, history } = this.props;
        login(() => {
          history.push('/');
        });
      }
    });
  };

  // 跳转到注册页面
  jumpToRegist = () => {
    const { history } = this.props;
    history.push('/regist');
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <div className={styles['login-wrapper']}>
        <Form onSubmit={this.handleSubmit} className={styles['login-form']}>
          <p className={styles.title}>问卷调查系统</p>
          <Form.Item>
            {getFieldDecorator('username', {
              rules: [{ required: true, message: '请输入用户名' }],
            })(
              <Input
                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                placeholder="用户名"
              />,
            )}
          </Form.Item>
          <Form.Item>
            {getFieldDecorator('password', {
              rules: [{ required: true, message: '请输入密码' }],
            })(
              <Input
                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                type="password"
                placeholder="密码"
              />,
            )}
          </Form.Item>
          <Form.Item>
            <a className={styles['login-form-forgot']} onClick={this.jumpToRegist} href="javascript:void(0)">
              注册
            </a>
            <Button type="primary" htmlType="submit" className={styles['login-form-button']}>
              登录
            </Button>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(NormalLoginForm);

export default connect(state => state, actions)((state) => (
  <WrappedNormalLoginForm {...state}/>  
));