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
  }, {
    formTitle: '大学生旅游情况调查',
    questionList: [{
      title: '您的性别',
      type: 'radio',
      options: [{
        value: '男'
      }, {
        value: '女'
      }],
    }, {
      title: '您所在的年级',
      type: 'radio',
      options: [{
        value: '大一'
      }, {
        value: '大二'
      }, {
        value: '大三'
      }, {
        value: '大四'
      }, {
        value: '其他'
      }],
    }, {
      title: '您一个月的生活费是',
      type: 'radio',
      options: [{
        value: '1000元以下'
      }, {
        value: '1000元 - 1500元'
      }, {
        value: '1500元以上'
      }],
    }, {
      title: '您一般会选择哪种旅游方式',
      type: 'radio',
      options: [{
        value: '随团游'
      }, {
        value: '自助游'
      }, {
        value: '与朋友同行'
      }, {
        value: '独自出游'
      }, {
        value: '其他'
      }],
    }, {
      title: '您一般会选择什么时间出游',
      type: 'radio',
      options: [{
        value: '寒暑假'
      }, {
        value: '法定节假日'
      }, {
        value: '周末'
      }, {
        value: '其他'
      }],
    }, {
      title: '您都是从哪些渠道了解到旅游的相关信息呢',
      type: 'checkbox',
      options: [{
        value: '旅行社'
      }, {
        value: '宣传海报'
      }, {
        value: '朋友介绍'
      }, {
        value: '新媒体推广信息'
      }, {
        value: '其他'
      }],
    }, {
      title: '您喜欢去哪旅游',
      type: 'radio',
      options: [{
        value: '省内'
      }, {
        value: '省外'
      }, {
        value: '出国'
      }],
    }, {
      title: '您一般出游的目的是什么',
      type: 'checkbox',
      options: [{
        value: '娱乐身心，放松自我'
      }, {
        value: '结交朋友，增加人脉'
      }, {
        value: '探亲访友，加强联系'
      }, {
        value: '拍照摄影，看看祖国大好河山'
      }, {
        value: '其他'
      }],
    }, {
      title: '您对大学生外出旅游有什么好的建议',
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
