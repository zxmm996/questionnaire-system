import React, { Component } from 'react';
import { Button, List, Card, Popconfirm, Typography, message } from 'antd';
import { connect } from "unistore/react";
import { actions } from '@/service/store';
import apis from '@/service/api';
import styles from './index.less';

const { Paragraph } = Typography;

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formList: [],
    }
  }
  componentDidMount = () =>  {
    this.queryData();
  }

  // 获取表单数据
  queryData = async () => {
    const { userInfo } = this.props;
    const params = {
      userId: userInfo.userId,
    }
    const res = await apis.getFormList(params);
    if (res.code === 1) {
      this.setState({
        formList: res.data || [],
      });
    }
  }

  deleteForm = async (formId) => {
    const params = {
      formId,
    }
    const res = await apis.deleteForm(params);
    console.log('res=', res);
    if (res.code === 1) {
      message.success('删除成功');
      this.queryData();
    }

  }
  // 跳转到创建页面
  jumpToCreate = () => {
    const { history } = this.props;
    history.push('/create');
  }

  // 跳转到分析页面
  jumpToReport = (id) => {
    const { history } = this.props;
    history.push(`/report/${id}`);
  }

  render() {
    const serviceUrl = this.props.serviceUrl;
    const { formList } = this.state;
    const getBtnActions = (item) => {
      return [
        <span className="link" onClick={() => this.jumpToReport(item.formId)}>分析&下载</span>,
        <Popconfirm
          title="确认删除?"
          onConfirm={() => {
            this.deleteForm(item.formId);
          }}
          okText="是"
          cancelText="否"
        >
          <span className="link">删除</span>
        </Popconfirm>
      ];
    }
    return (
      <div className={styles.normal}>
        <Button type="primary" shape="round" icon="plus" onClick={this.jumpToCreate}>
          创建问卷
        </Button>
        <div className={styles.content}>
          <Card>
            <List
              itemLayout="horizontal"
              dataSource={formList}
              renderItem={item => (
                <List.Item actions={getBtnActions(item)}>
                  <List.Item.Meta
                    title={<span className={styles.title}>{item.title}</span>}
                    description={(
                      <div className={styles.desc}>
                        <div><span className={styles.field}>ID: </span>{item.formId}</div>
                        <div><Paragraph copyable={{ text: `${serviceUrl}/fill/${item.formId}` }}><span className={styles.field}>发布地址:</span>{serviceUrl}/fill/{item.formId}</Paragraph></div>
                      </div>
                    )}
                    />
                </List.Item>
              )}
              />
          </Card>
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)((state) => (
  <HomePage {...state}/>
));
