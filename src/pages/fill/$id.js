import React, { Component } from 'react';
import { List, Radio, Checkbox, Input, Row, Button, message } from 'antd';
import { connect } from "unistore/react";
import { actions } from '@/service/store';
import apis from '@/service/api';
import styles from './index.less';

class FillPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formTitle: '',
      questions: [],
      answers: [],
    };
  }

  componentDidMount = async () =>  {
    const { match } = this.props;

    const params = {
      formId: match.params.id,
    }
    const res = await apis.getFormDetail(params);
    if (res.code === 1) {
      this.setState({
        formTitle: res.data.title,
        questions: res.data.questions,
        answers: res.data.questions.map(({id, type}) => {
          return {
            id,
            type,
          };
        }),
      });
    }
  }

  // 输入框监听
  onChangeInput = (e, id) => {
    const { answers } = this.state;
    answers.find(item => item.id === id).answer = e.target.value;
    this.setState({
      answers,
    })
  }

  // 单选监听
  onChangeRadio = (e, id) => {
    const { answers } = this.state;
    answers.find(item => item.id === id).answer = e.target.value;
    this.setState({
      answers,
    })
  }
  // 多选监听
  onChangeCheckbox = (e, id) => {
    const { answers } = this.state;
    answers.find(item => item.id === id).answer = e;
    this.setState({
      answers,
    })
  }

  // 提交表单
  submit = async () => {
    const { match } = this.props;
    const { answers } = this.state;
    const params = {
      formId: match.params.id,
      answers,
    }
    const res = await apis.fillForm(params);
    if (res.code === 1) {
      message.success('提交成功');
    }
  }

  render() {
    const { formTitle, questions, answers } = this.state;
    console.log('answers=', answers);
    const optionStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    return (
      <div className={styles.wrapper}>
        <div className={styles.header}></div>
        <div className={styles.content}>
          <p className={styles['form-title']}>{formTitle}</p>
          <List
            style={{padding: '10px 50px'}}
            itemLayout="horizontal"
            dataSource={questions}
            renderItem={(item, formIndex) => (
              <List.Item>
                <List.Item.Meta
                  title={(
                    <div className={styles.title}>
                      <span className={styles.red}>*</span> {formIndex + 1}. {item.title}
                    </div>
                  )}
                  description={(
                    <div className={styles.desc}>
                      {
                        item.type === 'input'
                        ? (<Input style={{width: 200}} onChange={e => this.onChangeInput(e, item.id)} />)
                        : item.type === 'radio'
                        ? (
                          <Radio.Group onChange={e => this.onChangeRadio(e, item.id)}>
                            {
                              item.options.map((option,index) => (
                                <Radio key={option.id} style={optionStyle} value={option.id}>
                                  {option.value}
                                </Radio>
                              ))
                            }
                          </Radio.Group>
                        )
                        : (
                          <Checkbox.Group onChange={e => this.onChangeCheckbox(e, item.id)}>
                            {
                              item.options.map((option,index) => (
                                <Row  key={option.id}>
                                  <Checkbox style={optionStyle} value={option.id}>{option.value}</Checkbox>
                                </Row>
                              ))
                            }
                          </Checkbox.Group>
                        )
                      }
                    </div>
                  )}
                />
            </List.Item>
            )}
          />
          <div className={styles.submit}>
            <Button type="primary" onClick={this.submit}>提交</Button>
          </div>
          <div className={styles.footer}>Powered By WMX</div>
        </div>
      </div>
    );
  }
}

export default connect(state => state, actions)((state) => (
  <FillPage {...state}/>
));
