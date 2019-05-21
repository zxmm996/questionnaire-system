import React, { Component } from 'react';
import { List, Progress, Table } from 'antd';
import { connect } from "unistore/react";
import { actions } from '../../service/store';
import styles from './index.less';

const typeMapper = {
  radio: '单选题',
  checkbox: '多选题',
  input: '填空题',
}

class ReportPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTitle: '标题',
      formList: [{
        title: '标题',
        type: 'radio',
        options: [{
          value: '选项1'
        }, {
          value: '选项2'
        }]
      }, {
        title: '标题',
        type: 'checkbox',
        options: [{
          value: '选项1'
        }, {
          value: '选项2'
        }],
      }, {
        title: '标题',
        type: 'input',
      }],
    };
  }

  render() {
    const { formTitle, formList } = this.state;
   
    return (
      <div className={styles.wrapper}>
        <div className={styles.header} />
        <div className={styles.content}>
          <p className={styles['form-title']}>{formTitle}</p>
          <List
            style={{padding: '10px 50px'}}
            itemLayout="horizontal"
            dataSource={formList}
            renderItem={(item, formIndex) => {
              let dataSource = [];
              let columns = [];
              if (item.type === 'input') {
                dataSource = [{
                  answer: '我在哪'
                }, {
                  answer: '我是谁'
                }];
                columns = [{
                  title: '序号',
                  key: 'order',
                  dataIndex: 'order',
                  render: (text, record, index) => index + 1, 
                }, {
                  title: '答案文本',
                  key: 'answer',
                  dataIndex: 'answer',
                }];
              } else {
                dataSource = [{
                  option: '选项1',
                  count: 1,
                  rate: 10,
                }, {
                  option: '选项2',
                  count: 2,
                  rate: 60,
                }];
                columns = [{
                  title: '选项',
                  key: 'option',
                  dataIndex: 'option',
                }, {
                  title: '小记',
                  key: 'count',
                  dataIndex: 'count',
                }, {
                  title: '比例',
                  key: 'rate',
                  dataIndex: 'rate',
                  render: (text) => {
                    return (
                      <Progress percent={text} />
                    )
                  },
                }];
              }
              return (
                <List.Item>
                  <List.Item.Meta
                    title={(
                      <div className={styles.title}>
                        第{formIndex + 1}题： {item.title}  <span className={styles.type}>[{typeMapper[item.type]}]</span>
                      </div>
                    )}
                    description={(
                      <Table dataSource={dataSource} columns={columns} pagination={false} size="small" />
                    )}
                  />
              </List.Item>
              )
            }}
          />
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)((state) => (
  <ReportPage {...state}/>  
));
