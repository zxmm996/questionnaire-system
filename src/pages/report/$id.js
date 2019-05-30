import React, { Component } from 'react';
import { List, Progress, Table, Icon, Tooltip } from 'antd';
import { connect } from "unistore/react";
import { actions } from '@/service/store';
import apis from '@/service/api';
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
      questions: [],
    };
  }

  componentDidMount = async () =>  {
    const { match } = this.props;

    const params = {
      formId: match.params.id,
    }
    const res = await apis.getFormDetail(params);
    console.log('res=', res);
    if (res.code === 1) {
      this.setState({
        formTitle: res.data.title,
        questions: res.data.questions,
        answers:  res.data.answers,
      });
    }
  }

  // 导出
  export = async () => {
    console.log('EXPORT');
    const { match } = this.props;
    const params = {
      formId: match.params.id,
    }
    const res = await apis.exportForm(params);

  }

  render() {
    const { formTitle, questions, answers } = this.state;

    return (
      <div className={styles.wrapper}>
        <div className={styles.header} />
        <div className={styles.content}>
          <p className={styles['form-title']}>
            {formTitle}
            <Tooltip placement="top" title="下载Excel">
              <Icon type="download" className={styles.download} onClick={this.export} />
            </Tooltip>
          </p>
          <List
            style={{padding: '10px 50px'}}
            itemLayout="horizontal"
            dataSource={questions}
            renderItem={(item, formIndex) => {
              let dataSource = [];
              let columns = [];
              if (item.type === 'input') {
                answers.forEach(answer => {
                  dataSource.push(answer.find(obj => obj.id === item.id));
                })
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
              } else if (item.type === 'radio') {
                dataSource = item.options.map(option => {
                  const list = [];
                  answers.forEach(answer => {
                    list.push(answer.find(obj => obj.id === item.id))
                  });
                  const result = list.filter(obj => obj.answer === option.id);

                  const count = result.length;
                  return {
                    option: option.value,
                    count,
                    rate: (count / (answers.length) * 100).toFixed(2),
                  }
                })
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
                      <Progress percent={parseFloat(text)} status="normal" />
                    )
                  },
                }];
              } else if (item.type === 'checkbox') {
                dataSource = item.options.map(option => {
                  const list = [];
                  answers.forEach(answer => {
                    list.push(answer.find(obj => obj.id === item.id))
                  });
                  console.log('list=', list);
                  const result = list.filter(obj => obj.answer.indexOf(option.id) > -1);
                  console.log('result=', result);
                  const count = result.length;
                  return {
                    option: option.value,
                    count,
                    rate: (count / (answers.length) * 100).toFixed(2),
                  }
                })
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
                      <Progress percent={parseFloat(text)} status="normal" />
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
