import React, {Component } from 'react';
import { Card, List, Typography, Radio, Checkbox, Input, Icon, Button, Tooltip, message } from 'antd';
import { connect } from "unistore/react";
import { actions } from '@/service/store';
import apis from '@/service/api';
import styles from './index.less';

const { Paragraph, Title } = Typography;

class CreatePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTitle: '标题',
      questionList: [],
    };
  }

  // 预定义的表单模板数据
  template = [{
    formTitle: '2019潜力篮球暑期班报名表',
    questionList: [{
      title: '孩子姓名',
      type: 'input',
    }, {
      title: '孩子性别',
      type: 'radio',
      options: [{
        value: '男'
      }, {
        value: '女'
      }],
    }, {
      title: '篮球水平',
      type: 'radio',
      options: [{
        value: '无基础'
      }, {
        value: '有一定基础'
      }, {
        value: '基础较好'
      }, {
        value: '学校校队及以上水平'
      }],
    }, {
      title: '是否已是潜力俱乐部学员',
      type: 'radio',
      options: [{
        value: '是'
      }, {
        value: '否'
      }],
    }, {
      title: '暑期班时间段及地点',
      type: 'checkbox',
      options: [{
        value: '7月2日-7月7日 工程大西篮球场 08:00-10:00'
      }, {
        value: '7月2日-7月7日 工程大东篮球场 18:30-20:30'
      }, {
        value: '7月20日-7月25日 视觉体育馆 09:45-11:45'
      }, {
        value: '7月20日-7月25日 工程大东篮球场 18:30-20:30'
      }, {
        value: '7月26日-7月31日 视觉体育馆 09:45-11:45'
      }, {
        value: '7月26日-7月31日 工程大东篮球场 18:30-20:30'
      }],
    }, {
      title: '家长姓名',
      type: 'input',
    }, {
      title: '联系方式',
      type: 'input',
    }, {
      title: '需要说明的情况（如身体的特殊情况、性格上等需要特别说明的事项；如果没有，请填写“无”）',
      type: 'input',
    }]
  }]

  //  添加表单项
  addForm = (type) => {
    const { questionList } = this.state;
    const form = {
      title: '标题',
      type,
      options: [{
        value: '选项1'
      }, {
        value: '选项2'
      }],
    }
    questionList.push(form);
    this.setState({
      questionList,
    });
  }

  // 添加表单选项
  addOption = (formIndex) => {
    const { questionList } = this.state;
    questionList[formIndex].options.push({value: '新增选项'});
    this.setState({
      questionList,
    });
  }

  // 删除表单选项
  deleteOption = (formIndex, optionIndex) => {
    const { questionList } = this.state;
    questionList[formIndex].options.splice(optionIndex, 1);
    this.setState({
      questionList,
    });
  }

  // 修改问卷标题
  changeFormTitle = (value) => {
    this.setState({
      formTitle: value,
    });
  }

  // 修改表单标题
  changeTitle = (value, index) => {
    const { questionList } = this.state;
    questionList[index].title = value;
    this.setState({
      questionList,
    });
  }

  // 修改表单选项
  changeOption = (value, formIndex, optionIndex) => {
    const { questionList } = this.state;
    questionList[formIndex].options[optionIndex].value = value;
    this.setState({
      questionList,
    });
  }
  // 删除表单项
  deleteItem = (index) => {
    const { questionList } = this.state;
    questionList.splice(index, 1);
    this.setState({
      questionList,
    });
  }

  // 提交表单信息
  submit = async () => {
    const { userInfo } = this.props;
    const { formTitle, questionList } = this.state;
    const params = {
      userId: userInfo.userId,
      title: formTitle,
      questions: questionList.map((item, questionIndex) => {
        return {
          ...item,
          id: questionIndex + 1,
          options: item.options.map((option, index) => {
            return {
              ...option,
              id: index + 1,
            };
          }),
        };
      })
    }
    const res = await apis.createForm(params);
    if (res.code === 1) {
      message.success('创建成功');
      const { history } = this.props;
      setTimeout(() => {
        history.push('/');
      }, 500)
    }
  }
  // 渲染定义好的模板问卷
  renderTemplate = ({formTitle, questionList}) => {

    this.setState({
      formTitle,
      questionList,
    })
  }

  render() {
    const { questionList, formTitle } = this.state;
    return (
      <div className={styles.normal}>
        <div className={styles.left}>
          <p className={styles.title}>表单选项</p>
          <p className={styles.item} onClick={() => this.addForm('input')}>单项填空</p>
          <p className={styles.item} onClick={() => this.addForm('radio')}>单项选择</p>
          <p className={styles.item} onClick={() => this.addForm('checkbox')}>多项选择</p>
          <p className={styles.title}>模板</p>
          {
            this.template.map((item, index) => {
              return (
                <p className={styles.item} key={index} onClick={() => this.renderTemplate(item)}>{item.formTitle}</p>
              );
            })
          }
        </div>
        <div className={styles.right}>
          <Title level={4} style={{textAlign: 'center'}}>
            <Paragraph style={{marginLeft: 10}} editable={{ onChange: this.changeFormTitle }}>{formTitle}</Paragraph>
          </Title>
          <Card>
            <List
              itemLayout="horizontal"
              dataSource={questionList}
              renderItem={(item, formIndex) => (
                <List.Item actions={[<span className="link" onClick={() => this.deleteItem(formIndex)}>删除</span>]}>
                  <List.Item.Meta
                    title={(
                      <div className={styles.title}>
                       {formIndex + 1}. <Paragraph className={styles.paragraph} editable={{ onChange: (value) =>  this.changeTitle(value, formIndex) }}>{item.title}</Paragraph>
                      </div>
                    )}
                    description={(
                      <div className={styles.desc}>
                        {
                          item.type === 'input'
                          ? (<Input disabled style={{width: 200}} />)
                          :
                          item.options.map((option, optionIndex) => {
                            return (
                              <div key={optionIndex} className={styles.options}>
                                {
                                  item.type === 'radio'
                                  ? <Radio disabled />
                                  : <Checkbox disabled />
                                }
                                &nbsp;&nbsp;
                                <Paragraph className={styles.paragraph} editable={{ onChange: (value) =>  this.changeOption(value, formIndex, optionIndex)  }}>{option.value}</Paragraph>
                                <Tooltip placement="top" title="删除">
                                  <Icon type="delete" className={styles.delete} onClick={() => this.deleteOption(formIndex, optionIndex)} />
                                </Tooltip>
                              </div>
                            );
                          })
                        }
                        {
                          item.type !== 'input'
                          ? <div> <Button type="primary" icon="plus" size="small" onClick={() => this.addOption(formIndex)}>新增选项</Button></div>
                          : null
                        }
                      </div>
                    )}
                    />
                </List.Item>
              )}
              />
          </Card>
          <div className={styles.submit}>
            {
              questionList.length > 0
              ?
              <Button type="primary" onClick={this.submit}>完成</Button>
              : null
            }
          </div>
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)((state) => (
  <CreatePage {...state}/>
));
