import React, { Component } from 'react';
import { Button, List, Card, Popconfirm, Typography } from 'antd';
import { connect } from "unistore/react";
import { actions } from '../service/store';
import styles from './index.less';

const { Paragraph } = Typography;

class HomePage extends Component {

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
    const data = [{
      id: '100010',
      title: '问卷调查1',
    }, {
      id: '100011',
      title: '问卷调查2',
    }, {
      id: '100012',
      title: '问卷调查3',
    }]
    const getBtnActions = (item) => {
      return [
        <span className="link" onClick={() => this.jumpToReport(item.id)}>分析&下载</span>,
        <Popconfirm
          title="确认删除?"
          onConfirm={() => {}}
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
              dataSource={data}
              renderItem={item => (
                <List.Item actions={getBtnActions(item)}>
                  <List.Item.Meta
                    title={<span className={styles.title}>{item.title}</span>}
                    description={(
                      <div className={styles.desc}>
                        <div><span className={styles.field}>ID: </span>10010</div>
                        <div><Paragraph copyable={{ text: `${serviceUrl}/fill/${item.id}` }}><span className={styles.field}>发布地址:</span>{serviceUrl}/fill/{item.id}</Paragraph></div>
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