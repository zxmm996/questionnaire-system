import React, { Component } from 'react';
import { Form, Input, Button, message } from 'antd';
import { connect } from "unistore/react";
import { actions } from '@/service/store';
import apis from '@/service/api';
import styles from './index.less';

class RegistrationForm extends Component {
  state = {
    confirmDirty: false,
  };

  // 注册
  handleSubmit = e => {
    const { history } = this.props;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        const res = await apis.regist(values)
        if (res.code === 1) {
          message.success('注册成功,请登录');
          setTimeout(() => {
            history.push('/login');
          }, 500)
        }
      }
    });
  };

  handleConfirmBlur = e => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次密码输入不一致!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const form = this.props.form;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  // 跳转到登录页
  jumpToLogin = () => {
    const { history } = this.props;
    history.push('/login');
  }

  render() {
    const { getFieldDecorator } = this.props.form;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 4 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 20 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 20,
          offset: 4,
        },
      },
    };

    return (
      <div className={styles['regist-wrapper']}>
        <Form {...formItemLayout} onSubmit={this.handleSubmit} className={styles['regist-form']}>
          <p className={styles.title}>用户注册</p>
          <Form.Item label="用户名">
            {getFieldDecorator('user_name', {
              rules: [{ required: true, message: '请输入用户名', whitespace: true }],
            })(<Input />)}
          </Form.Item>
          <Form.Item label="密码" hasFeedback>
            {getFieldDecorator('user_pwd', {
              rules: [
                {
                  required: true,
                  message: '请输入密码',
                },
                {
                  validator: this.validateToNextPassword,
                },
              ],
            })(<Input.Password />)}
          </Form.Item>
          <Form.Item label="确认密码" hasFeedback>
            {getFieldDecorator('confirm', {
              rules: [
                {
                  required: true,
                  message: '请输入确认密码',
                },
                {
                  validator: this.compareToFirstPassword,
                },
              ],
            })(<Input.Password onBlur={this.handleConfirmBlur} />)}
          </Form.Item>
          <Form.Item label="手机号">
            {getFieldDecorator('user_phone', {
              rules: [{ required: true, message: '请输入手机号' }],
            })(<Input style={{ width: '100%' }} />)}
          </Form.Item>
          <Form.Item label="邮箱">
            {getFieldDecorator('user_email', {
              rules: [
                {
                  type: 'email',
                  message: '邮箱格式不正确',
                },
                {
                  required: true,
                  message: '请输入邮箱',
                },
              ],
            })(<Input />)}
          </Form.Item>
          <Form.Item {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit" className={styles['regist-form-button']}>
              注册
            </Button>
          </Form.Item>
          <p className={styles['to-login']}><span className="link" onClick={this.jumpToLogin}>已有账号，立即登录</span></p>
        </Form>
      </div>
    );
  }
}

const WrappedRegistrationForm = Form.create({ name: 'register' })(RegistrationForm);

export default connect(state => state, actions)((state) => (
  <WrappedRegistrationForm {...state}/>
));
