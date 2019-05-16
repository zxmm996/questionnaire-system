import React, {Component } from 'react';
import { Card, List, Typography, Radio, Checkbox, Input, Icon, Button } from 'antd';
import { connect } from "unistore/react";
import { actions } from '../../service/store';
import styles from './index.less';

const { Paragraph, Title } = Typography;

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTitle: '标题',
      formList: [],
    };
  }
  //  添加表单项
  addForm = (type) => {
    const { formList } = this.state;
    const form = {
      title: '标题',
      type,
      options: [{
        value: '选项1'
      }, {
        value: '选项2'
      }],
    }
    formList.push(form);
    this.setState({
      formList,
    });
  }

  // 添加表单选项
  addOption = (formIndex) => {
    const { formList } = this.state;
    formList[formIndex].options.push({value: '新增选项'});
    this.setState({
      formList,
    });
  }

  // 删除表单选项
  deleteOption = (formIndex, optionIndex) => {
    const { formList } = this.state;
    formList[formIndex].options.splice(optionIndex, 1);
    this.setState({
      formList,
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
    const { formList } = this.state;
    formList[index].title = value;
    this.setState({
      formList,
    });
  }

  // 修改表单选项
  changeOption = (value, formIndex, optionIndex) => {
    const { formList } = this.state;
    formList[formIndex].options[optionIndex].value = value;
    this.setState({
      formList,
    });
  }
  // 删除表单项
  deleteItem = (index) => {
    const { formList } = this.state;
    formList.splice(index, 1);
    this.setState({
      formList,
    });
  }

  // 渲染定义好的模板问卷
  renderTemplate = (index) => {
    let formTitle = '问卷标题';
    let formList = [];
    switch(index) {
      case 0:
        formTitle = '中小学家庭教育现状调查问卷';
        formList = [{
          title: '您的身份',
          type: 'radio',
          options: [{
            value: '父亲'
          }, {
            value: '母亲'
          }],
        }, {
          title: '您孩子的性别',
          type: 'radio',
          options: [{
            value: '男'
          }, {
            value: '女'
          }],
        },  {
          title: '您孩子的姓名',
          type: 'input',
        }, {
          title: '您孩子的爱好',
          type: 'checkbox',
          options: [{
            value: '篮球'
          }, {
            value: '羽毛球'
          }, {
            value: '乒乓球'
          }],
        }];
        break;
      case 1: 
      formTitle = '大学城民宿市场需求调查';
      formList = [{
        title: '您的性别',
        type: 'radio',
        options: [{
          value: '男'
        }, {
          value: '女'
        }],
      }, {
        title: '您现在读大几',
        type: 'radio',
        options: [{
          value: '大一'
        }, {
          value: '大二'
        },  {
          value: '大三'
        },  {
          value: '大四'
        }],
      },  {
        title: '您认为最佳的选址是哪里',
        type: 'input',
      }, {
        title: '您在选择住宿时关注的因素',
        type: 'checkbox',
        options: [{
          value: '价格'
        }, {
          value: '卫生质量'
        }, {
          value: '服务态度'
        }],
      }];
      break;
      default:
        break;
    }

    this.setState({
      formTitle,
      formList,
    })
  }

  render() {
    const { formList, formTitle } = this.state;
    return (
      <div className={styles.normal}>
        <div className={styles.left}>
          <p className={styles.title}>表单选项</p>
          <p className={styles.item} onClick={() => this.addForm('input')}>单项填空</p>
          <p className={styles.item} onClick={() => this.addForm('radio')}>单项选择</p>
          <p className={styles.item} onClick={() => this.addForm('checkbox')}>多项选择</p>
          <p className={styles.title}>模板</p>
          <p className={styles.item} onClick={() => this.renderTemplate(0)}>模板1</p>
          <p className={styles.item} onClick={() => this.renderTemplate(1)}>模板2</p>
        </div>
        <div className={styles.right}>
          <Title level={2} style={{textAlign: 'center'}}>
            <Paragraph editable={{ onChange: this.changeFormTitle }}>{formTitle}</Paragraph>
          </Title>
          <Card>
            <List
              itemLayout="horizontal"
              dataSource={formList}
              renderItem={(item, formIndex) => (
                <List.Item actions={[<a herf="javascript:void(0)" onClick={() => this.deleteItem(formIndex)}>删除</a>]}>
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
                                <Icon type="delete" className={styles.delete} title="删除" onClick={() => this.deleteOption(formIndex, optionIndex)} />
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
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)((state) => (
  <Create {...state}/>  
));