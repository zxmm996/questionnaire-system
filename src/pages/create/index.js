import React, {Component } from 'react';
import { Card, List, Typography, Radio, Checkbox, Input, Icon, Button } from 'antd';
import { connect } from "unistore/react";
import { actions } from '../../service/store';
import styles from './index.less';

const { Paragraph } = Typography;

class Create extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formList: [],
    };
    this.index = 0;
  }
  //  添加表单项
  addForm = (type) => {
    const { formList } = this.state;
    const form = {
      id: this.index,
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
    this.index = this.index + 1;
  }

  // 添加表单选项
  addOption = (form) => {
    const { id } = form;
    const { formList } = this.state;
    const filterForm = formList.find(item => item.id === id);

    filterForm.options.push({value: '新增选项'});
    this.setState({
      formList,
    });
  }

  // 删除表单选项
  deleteOption = (form, index) => {
    const { id } = form;
    const { formList } = this.state;
    const filterForm = formList.find(item => item.id === id);
    filterForm.options.splice(index, 1);
    this.setState({
      formList,
    });
  }

  // 修改表单标题
  changeTitle = (value, id) => {
    const { formList } = this.state;
    formList.find(item => item.id === id).title = value;
    this.setState({
      formList,
    });
  }

  // 修改表单选项
  changeOption = (value, id, index) => {
    const { formList } = this.state;
    formList.find(item => item.id === id).options[index].value = value;
    this.setState({
      formList,
    });
  }
  // 删除表单项
  deleteItem = (id) => {
    const { formList } = this.state;
    const list = formList.filter(item => item.id !== id);
    this.setState({
      formList: list,
    });
  }
  render() {
    const { formList } = this.state;
    return (
      <div className={styles.normal}>
        <div className={styles.left}>
          <p className={styles.title}>表单选项</p>
          <p className={styles.item} onClick={() => this.addForm('input')}>单项填空</p>
          <p className={styles.item} onClick={() => this.addForm('radio')}>单项选择</p>
          <p className={styles.item} onClick={() => this.addForm('checkbox')}>多项选择</p>
          <p className={styles.title}>模板</p>
          <p className={styles.item} onClick={() => {}}>模板1</p>
          <p className={styles.item} onClick={() => {}}>模板2</p>
          <p className={styles.item} onClick={() => {}}>模板3</p>
        </div>
        <div className={styles.right}>
          <Card>
            <List
              itemLayout="horizontal"
              dataSource={formList}
              renderItem={(item, index) => (
                <List.Item actions={[<a herf="javascript:void(0)" onClick={() => this.deleteItem(item.id)}>删除</a>]}>
                  <List.Item.Meta
                    title={(
                      <div className={styles.title}>
                       {index + 1}. <Paragraph className={styles.paragraph} editable={{ onChange: (value) =>  this.changeTitle(value, item.id) }}>{item.title}</Paragraph>
                      </div>
                    )}
                    description={(
                      <div className={styles.desc}>
                        {
                          item.type === 'input'
                          ? (<Input disabled style={{width: 200}} />)
                          : 
                          item.options.map((option, index) => {
                            return (
                              <div key={option.id} className={styles.options}>
                                {
                                  item.type === 'radio'
                                  ? <Radio disabled />
                                  : <Checkbox disabled />
                                }
                                &nbsp;&nbsp;
                                <Paragraph className={styles.paragraph} editable={{ onChange: (value) =>  this.changeOption(value, item.id, index)  }}>{option.value}</Paragraph>
                                <Icon type="delete" className={styles.delete} title="删除" onClick={() => this.deleteOption(item, index)} />
                              </div>
                            );
                          })
                        }
                        {
                          item.type !== 'input'
                          ? <div> <Button type="primary" icon="plus" size="small" onClick={() => this.addOption(item)}>新增选项</Button></div>
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