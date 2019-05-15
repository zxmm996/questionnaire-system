import React, { Component } from 'react';
import { Button, List, Card, message, Popconfirm } from 'antd';
import { connect } from "unistore/react";
import Clipboard from 'clipboard';
import { actions } from '../service/store';
import styles from './index.less';


class HomePage extends Component {
  // 组件挂载完成
  componentDidMount() {
    this.clipboard = new Clipboard('.btn');

    this.clipboard.on('success', function(e) {
      message.success('复制成功');
    });
  }

  // 组件将要卸载
  componentWillUnmount() {
    this.clipboard.destroy();
  }

  // 跳转到创建页面
  jumpToCreate = () => {
    const { history } = this.props;
    history.push('/create');
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
      const shareUrl = `${serviceUrl}/fill/${item.id}`;
      return [
        <a herf="javascript:void(0)">分析&下载</a>,
        <a herf="javascript:void(0)" data-clipboard-text={shareUrl} className="btn">复制</a>,
        <Popconfirm
          title="确认删除?"
          onConfirm={() => {}}
          okText="是"
          cancelText="否"
        >
          <a herf="javascript:void(0)">删除</a>
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
                        <div><span className={styles.field}>发布地址:</span>{serviceUrl}/fill/{item.id}</div>
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